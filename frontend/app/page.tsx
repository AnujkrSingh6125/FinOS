"use client";

import React, { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { TrendingUp, ShieldCheck, Cpu, Globe2, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // If already authenticated, forward directly to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Navigation / Brand Bar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 font-bold text-sm tracking-wider">F</span>
          </div>
          <span className="text-base font-bold tracking-tight text-white">FinOS</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Auth Gateway v1.0</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Institutional Security</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 lg:py-12">
        {/* Hero Title & Subtitles */}
        <div className="text-center max-w-2xl mx-auto mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Next-Gen Wealth & Capital Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3">
            FinOS
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-400/90 tracking-wide uppercase text-xs sm:text-sm font-mono mb-3">
            Financial Operating System
          </p>
          <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
            Intelligent financial decisions powered by AI.
          </p>

          {/* Quick Pillars */}
          <div className="hidden md:flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Automated Portfolio Analytics
            </span>
            <span className="h-3 w-px bg-slate-800"></span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Autonomous AI Risk Guardrails
            </span>
            <span className="h-3 w-px bg-slate-800"></span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              Real-Time Macro Feeds
            </span>
          </div>
        </div>

        {/* Authentication Form Card */}
        <LoginForm />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto py-6 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} FinOS Inc.</span>
          <span>&middot;</span>
          <span>Bank-Grade Encryption</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>&middot;</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>&middot;</span>
          <span className="hover:text-slate-400 cursor-pointer">Security Whitepaper</span>
        </div>
      </footer>
    </main>
  );
}
