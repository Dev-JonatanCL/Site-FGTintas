"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheck,
  Users,
  DollarSign,
  Plus,
  Loader2,
  Eye,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

interface CommissionEntry {
  id: string;
  date: string;
  clientName: string;
  purchaseValue: number;
  commissionRate: number;
  commissionValue: number;
}

interface Professional {
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
  commissionHistory: CommissionEntry[];
  createdAt: string;
  active: boolean;
}

export default function AdminDashboard() {
  const { isAuthenticated, role, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [professionals, setProfessionals] = useState<Professional[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedPro, setSelectedPro] =
    useState<Professional | null>(null);
  const [commissionDialog, setCommissionDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [commissionForm, setCommissionForm] = useState({
    professionalId: "",
    clientName: "",
    purchaseValue: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const loadProfessionals = useCallback(async () => {
    try {
      const res = await fetch("/api/professionals");
      const data = await res.json();
      setProfessionals(data.professionals);
    } catch {
      toast.error("Erro ao carregar profissionais");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || role !== "admin") {
      router.push("/login");
      return;
    }
    loadProfessionals();
  }, [authLoading, isAuthenticated, role, router, loadProfessionals]);

  async function handleAddCommission(e: React.FormEvent) {
    e.preventDefault();
    if (!commissionForm.professionalId) {
      toast.error("Selecione um profissional");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/professionals/${commissionForm.professionalId}/commission`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientName: commissionForm.clientName,
            purchaseValue: parseFloat(commissionForm.purchaseValue),
          }),
        }
      );
      const data = await res.json();
      if (data.professional) {
        await loadProfessionals();
        setCommissionDialog(false);
        setCommissionForm({
          professionalId: "",
          clientName: "",
          purchaseValue: "",
        });
        const commissionValue =
          parseFloat(commissionForm.purchaseValue) * 0.01;
        toast.success(
          `Comissao de R$ ${commissionValue.toFixed(2)} adicionada com sucesso!`
        );
      }
    } catch {
      toast.error("Erro ao adicionar comissao");
    } finally {
      setSubmitting(false);
    }
  }

  function viewDetail(pro: Professional) {
    setSelectedPro(pro);
    setDetailDialog(true);
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const totalCommissions = professionals.reduce(
    (sum, p) => sum + p.commissionBalance,
    0
  );
  const totalTransactions = professionals.reduce(
    (sum, p) => sum + p.commissionHistory.length,
    0
  );

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">
                  Painel Administrativo
                </h1>
              </div>
              <p className="mt-1 text-muted-foreground">
                Gerencie profissionais e comissoes da FG Tintas
              </p>
            </div>
            <Dialog
              open={commissionDialog}
              onOpenChange={setCommissionDialog}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Comissao
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Comissao</DialogTitle>
                  <DialogDescription>
                    Registre uma compra de cliente para gerar comissao
                    de 1% ao profissional
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleAddCommission}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Profissional</Label>
                    <Select
                      value={commissionForm.professionalId}
                      onValueChange={(v) =>
                        setCommissionForm((f) => ({
                          ...f,
                          professionalId: v,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionals.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} ({p.referralCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Nome do Cliente</Label>
                    <Input
                      placeholder="Nome do cliente que realizou a compra"
                      value={commissionForm.clientName}
                      onChange={(e) =>
                        setCommissionForm((f) => ({
                          ...f,
                          clientName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Valor da Compra (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={commissionForm.purchaseValue}
                      onChange={(e) =>
                        setCommissionForm((f) => ({
                          ...f,
                          purchaseValue: e.target.value,
                        }))
                      }
                      required
                    />
                    {commissionForm.purchaseValue && (
                      <p className="text-sm text-muted-foreground">
                        Comissao de 1%:{" "}
                        <span className="font-semibold text-[#25D366]">
                          {formatCurrency(
                            parseFloat(
                              commissionForm.purchaseValue
                            ) * 0.01
                          )}
                        </span>
                      </p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Registrar Comissao
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Profissionais Cadastrados
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {professionals.length}
                  </p>
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
                    Total Comissoes Pagas
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(totalCommissions)}
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
                    Total de Transacoes
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalTransactions}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professionals table */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Profissionais Cadastrados
              </CardTitle>
              <CardDescription>
                Lista completa de profissionais e seus dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Especialidade</TableHead>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Cidade/UF</TableHead>
                      <TableHead className="text-right">
                        Saldo
                      </TableHead>
                      <TableHead className="text-right">
                        Vendas
                      </TableHead>
                      <TableHead className="text-center">
                        Acoes
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionals.map((pro) => (
                      <TableRow key={pro.id}>
                        <TableCell className="font-medium">
                          {pro.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            {pro.specialty}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-2 py-1 text-xs">
                            {pro.referralCode}
                          </code>
                        </TableCell>
                        <TableCell>
                          {pro.city}/{pro.state}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(pro.commissionBalance)}
                        </TableCell>
                        <TableCell className="text-right">
                          {pro.commissionHistory.length}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetail(pro)}
                              className="gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Detalhes
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCommissionForm((f) => ({
                                  ...f,
                                  professionalId: pro.id,
                                }));
                                setCommissionDialog(true);
                              }}
                              className="gap-1"
                            >
                              <DollarSign className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Comissao
                              </span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detail dialog */}
          <Dialog
            open={detailDialog}
            onOpenChange={setDetailDialog}
          >
            <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
              {selectedPro && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedPro.name}
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {selectedPro.specialty}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      Codigo: {selectedPro.referralCode} | Cadastrado
                      em:{" "}
                      {new Date(
                        selectedPro.createdAt
                      ).toLocaleDateString("pt-BR")}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Email
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedPro.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Telefone
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedPro.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Cidade/UF
                        </p>
                        <p className="font-medium text-foreground">
                          {selectedPro.city}/{selectedPro.state}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Saldo de Comissao
                        </p>
                        <p className="text-lg font-bold text-[#25D366]">
                          {formatCurrency(
                            selectedPro.commissionBalance
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Descricao
                      </p>
                      <p className="text-sm text-foreground">
                        {selectedPro.description}
                      </p>
                    </div>

                    {selectedPro.commissionHistory.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">
                          Historico de Comissoes
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Data</TableHead>
                              <TableHead>Cliente</TableHead>
                              <TableHead className="text-right">
                                Compra
                              </TableHead>
                              <TableHead className="text-right">
                                Comissao
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedPro.commissionHistory.map(
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
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
