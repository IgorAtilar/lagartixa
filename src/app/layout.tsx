import type { Metadata } from 'next';
import { Roboto, Staatliches } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const staatliches = Staatliches({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-staatliches',
});

export const metadata: Metadata = {
  title: 'Lagartixa | Acompanhe suas criptomoedas favoritas',
  description:
    'Cadastre-se e acompanhe suas criptomoedas favoritas com gráficos e valores atualizados em tempo real.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${staatliches.variable} ${roboto.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
