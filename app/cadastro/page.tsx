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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paintbrush, Loader2 } from "lucide-react";
import { toast } from "sonner";

const specialties = [
  "Pintura Residencial",
  "Pintura Automotiva",
  "Pintura Industrial",
  "Pintura Predial",
  "Textura e Grafiato",
  "Pintura Decorativa",
  "Pintura Epoxi",
  "Outro",
];

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    specialty: "",
    description: "",
    city: "",
    state: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas nao coincidem");
      return;
    }

    if (form.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    const { confirmPassword, ...data } = form;
    const result = await register(data);
    setLoading(false);

    if (result.success) {
      toast.success("Cadastro realizado com sucesso! Bem-vindo a FG Tintas.");
      router.push("/profissional/dashboard");
    } else {
      toast.error(result.error || "Erro ao cadastrar");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 justify-center px-4 py-12">
        <Card className="w-full max-w-2xl border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Paintbrush className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              Cadastro de Profissional
            </CardTitle>
            <CardDescription>
              Preencha seus dados para se cadastrar como profissional da
              FG Tintas e receber seu codigo de indicacao
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimo 6 caracteres"
                    value={form.password}
                    onChange={(e) =>
                      updateField("password", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita a senha"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-0000"
                    value={form.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="whatsapp">
                    WhatsApp (com DDD, apenas numeros)
                  </Label>
                  <Input
                    id="whatsapp"
                    placeholder="5511999990000"
                    value={form.whatsapp}
                    onChange={(e) =>
                      updateField("whatsapp", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Select
                    value={form.specialty}
                    onValueChange={(v) =>
                      updateField("specialty", v)
                    }
                  >
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="Sua cidade"
                      value={form.city}
                      onChange={(e) =>
                        updateField("city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">Estado</Label>
                    <Select
                      value={form.state}
                      onValueChange={(v) =>
                        updateField("state", v)
                      }
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">
                  Descricao Profissional
                </Label>
                <Textarea
                  id="description"
                  placeholder="Conte sobre sua experiencia, servicos que oferece, etc."
                  value={form.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  rows={4}
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
                Cadastrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Ja tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
