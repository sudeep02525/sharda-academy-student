'use client';

import React, { useState } from 'react';
import RequestOtpForm from './RequestOtpForm';
import OtpVerification from './OtpVerification';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthFlow({
  context = 'login',
  title = "Sign In",
  subtitle = "Enter your email to receive a verification code",
  onSuccess
}) {
  const [step, setStep] = useState('request'); // 'request' | 'verify'
  const [email, setEmail] = useState('');

  const handleOtpRequested = (requestedEmail) => {
    setEmail(requestedEmail);
    setStep('verify');
  };

  const handleVerifySuccess = (data) => {
    // Optionally save token to localStorage/cookies here
    // localStorage.setItem('token', data.token);
    if (onSuccess) {
      onSuccess(data);
    }
  };

  const handleCancel = () => {
    setStep('request');
    setEmail('');
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="relative overflow-hidden w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 'request' && (
          <motion.div
            key="request"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <RequestOtpForm
              context={context}
              title={title}
              subtitle={subtitle}
              onOtpRequested={handleOtpRequested}
            />
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div
            key="verify"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <OtpVerification
              email={email}
              context={context}
              onVerifySuccess={handleVerifySuccess}
              onCancel={handleCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
