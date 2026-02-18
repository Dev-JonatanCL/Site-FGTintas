"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Edit,
  DollarSign,
  Copy,
  Loader2,
  Wallet,
  TrendingUp,
  Hash,
} from "lucide-react";
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

interface ProfessionalData {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
  referralCode: string;
  commissionBalance: number;
  commissionHistory: {
    id: string;
    date: string;
    clientName: string;
    purchaseValue: number;
    commissionRate: number;
    commissionValue: number;
  }[];
}

export default function ProfessionalDashboard() {
  const { user, isAuthenticated, role, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [professional, setProfessional] =
    useState<ProfessionalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    specialty: "",
    description: "",
    city: "",
    state: "",
  });

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/professionals/${user.id}`);
      const data = await res.json();
      if (data.professional) {
        setProfessional(data.professional);
        setEditForm({
          name: data.professional.name,
          phone: data.professional.phone,
          whatsapp: data.professional.whatsapp,
          specialty: data.professional.specialty,
          description: data.professional.description,
          city: data.professional.city,
          state: data.professional.state,
        });
      }
    } catch {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || role !== "professional") {
      router.push("/login");
      return;
    }
    loadData();
  }, [authLoading, isAuthenticated, role, router, loadData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/professionals/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.professional) {
        setProfessional(data.professional);
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch {
      toast.error("Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  function copyCode() {
    if (professional?.referralCode) {
      navigator.clipboard.writeText(professional.referralCode);
      toast.success("Codigo copiado!");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">
            Dados nao encontrados
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Painel do Profissional
            </h1>
            <p className="mt-1 text-muted-foreground">
              Gerencie seu perfil e acompanhe suas comissoes
            </p>
          </div>

          {/* Stats cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Hash className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Codigo de Indicacao
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-foreground">
                      {professional.referralCode}
                    </p>
                    <button
                      onClick={copyCode}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Copiar codigo"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
                  <Wallet className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Saldo de Comissoes
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(professional.commissionBalance)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total de Indicacoes
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {professional.commissionHistory.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="gap-2">
                <Edit className="h-4 w-4" />
                Meu Perfil
              </TabsTrigger>
              <TabsTrigger value="commissions" className="gap-2">
                <DollarSign className="h-4 w-4" />
                Comissoes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="h-5 w-5" />
                    Editar Perfil
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informacoes que aparecem no
                    marketplace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSave}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-name">Nome</Label>
                        <Input
                          id="edit-name"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-specialty">
                          Especialidade
                        </Label>
                        <Select
                          value={editForm.specialty}
                          onValueChange={(v) =>
                            setEditForm((f) => ({
                              ...f,
                              specialty: v,
                            }))
                          }
                        >
                          <SelectTrigger id="edit-specialty">
                            <SelectValue />
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
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-phone">
                          Telefone
                        </Label>
                        <Input
                          id="edit-phone"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-whatsapp">
                          WhatsApp
                        </Label>
                        <Input
                          id="edit-whatsapp"
                          value={editForm.whatsapp}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              whatsapp: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-city">Cidade</Label>
                        <Input
                          id="edit-city"
                          value={editForm.city}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              city: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-state">Estado</Label>
                        <Input
                          id="edit-state"
                          value={editForm.state}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              state: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="edit-desc">Descricao</Label>
                      <Textarea
                        id="edit-desc"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="self-end"
                      disabled={saving}
                    >
                      {saving && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Salvar Alteracoes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commissions">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-5 w-5" />
                    Historico de Comissoes
                  </CardTitle>
                  <CardDescription>
                    Comissao de 1% sobre compras dos seus clientes na
                    FG Tintas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {professional.commissionHistory.length === 0 ? (
                    <div className="py-12 text-center">
                      <DollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        Nenhuma comissao registrada ainda. Compartilhe
                        seu codigo{" "}
                        <Badge variant="secondary">
                          {professional.referralCode}
                        </Badge>{" "}
                        com seus clientes.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="text-right">
                              Valor da Compra
                            </TableHead>
                            <TableHead className="text-right">
                              Taxa
                            </TableHead>
                            <TableHead className="text-right">
                              Comissao
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {professional.commissionHistory.map(
                            (entry) => (
                              <TableRow key={entry.id}>
                                <TableCell>
                                  {new Date(
                                    entry.date
                                  ).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell>
                                  {entry.clientName}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(
                                    entry.purchaseValue
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {entry.commissionRate}%
                                </TableCell>
                                <TableCell className="text-right font-semibold text-[#25D366]">
                                  {formatCurrency(
                                    entry.commissionValue
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>

                      <div className="mt-6 flex justify-end border-t border-border pt-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Saldo Total
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {formatCurrency(
                              professional.commissionBalance
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
