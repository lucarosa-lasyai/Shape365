import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shape365 - Seu Companheiro Fitness",
  description: "Treinamento personalizado, desafios motivadores e comunidade engajada para alcançar seus objetivos fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
