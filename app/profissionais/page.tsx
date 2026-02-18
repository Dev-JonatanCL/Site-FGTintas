"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProfessionalCard } from "@/components/professional-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  photo: string;
}

export default function ProfissionaisPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/professionals");
        const data = await res.json();
        setProfessionals(data.professionals);
      } catch {
        // handle error silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const specialties = [
    ...new Set(professionals.map((p) => p.specialty)),
  ];

  const filtered = professionals.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchSpec =
      specialty === "all" || p.specialty === specialty;
    return matchSearch && matchSpec;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
              Encontre Profissionais
            </h1>
            <p className="mt-2 text-pretty text-primary-foreground/80">
              Pintores qualificados prontos para atender seu projeto
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card py-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, cidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <SelectValue placeholder="Especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Todas as Especialidades
                </SelectItem>
                {specialties.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-14 w-14 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="mt-2 h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="mt-4 h-16 w-full" />
                    <Skeleton className="mt-3 h-4 w-40" />
                    <Skeleton className="mt-2 h-4 w-32" />
                    <Skeleton className="mt-6 h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Nenhum profissional encontrado
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tente ajustar os filtros de busca
                </p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  {filtered.length} profissional(is) encontrado(s)
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((pro) => (
                    <ProfessionalCard key={pro.id} {...pro} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
