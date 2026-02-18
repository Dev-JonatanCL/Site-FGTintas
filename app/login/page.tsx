"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Paintbrush, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [proEmail, setProEmail] = useState("");
  const [proPassword, setProPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  async function handleProLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const success = await login(proEmail, proPassword, "professional");
    setLoading(false);
    if (success) {
      toast.success("Login realizado com sucesso!");
      router.push("/profissional/dashboard");
    } else {
      toast.error("Email ou senha incorretos");
    }
  }

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const success = await login(adminEmail, adminPassword, "admin");
    setLoading(false);
    if (success) {
      toast.success("Login realizado com sucesso!");
      router.push("/admin");
    } else {
      toast.error("Credenciais de administrador incorretas");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Paintbrush className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              Entrar
            </CardTitle>
            <CardDescription>
              Acesse sua conta de profissional ou administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="professional">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger
                  value="professional"
                  className="gap-2"
                >
                  <Paintbrush className="h-4 w-4" />
                  Profissional
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="professional">
                <form
                  onSubmit={handleProLogin}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pro-email">Email</Label>
                    <Input
                      id="pro-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={proEmail}
                      onChange={(e) => setProEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pro-password">Senha</Label>
                    <Input
                      id="pro-password"
                      type="password"
                      placeholder="Sua senha"
                      value={proPassword}
                      onChange={(e) =>
                        setProPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-2 w-full"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Entrar
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form
                  onSubmit={handleAdminLogin}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@fgtintas.com.br"
                      value={adminEmail}
                      onChange={(e) =>
                        setAdminEmail(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="admin-password">Senha</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Senha do administrador"
                      value={adminPassword}
                      onChange={(e) =>
                        setAdminPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-2 w-full"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Entrar como Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Ainda nao tem conta?{" "}
              <Link
                href="/cadastro"
                className="font-medium text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
