import Link from "next/link";
import { Paintbrush, Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Paintbrush className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                FG Tintas
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Especializada em tintas automotivas, imobiliarias e
              industriais. Qualidade e variedade para todos os seus projetos.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navegacao
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Inicio
              </Link>
              <Link
                href="/profissionais"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Profissionais
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Area do Profissional
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contato
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Rod. Pres. Tancredo de Almeida Neves, 2725
                  <br />
                  Serpa, Caieiras/SP
                </p>
              </div>
              <a
                href="https://wa.me/551146056220"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                (11) 4605-6220
              </a>
              <a
                href="mailto:contato@fgtintas.com.br"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                contato@fgtintas.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {"FG Tintas - Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
