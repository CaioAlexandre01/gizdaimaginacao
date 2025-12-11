import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giz da Imaginação",
  description: "Kits pedagógicos para imprimir e aprender brincando.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-amber-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
