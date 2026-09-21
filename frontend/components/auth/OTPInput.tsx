"use client";

import React, { useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isError?: boolean;
  length?: number;
}

export function OTPInput({
  value,
  onChange,
  disabled = false,
  isError = false,
  length = 6,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of length
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    // Focus first empty box or box 0 on mount
    const firstEmptyIndex = digits.findIndex((d) => !d);
    const targetIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    if (inputRefs.current[targetIndex] && !disabled) {
      inputRefs.current[targetIndex]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const sanitized = rawVal.replace(/\D/g, "");

    if (!sanitized) {
      // Clear current digit
      const nextDigits = [...digits];
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    // Single digit input
    const nextChar = sanitized.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = nextChar;
    const nextValue = nextDigits.join("");
    onChange(nextValue);

    // Auto advance to next box
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current is already empty, move to prev box and clear it
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        onChange(nextDigits.join(""));
        inputRefs.current[index - 1]?.focus();
        e.preventDefault();
      } else if (digits[index]) {
        // Clear current box
        const nextDigits = [...digits];
        nextDigits[index] = "";
        onChange(nextDigits.join(""));
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    if (!pastedData) return;

    const trimmed = pastedData.slice(0, length);
    onChange(trimmed);

    // Focus on the next appropriate input box
    const focusIdx = Math.min(trimmed.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-between items-center gap-2 sm:gap-3 my-2" role="group" aria-label="Verification code">
      {Array.from({ length }).map((_, i) => {
        const digit = digits[i] || "";
        const hasValue = !!digit;

        return (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={`otp-digit-box ${hasValue ? "has-value" : ""} ${
              isError ? "border-red-500/70 focus:ring-red-500/40 text-red-300" : ""
            }`}
          />
        );
      })}
    </div>
  );
}
