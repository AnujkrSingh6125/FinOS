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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid email address (e.g. user@finos.io).");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      console.log("[FinOS] Requesting OTP code for:", cleanEmail);

      const response = await api.requestEmailCode(cleanEmail);
      console.log("[FinOS] OTP response received:", response);
      onCodeSent(cleanEmail, response.cooldown_seconds ?? 60);
    } catch (err: unknown) {
      console.error("[FinOS] OTP Request error:", err);
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
        <label htmlFor="email-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
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
            className="w-full pl-10 pr-4 py-3 rounded-xl finos-input text-sm placeholder:text-slate-600 disabled:opacity-50"
            required
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={disabled || isLoading || !email.trim()}
        className="w-full btn-primary py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending verification code...</span>
          </>
        ) : (
          <>
            <span>Continue with Email</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
