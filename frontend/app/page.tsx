"use client";

import React, { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  ShieldCheck,
  Activity,
  Lock,
  Globe,
  ChevronDown,
  Moon,
} from "lucide-react";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // If already authenticated, forward directly to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const features = [
    {
      icon: TrendingUp,
      title: "Automated Portfolio Analytics",
      description: "Get deeper insights with AI",
    },
    {
      icon: ShieldCheck,
      title: "AI Risk Guardrails",
      description: "Detect and prevent risks early",
    },
    {
      icon: Activity,
      title: "Real-Time Market Feeds",
      description: "Stay ahead with live intelligence",
    },
    {
      icon: Lock,
      title: "Institution-Grade Security",
      description: "Your data stays private and protected",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8fafc]">
      {/* ================= LEFT COLUMN: HERO SHOWCASE WITH BACKGROUND IMAGE ================= */}
      <div className="relative w-full lg:w-[58%] min-h-[600px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white overflow-hidden">
        {/* Background Image with Dark Tint Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: "url('/login-bg.png')" }}
        />
        {/* Rich dark gradient overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/82 to-slate-950/65 backdrop-blur-[0.5px]" />

        {/* Top Header inside Left Hero */}
        <header className="relative z-10 flex items-center justify-between">
          {/* FinOS Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Custom stylized FinOS layered icon */}
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 p-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white leading-none">
                Fin<span className="text-emerald-400">OS</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-[0.25em] uppercase mt-1">
                FINANCIAL OPERATING SYSTEM
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center space-x-6 text-sm text-slate-300 font-medium">
            <a href="#solutions" className="hover:text-emerald-400 transition-colors">
              Solutions
            </a>
            <a href="#security" className="hover:text-emerald-400 transition-colors">
              Security
            </a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">
              Contact
            </a>
          </nav>
        </header>

        {/* Center Content: Headline & 4 Feature Pillars */}
        <div className="relative z-10 my-auto py-10 lg:py-14 max-w-xl">
          {/* Breadcrumb / Tagline */}
          <div className="text-[11px] font-semibold tracking-[0.25em] text-slate-300/80 uppercase mb-4 flex items-center gap-2">
            <span>DATA</span>
            <span className="text-emerald-400 font-bold">×</span>
            <span>INTELLIGENCE</span>
            <span className="text-emerald-400 font-bold">×</span>
            <span>IMPACT</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.15] mb-4">
            Turn Financial <br />
            Data into <br />
            <span className="text-emerald-400">Smarter Decisions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-8 max-w-lg">
            FinOS is an AI-powered financial operating system designed to help
            institutions and individuals make faster, smarter and more confident
            decisions.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-full bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-emerald-900/40">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-normal">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quote & FinOS Signature */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <p className="text-xs sm:text-sm italic text-slate-300/90 font-light">
            &ldquo;Empowering better financial decisions for a stronger tomorrow.&rdquo;
          </p>
          <span className="block text-xs font-semibold text-slate-400 mt-1">
            FinOS
          </span>
        </div>
      </div>

      {/* ================= RIGHT COLUMN: LOGIN FORM PANEL ================= */}
      <div className="w-full lg:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#f8fafc]">
        {/* Top bar: Language & Theme Controls */}
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer transition">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>English</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            type="button"
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition focus:outline-none"
            title="Dark mode"
          >
            <Moon className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Center: Auth Card */}
        <div className="my-auto py-8">
          <LoginForm />
        </div>

        {/* Bottom Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-6 border-t border-slate-200/60 max-w-[440px] w-full mx-auto">
          <div>
            &copy; {new Date().getFullYear()} FinOS Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-600 transition">
              Privacy
            </a>
            <a href="#terms" className="hover:text-slate-600 transition">
              Terms
            </a>
            <a href="#support" className="hover:text-emerald-700 transition">
              Support
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
