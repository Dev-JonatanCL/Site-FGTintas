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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const features = [
  {
    icon: Users,
    title: "Profissionais Qualificados",
    description:
      "Encontre profissionais experientes na sua regiao, para qualquer tipo de pintura.",
  },
  {
    icon: Paintbrush,
    title: "Variedade de Tintas",
    description:
      "Tintas imobiliarias, automotivas e industriais das melhores marcas do mercado.",
  },
  {
    icon: Award,
    title: "Programa de Premiação",
    description:
      "Profissionais cadastrados ganham 1% em premiação sobre as compras de seus clientes na loja. Clientes também recebem um desconto especial.",
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

const articles = [
  {
    title: "Como escolher a tinta ideal para sua casa",
    description:
      "Descubra qual tipo de tinta usar para ambientes internos e externos.",
    link: "/artigos/tinta-ideal",
  },
  {
    title: "Dicas para pintura automotiva perfeita",
    description:
      "Aprenda técnicas profissionais para um acabamento impecável.",
    link: "/artigos/pintura-automotiva",
  },
  {
    title: "Tendências de cores para 2025",
    description:
      "Veja as cores que estão em alta para renovar seu ambiente.",
    link: "/artigos/tendencias-2025",
  },
];

const brands = [
  { name: "Coral", logo: "images/Logo_Coral.png" },
  { name: "Lukscolor", logo: "images/Logo_Lukscolor.png" },
  { name: "Eucatex", logo: "images/Logo_Eucatex.png" },
  { name: "Brasilux", logo: "images/Logo_Brasilux.png" },
  { name: "Gama", logo: "images/Logo_Gama.webp" },
  { name: "Dado", logo: "images/Logo_Dado.png" },
  { name: "Atlas", logo: "images/Logo_Atlas.png" },
  { name: "Tigre", logo: "images/Logo_Tigre.png" },
  { name: "Sayerlack", logo: "images/Logo_Sayerlack.png" },
  { name: "Viapol", logo: "images/Logo_Viapol.png" },
  { name: "Menegotti", logo: "images/Logo_Menegotti.png" },
  { name: "Galo", logo: "images/Logo_Galo.png" },
  { name: "Maxi Rubber", logo: "images/Logo_MaxiRubber.svg" },
  { name: "Norton", logo: "images/Logo_Norton.png" },
  { name: "Mor", logo: "images/Logo_Mor.png" },
  { name: "Qualyvinil", logo: "images/Logo_Qualy.png" },
  { name: "Adere", logo: "images/Logo_Adere.png" },
  { name: "Adelbras", logo: "images/Logo_Adelbras.png" },
];

const partners = [
  { name: "Casa do Construtor", logo: "images/Logo_CC.jpg" },
  { name: "Publi", logo: "images/Logo_Publi.png" },
  { name: "Sun7", logo: "images/Logo_Sun7.jpg" },
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

        {/* Articles section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Artigos e Dicas
              </h2>
              <p className="mt-3 text-muted-foreground">
                Conteúdo exclusivo para profissionais e clientes
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {articles.map((article) => (
                <div
                  key={article.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {article.description}
                  </p>
                  <Link href={article.link}>
                    <Button variant="ghost" className="gap-2 p-0">
                      Ler mais
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
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

        {/* Brands section */}
        <section className="border-y border-border bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Marcas Parceiras
              </h2>
              <p className="mt-2 text-muted-foreground">
                Trabalhamos com as melhores marcas do mercado
              </p>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={40}
              slidesPerView={6}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
              className="items-center"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.name}>
                  <div className="flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Partners section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Nossos Parceiros
              </h2>
              <p className="mt-2 text-muted-foreground">
                Empresas que confiam na FG Tintas
              </p>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
              className="items-center"
            >
              {partners.map((partner) => (
                <SwiperSlide key={partner.name}>
                  <div className="flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
