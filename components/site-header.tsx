"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Paintbrush,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-15 w-15 items-center justify-center rounded-lg">
            <img src="/images/logo.png" alt="Logo FG Tintas"/>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </Link>
          <Link
            href="/produtos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Produtos
          </Link>
          <Link
            href="/profissionais"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Profissionais
          </Link>
          <a
            href="https://wa.me/551146056220"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contato
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/admin"
                        : "/profissional/dashboard"
                    }
                    className="gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Painel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Area do Profissional
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu de navegacao</SheetTitle>
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                Inicio
              </Link>
              <Link
                href="/profissionais"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                Profissionais
              </Link>
              <a
                href="https://wa.me/551146056220"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground"
              >
                Contato
              </a>
              {isAuthenticated ? (
                <>
                  <Link
                    href={
                      user?.role === "admin"
                        ? "/admin"
                        : "/profissional/dashboard"
                    }
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-primary"
                  >
                    Painel
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="text-left text-sm font-medium text-destructive"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary"
                >
                  Area do Profissional
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
