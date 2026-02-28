import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { OrcamentoProvider } from "@/context/OrcamentoContext";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FG Tintas - Tintas Automotivas, Imobiliarias e Industriais",
  description:
    "FG Tintas - Especializada em tintas automotivas, imobiliarias e industriais. Encontre profissionais qualificados para seu projeto.",
  keywords:
    "tintas, pintura, automotiva, imobiliaria, industrial, Caieiras, SP",
};

export const viewport: Viewport = {
  themeColor: "#3563E9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <AuthProvider>
          <OrcamentoProvider>
            {children}
            <Toaster />
          </OrcamentoProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}