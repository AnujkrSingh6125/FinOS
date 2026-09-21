import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "FinOS — Financial Operating System",
  description: "Intelligent financial decisions powered by AI.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen finos-grid-bg text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
