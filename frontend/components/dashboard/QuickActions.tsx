"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, PieChart, Activity, ShieldCheck, ArrowRight } from "lucide-react";

interface QuickActionsProps {
  onOpenAssistant: () => void;
}

export function QuickActions({ onOpenAssistant }: QuickActionsProps) {
  const actions = [
    {
      label: "Ask FinOS",
      desc: "Natural language query",
      icon: Sparkles,
      onClick: onOpenAssistant,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40",
    },
    {
      label: "Generate Report",
      desc: "Multi-agent PDF summary",
      icon: FileText,
      href: "/reports",
      color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/40",
    },
    {
      label: "Analyze Portfolio",
      desc: "NAV & factor loadings",
      icon: PieChart,
      href: "/portfolio",
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40",
    },
    {
      label: "Market Summary",
      desc: "NIFTY, S&P & news",
      icon: Activity,
      href: "/market",
      color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/40",
    },
    {
      label: "Risk Check",
      desc: "Simulate 99% VaR",
      icon: ShieldCheck,
      href: "/agents/risk",
      color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        const content = (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow transition text-left group cursor-pointer w-full">
            <div className={`p-2 rounded-lg border shrink-0 ${act.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {act.label}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {act.desc}
              </div>
            </div>
          </div>
        );

        if (act.href) {
          return (
            <Link key={idx} href={act.href} className="w-full">
              {content}
            </Link>
          );
        }

        return (
          <button key={idx} type="button" onClick={act.onClick} className="w-full">
            {content}
          </button>
        );
      })}
    </div>
  );
}
