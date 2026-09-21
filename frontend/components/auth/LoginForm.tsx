"use client";

import React, { useState } from "react";
import { AuthCard } from "./AuthCard";
import { EmailLogin } from "./EmailLogin";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { OTPVerification } from "./OTPVerification";
import { AuthStep } from "@/types/auth";

export function LoginForm() {
  const [step, setStep] = useState<AuthStep>("EMAIL_INPUT");
  const [userEmail, setUserEmail] = useState<string>("");
  const [cooldown, setCooldown] = useState<number>(60);

  const handleCodeSent = (email: string, cooldownSeconds?: number) => {
    setUserEmail(email);
    setCooldown(cooldownSeconds ?? 60);
    setStep("OTP_VERIFY");
  };

  const handleBackToEmail = () => {
    setStep("EMAIL_INPUT");
  };

  return (
    <AuthCard
      title={step === "EMAIL_INPUT" ? "Welcome back" : undefined}
      subtitle={
        step === "EMAIL_INPUT"
          ? "Access your institutional-grade financial workspace."
          : undefined
      }
    >
      {step === "EMAIL_INPUT" ? (
        <div className="space-y-6">
          <EmailLogin onCodeSent={handleCodeSent} />

          {/* Clean fintech divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] font-medium uppercase tracking-widest text-slate-500">
              OR
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <GoogleLoginButton />
        </div>
      ) : (
        <OTPVerification
          email={userEmail}
          initialCooldown={cooldown}
          onBack={handleBackToEmail}
        />
      )}
    </AuthCard>
  );
}
