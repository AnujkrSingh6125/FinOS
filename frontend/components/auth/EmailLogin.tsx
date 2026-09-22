"use client";

import React, { useState, FormEvent } from "react";
import { Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

interface EmailLoginProps {
  onCodeSent: (email: string, cooldownSeconds?: number) => void;
  disabled?: boolean;
}

export function EmailLogin({ onCodeSent, disabled }: EmailLoginProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid email address (e.g. name@company.com).");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await api.requestEmailCode(cleanEmail);
      onCodeSent(cleanEmail, response.cooldown_seconds ?? 60);
    } catch (err: unknown) {
      setIsLoading(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unable to send verification code. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="email-input"
          className="block text-xs font-semibold text-slate-700 tracking-normal mb-1.5"
        >
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="h-4 w-4" />
          </div>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="name@company.com"
            disabled={disabled || isLoading}
            autoComplete="email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50"
            required
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={disabled || isLoading || !email.trim()}
        className="w-full bg-[#047857] hover:bg-[#065f46] text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Sending verification code...</span>
          </>
        ) : (
          <>
            <span>Continue with Email</span>
            <ArrowRight className="w-4 h-4 text-emerald-100" />
          </>
        )}
      </button>
    </form>
  );
}
