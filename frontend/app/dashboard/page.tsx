"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { AgentGrid } from "@/components/dashboard/AgentGrid";
import { ALL_AGENTS } from "@/lib/mock/agents";
import { MOCK_PORTFOLIO_SUMMARY } from "@/lib/mock/portfolio";
import { MOCK_INDICES } from "@/lib/mock/market";
import {
  Sparkles,
  TrendingUp,
  Shield,
  Activity,
  ArrowRight,
  Bot,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileText,
  PieChart,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const handleOpenAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("finos:open-assistant"));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#080c14] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Institutional Welcome & Greeting Banner */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Institutional Command Center
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-mono">Session Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Welcome back{user?.name ? `, ${user.name}` : user?.email ? `, ${user.email.split("@")[0]}` : ""}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              10 autonomous agents are monitoring multi-asset positions, market liquidity, and macro events in real time.
            </p>
          </div>

          {/* Quick Metrics Pill */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 bg-slate-50 dark:bg-slate-800/60 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Total NAV</div>
              <div className="font-bold text-slate-900 dark:text-white mt-0.5">₹88.71L</div>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Today&apos;s Return</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+1.42%</div>
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase">Portfolio Beta</div>
              <div className="font-bold text-slate-900 dark:text-white mt-0.5">0.88 (Low)</div>
            </div>
          </div>
        </section>

        {/* Real-time System Status Indicators */}
        <SystemStatus />

        {/* Quick Action Shortcuts */}
        <QuickActions onOpenAssistant={handleOpenAssistant} />

        {/* Active Multi-Agent Consensus Banner */}
        <section className="bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-blue-500/10 dark:from-emerald-950/40 dark:via-purple-950/40 dark:to-blue-950/40 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white">
                  Multi-Agent Consensus
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Scenario #01: RBI Rate Policy Stance
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                Recommendation: Extend Fixed Income Duration (+0.6Y) & Accumulate Banking Leaders
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Synthesis of Macro, News, Risk, and Investment agents projects a 65% probability of repo rate reduction by Q4. Inflation moderation provides cushion for banking net interest margins.
              </p>
            </div>
          </div>

          <Link
            href="/analysis/multi-agent"
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold whitespace-nowrap shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 self-start md:self-center"
          >
            <span>Inspect Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* 10 AI Agents Grid (5x2 Layout) */}
        <AgentGrid agents={ALL_AGENTS} />

        {/* Dual Snapshot Section: Portfolio Pulse & Market Tickers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Snapshot Preview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Portfolio Pulse</h3>
                </div>
                <Link
                  href="/portfolio"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Full Analytics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 font-mono text-xs mb-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Current NAV</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">₹88,71,765</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Total Gain</div>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">+₹17.71L</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Sharpe Ratio</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">2.18</div>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Current asset allocation stands at 72.3% Equities, 17.2% Fixed Income, 6.5% Commodities, and 4.0% Liquid Cash. Rebalancing within target risk budget.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Last audited by Portfolio Agent</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">15:30 IST Today</span>
            </div>
          </div>

          {/* Market Pulse Tickers */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Market Telemetry</h3>
                </div>
                <Link
                  href="/market"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Market Board</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {MOCK_INDICES.map((idx) => {
                  const isPositive = idx.change >= 0;
                  return (
                    <div
                      key={idx.symbol}
                      className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 dark:text-white font-mono">{idx.symbol}</span>
                        <span
                          className={`font-bold font-mono ${
                            isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {idx.changePercent}%
                        </span>
                      </div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-mono mt-1">
                        {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Feed latency: &lt;45ms via WebSocket</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Live Tick Flow</span>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
