"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User as UserIcon,
  Shield,
  Activity,
  PieChart,
  Bot,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center finos-grid-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 font-mono tracking-wider">
            Loading FinOS Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const modules = [
    { title: "Portfolio", icon: PieChart, desc: "Multi-asset tracking & NAV reconciliation", color: "text-emerald-400" },
    { title: "Investments", icon: TrendingUp, desc: "Quantitative strategies & execution hooks", color: "text-cyan-400" },
    { title: "Risk & Guardrails", icon: AlertTriangle, desc: "VaR modeling & stress simulation", color: "text-amber-400" },
    { title: "AI Copilot", icon: Bot, desc: "Natural language financial intelligence", color: "text-purple-400" },
    { title: "Tax & Credit", icon: DollarSign, desc: "Automated liability & credit lines", color: "text-blue-400" },
    { title: "Autonomous Agents", icon: Cpu, desc: "Decentralized market monitoring agents", color: "text-rose-400" },
  ];

  return (
    <div className="min-h-screen flex flex-col finos-grid-bg">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-sm tracking-wider">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight">FinOS</span>
              <span className="text-[10px] text-emerald-400 font-mono">FINANCIAL OPERATING SYSTEM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">{user.email}</span>
              {user.google_id && (
                <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                  Google
                </span>
              )}
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30 border border-slate-700 transition"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-2xl finos-card border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48 text-emerald-400" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
              <Shield className="w-3 h-3" />
              <span>AUTHENTICATION GATEWAY VERIFIED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Welcome to FinOS, <span className="text-emerald-400">{user.name || user.email.split("@")[0]}</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your institutional session is active via secure HttpOnly cookie. The FinOS authentication gateway has validated your identity and prepared your financial command center.
            </p>
          </div>

          {/* User Session Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">User ID</span>
              <span className="text-sm font-mono text-slate-200">#00{user.id}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Email</span>
              <span className="text-sm font-mono text-slate-200 truncate block">{user.email}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Auth Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Verified & Active
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Session Mode</span>
              <span className="text-xs font-mono text-slate-300">
                {user.google_id ? "OAuth 2.0 (Google)" : "6-Digit Secure OTP"}
              </span>
            </div>
          </div>
        </div>

        {/* Modular Ecosystem Ready For Integration */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">FinOS Financial Modules</h2>
              <p className="text-xs text-slate-400">Next layers ready to connect to this authentication foundation</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              6 Modules Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="finos-card p-5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-lg bg-slate-900 border border-slate-800 ${m.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                      Integrated
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
