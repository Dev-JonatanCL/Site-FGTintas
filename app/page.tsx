"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import {
  Paintbrush,
  Users,
  Award,
  ArrowRight,
  Star,
  ShieldCheck,
  Palette,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Profissionais Qualificados",
    description:
      "Encontre pintores experientes e verificados na sua regiao. Todos os profissionais passam por curadoria.",
  },
  {
    icon: Paintbrush,
    title: "Variedade de Tintas",
    description:
      "Tintas automotivas, imobiliarias e industriais das melhores marcas do mercado.",
  },
  {
    icon: Award,
    title: "Programa de Comissao",
    description:
      "Profissionais cadastrados ganham 1% de comissao sobre as compras de seus clientes na loja.",
  },
];

const specialties = [
  {
    icon: Palette,
    name: "Pintura Residencial",
    desc: "Interiores e exteriores",
  },
  {
    icon: Star,
    name: "Pintura Automotiva",
    desc: "Acabamento profissional",
  },
  {
    icon: ShieldCheck,
    name: "Pintura Industrial",
    desc: "Projetos de grande porte",
  },
  {
    icon: Paintbrush,
    name: "Texturas e Efeitos",
    desc: "Decoracao personalizada",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroCarousel />

        {/* Features section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                Por que escolher a FG Tintas?
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Qualidade, variedade e os melhores profissionais ao seu
                alcance
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties section */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
                Especialidades
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Profissionais para todos os tipos de pintura
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {specialties.map((spec) => (
                <div
                  key={spec.name}
                  className="flex items-center gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                    <spec.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {spec.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-2xl bg-primary p-12 text-center md:p-16">
              <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
                Voce e pintor profissional?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/90">
                Cadastre-se gratuitamente e receba 1% de comissao sobre as
                compras dos seus clientes na FG Tintas. Aumente sua
                visibilidade e seus ganhos.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/cadastro">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 px-8"
                  >
                    Cadastrar Agora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/profissionais">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Ver Profissionais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
