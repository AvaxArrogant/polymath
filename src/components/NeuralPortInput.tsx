import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { submitToWaitlist } from '../lib/supabase';

interface NeuralPortInputProps {
  onSubmitStart: () => void;
  onSubmitComplete: () => void;
  onSignupSuccess?: (email: string) => void;
}

export default function NeuralPortInput({ onSubmitStart, onSubmitComplete, onSignupSuccess }: NeuralPortInputProps) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('INVALID_EMAIL_FORMAT');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setError('');
    onSubmitStart();

    try {
      console.log('Submitting email to waitlist:', email);
      const result = await submitToWaitlist(email, {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
      console.log('Submission successful:', result);

      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        onSubmitComplete();
        if (onSignupSuccess) {
          onSignupSuccess(email);
        }
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      let errorMessage = 'UNKNOWN_ERROR';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        errorMessage = (err as any).message || (err as any).error_description || JSON.stringify(err);
      }
      if (errorMessage === 'DUPLICATE_EMAIL') {
        setError('NEURAL_ID_ALREADY_EXISTS');
      } else {
        setError(`CONNECTION_FAILED: ${errorMessage}`);
      }
      setIsSubmitting(false);
      onSubmitComplete();
      setTimeout(() => setError(''), 4000);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto p-8 rounded bg-black border border-neon-green font-mono text-neon-green"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✓</div>
          <div className="text-2xl font-bold">ACCESS GRANTED</div>
          <div className="text-sm opacity-80">Neural_ID successfully uploaded to mainframe.</div>
          <div className="text-xs pt-4 border-t border-neon-green/30 mt-4">
            ⟳ SYNCHRONIZING_WITH_NEURAL_NETWORK...
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="w-full max-w-2xl mx-auto font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className={`relative bg-black/80 border-2 p-4 rounded transition-colors duration-200 ${isFocused ? 'border-neon-green' : 'border-white/20'
        } ${error ? 'border-strike-red' : ''}`}>

        {/* Terminal Prompt Line */}
        <div className="flex items-center gap-3 text-lg">
          <span className="text-neon-green select-none">root@polymath:~$</span>
          <span className="text-white/60 select-none">add_email</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isSubmitting}
              className="w-full bg-transparent outline-none text-white caret-transparent"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Custom Cursor */}
            <div className="absolute inset-0 pointer-events-none flex items-center">
              <span className="opacity-0 whitespace-pre">{email}</span>
              {isFocused && showCursor && (
                <span className="w-2.5 h-5 bg-neon-green inline-block ml-0.5" />
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute -bottom-8 left-0 text-strike-red text-sm">
            [ERROR] :: {error}
          </div>
        )}
      </div>

      {/* Submit Button / Hint */}
      <div className="mt-4 flex justify-between items-center text-xs text-white/40">
        <div>SECURE_CONNECTION :: ENCRYPTED</div>
        <button
          type="submit"
          disabled={!email || isSubmitting}
          className="flex items-center gap-2 hover:text-neon-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          [ {isSubmitting ? 'EXECUTING...' : 'EXECUTE'} ] <span className="text-[10px]">↵</span>
        </button>
      </div>
    </motion.form>
  );
}
