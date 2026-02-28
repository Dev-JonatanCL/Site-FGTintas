"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/banner_1.jpeg",
    title: "FG Tintas",
    subtitle: "Sua loja especializada em tintas",
    description:
      "Tintas imobiliarias, automotivas e industriais com a melhor qualidade e precos.",
    cta: "Ver Produtos",
    href: "/produtos",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Profissionais Qualificados",
    subtitle: "Encontre o pintor ideal",
    description:
      "Conectamos voce aos melhores profissionais de pintura da regiao.",
    cta: "Encontrar Profissional",
    href: "/profissionais",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Resultados Incriveis",
    subtitle: "Qualidade garantida",
    description:
      "Trabalho profissional com materiais de primeira linha para transformar seus ambientes.",
    cta: "Saiba Mais",
    href: "/profissionais",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[500px] w-full md:h-[600px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-foreground/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="mx-auto max-w-3xl px-4 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
                      {slide.subtitle}
                    </p>
                    <h1 className="mb-4 text-balance text-4xl font-bold text-primary-foreground md:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-pretty text-lg text-primary-foreground/90 md:text-xl">
                      {slide.description}
                    </p>
                    <Link href={slide.href}>
                      <Button
                        size="lg"
                        className="bg-primary px-8 text-primary-foreground hover:bg-primary/90"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-card/40"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-card/40"
          aria-label="Proximo slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-8 bg-primary-foreground"
                  : "w-2 bg-primary-foreground/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
