import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DiCapri AI Dashboard',
  description: 'Dashboard de equipes de IA especializadas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
