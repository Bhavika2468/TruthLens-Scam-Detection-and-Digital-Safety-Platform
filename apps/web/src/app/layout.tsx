import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ScamShield AI',
    template: '%s · ScamShield AI',
  },
  description: 'AI-powered Digital Trust and Cyber Safety Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(168,85,247,0.12),transparent_50%)] text-zinc-100 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(236,72,153,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.10)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.12]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/0 via-black/20 to-black/40" />
        {children}
      </body>
    </html>
  );
}

