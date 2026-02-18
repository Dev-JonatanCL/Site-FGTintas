"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapPin, Phone, MessageCircle, User } from "lucide-react";

interface ProfessionalCardProps {
  name: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  photo: string;
}

export function ProfessionalCard({
  name,
  specialty,
  description,
  city,
  state,
  phone,
  whatsapp,
}: ProfessionalCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Ola ${name}! Vi seu perfil no site da FG Tintas e gostaria de saber mais sobre seus servicos de ${specialty}.`
  );
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

  return (
    <Card className="flex h-full flex-col overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-foreground">
              {name}
            </h3>
            <Badge
              variant="secondary"
              className="mt-1 bg-primary/10 text-primary"
            >
              {specialty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>
              {city}/{state}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full gap-2 bg-[#25D366] text-[#fff] hover:bg-[#1EB954]">
            <MessageCircle className="h-4 w-4" />
            Chamar no WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
