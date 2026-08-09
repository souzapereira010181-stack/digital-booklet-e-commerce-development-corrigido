import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Kleber Store – Apostilas de Segurança, APH e Resgate",
  description: "Apostilas profissionais em PDF para segurança do trabalho, primeiros socorros e resgate. Download imediato após pagamento.",
  keywords: ["apostilas", "segurança do trabalho", "APH", "resgate", "NR", "primeiros socorros"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
