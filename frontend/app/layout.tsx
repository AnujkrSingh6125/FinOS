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
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-emerald-500/20 selection:text-emerald-600 bg-slate-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
