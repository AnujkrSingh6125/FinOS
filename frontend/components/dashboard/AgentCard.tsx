"use client";

import React from "react";
import Link from "next/link";
import { Agent } from "@/types/agent";
import {
  TrendingUp,
  Newspaper,
  Globe,
  ShieldAlert,
  Receipt,
  FileText,
  Zap,
  ShieldCheck,
  CreditCard,
  PieChart,
  ArrowRight,
  Bot,
} from "lucide-react";

interface AgentCardProps {
  agent: Agent;
}

// Icon mapper for dynamic agent icons
const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Newspaper,
  Globe,
  ShieldAlert,
  Receipt,
  FileText,
  Zap,
  ShieldCheck,
  CreditCard,
  PieChart,
};

export function AgentCard({ agent }: AgentCardProps) {
  const IconComponent = ICON_MAP[agent.iconName] || Bot;

  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
    >
      <div>
        {/* Top Header: Icon + Category + Status indicator */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div
            className={`h-9 w-9 rounded-xl ${agent.color.bgLight} ${agent.color.bgDark} ${agent.color.borderLight} ${agent.color.borderDark} border flex items-center justify-center shrink-0 ${agent.color.text} transition-transform group-hover:scale-105`}
          >
            <IconComponent className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400 capitalize">
              {agent.status}
            </span>
          </div>
        </div>

        {/* Agent Name */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight mb-1">
          {agent.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2 mb-3">
          {agent.shortDescription}
        </p>

        {/* Capability Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {agent.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
        <span>Open Agent</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
