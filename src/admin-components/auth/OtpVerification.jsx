'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import { API_BASE_URL } from "@/utils/config";

export default function OtpVerification({
  email,
  context,
  onVerifySuccess,
  onCancel,
  backendUrl = `${API_BASE_URL}`
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOnChange = ({ target }, index) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (value) {
      if (index < 5) setActiveOTPIndex(index + 1);
      else {
        // Automatically verify when the last digit is entered
        const finalOtp = newOTP.join('');
        if (finalOtp.length === 6) {
          verifyOtp(finalOtp);
        }
      }
    }
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveOTPIndex(index - 1);
    }
  };

  const resendOtp = async () => {
    if (timer > 0) return;
    
    setIsResending(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/otp/send`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, context }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }

      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      setActiveOTPIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  const verifyOtp = async (otpCode) => {
    setIsVerifying(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/otp/verify`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode, context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onVerifySuccess(data);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setOtp(['', '', '', '', '', '']);
      setActiveOTPIndex(0);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
      <div className="flex items-center mb-6">
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-2xl font-bold text-neutral-800 ml-2">Verify Email</h2>
      </div>

      <p className="text-neutral-600 mb-8">
        We've sent a 6-digit verification code to <span className="font-semibold text-neutral-800">{email}</span>
      </p>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-100"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <p>Verified successfully! Redirecting...</p>
        </motion.div>
      )}

      <div className="flex justify-between gap-2 mb-8">
        {otp.map((_, index) => (
          <input
            key={index}
            ref={index === activeOTPIndex ? inputRef : null}
            type="number"
            className={cn(
              "w-12 h-14 text-center text-2xl font-semibold rounded-xl border-2 bg-neutral-50 outline-none transition-all",
              "focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/20",
              error ? "border-red-300 focus:border-red-500" : "border-neutral-200"
            )}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            value={otp[index]}
            disabled={isVerifying || success}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => verifyOtp(otp.join(''))}
          disabled={otp.join('').length < 6 || isVerifying || success}
          className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        <div className="text-sm text-neutral-500">
          Didn't receive the code?{' '}
          {timer > 0 ? (
            <span className="font-medium text-neutral-700">
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={resendOtp}
              disabled={isResending}
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
