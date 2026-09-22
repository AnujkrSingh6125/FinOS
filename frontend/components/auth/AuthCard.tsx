"use client";

import React, { ReactNode } from "react";
import { ShieldCheck, Users, Lock } from "lucide-react";

interface AuthCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="w-full max-w-[440px] mx-auto">
      <div className="bg-white rounded-2xl p-7 sm:p-9 shadow-xl shadow-slate-200/60 border border-slate-100/90 transition-all duration-300">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Card Body */}
        {children}

        {/* Security & compliance footer badges */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Trusted by Institutions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Privacy First</span>
          </div>
        </div>
      </div>
    </div>
  );
}
