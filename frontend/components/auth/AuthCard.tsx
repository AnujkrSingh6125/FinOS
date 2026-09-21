"use client";

import React, { ReactNode } from "react";
import { ShieldCheck, Lock } from "lucide-react";

interface AuthCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Subtle outer glow effect */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-emerald-600/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>

        <div className="relative finos-card rounded-2xl p-8 sm:p-10 shadow-2xl border border-white/10">
          {/* FinOS brand badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-lg tracking-wider">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  FinOS
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Core
                  </span>
                </span>
                <span className="text-[11px] text-slate-400">Financial Operating System</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-bit Secure</span>
            </div>
          </div>

          {/* Heading */}
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>}
              {subtitle && <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{subtitle}</p>}
            </div>
          )}

          {/* Card Body */}
          {children}

          {/* Security & compliance footer */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
            <span>End-to-End Encrypted Financial Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}
