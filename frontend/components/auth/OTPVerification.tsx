"use client";

import React, { useState, useEffect } from "react";
import { OTPInput } from "./OTPInput";
import { api } from "@/lib/api";
import { Clock, RefreshCw, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface OTPVerificationProps {
  email: string;
  initialCooldown?: number;
  onBack: () => void;
  onSuccessRedirect?: () => void;
}

export function OTPVerification({
  email,
  initialCooldown = 60,
  onBack,
  onSuccessRedirect,
}: OTPVerificationProps) {
  const { checkSession } = useAuth();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // 5 minutes expiry countdown (300 seconds)
  const [expirySeconds, setExpirySeconds] = useState(300);
  // Resend cooldown timer
  const [resendCooldown, setResendCooldown] = useState(initialCooldown);

  // Expiry timer countdown
  useEffect(() => {
    if (expirySeconds <= 0) return;
    const timer = setInterval(() => {
      setExpirySeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [expirySeconds]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (otpToVerify?: string) => {
    const targetCode = otpToVerify || code;
    if (targetCode.length !== 6) return;

    if (expirySeconds <= 0) {
      setErrorMessage("This verification code has expired. Please request a new code.");
      return;
    }

    try {
      setIsVerifying(true);
      setErrorMessage(null);

      await api.verifyEmailCode(email, targetCode);
      setIsSuccess(true);
      await checkSession();

      setTimeout(() => {
        if (onSuccessRedirect) {
          onSuccessRedirect();
        } else {
          window.location.href = "/dashboard";
        }
      }, 700);
    } catch (err: unknown) {
      setIsVerifying(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Incorrect verification code. Please try again.");
      }
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (errorMessage) setErrorMessage(null);

    // Auto submit when 6 digits are fully filled
    if (newCode.length === 6) {
      handleVerify(newCode);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    try {
      setIsResending(true);
      setErrorMessage(null);
      const res = await api.requestEmailCode(email);

      // Reset timers
      setExpirySeconds(300);
      setResendCooldown(res.cooldown_seconds ?? 60);
      setCode("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unable to resend code. Please wait and try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          disabled={isVerifying || isSuccess}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors mb-3 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change email address</span>
        </button>

        <h2 className="text-xl font-bold text-white tracking-tight">Verify your email</h2>
        <p className="text-sm text-slate-400 mt-1">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-semibold text-slate-200">{email}</span>
        </p>
      </div>

      {/* 6-digit OTP Input */}
      <div>
        <OTPInput
          value={code}
          onChange={handleCodeChange}
          disabled={isVerifying || isSuccess}
          isError={!!errorMessage}
          length={6}
        />

        {/* Expiry Timer Indicator */}
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {expirySeconds > 0 ? (
                <>
                  Code expires in{" "}
                  <span className="font-mono font-semibold text-slate-200">
                    {formatTimer(expirySeconds)}
                  </span>
                </>
              ) : (
                <span className="text-amber-400 font-medium">Code expired</span>
              )}
            </span>
          </div>

          <div>
            {resendCooldown > 0 ? (
              <span className="text-slate-500 font-mono">
                Resend in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition focus:outline-none"
              >
                <RefreshCw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
                <span>Resend code</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Success Notification */}
      {isSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-medium">Verification successful! Redirecting to FinOS...</span>
        </div>
      )}

      {/* Verify Button */}
      <button
        type="button"
        onClick={() => handleVerify()}
        disabled={isVerifying || isSuccess || code.length !== 6 || expirySeconds <= 0}
        className="w-full btn-primary py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified</span>
          </>
        ) : (
          <span>Verify & Enter FinOS</span>
        )}
      </button>

      <div className="text-center">
        <span className="text-xs text-slate-500">
          Didn&apos;t receive the code? Check spam or{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isResending}
            className="text-slate-400 hover:text-emerald-400 underline underline-offset-2 disabled:text-slate-600 disabled:no-underline"
          >
            resend code
          </button>
        </span>
      </div>
    </div>
  );
}
