import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { submitToWaitlist } from '../lib/supabase';

interface NeuralPortInputProps {
  onSubmitStart: () => void;
  onSubmitComplete: () => void;
}

export default function NeuralPortInput({ onSubmitStart, onSubmitComplete }: NeuralPortInputProps) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 200) {
      const force = (200 - distance) / 200;
      mouseX.set(distanceX * force * 0.3);
      mouseY.set(distanceY * force * 0.3);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

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
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      console.error('Submission error:', err);
      let errorMessage = 'UNKNOWN_ERROR';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        // Handle Supabase error object
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
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-2xl mx-auto p-10 rounded-lg border-2 border-neon-green bg-neon-green/10 backdrop-blur-md relative overflow-hidden"
        style={{
          boxShadow: '0 0 60px rgba(57, 255, 20, 0.4), inset 0 0 60px rgba(57, 255, 20, 0.1)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <div className="text-center space-y-6 relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
            className="text-8xl"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(57, 255, 20, 0.8)',
                  '0 0 40px rgba(57, 255, 20, 1)',
                  '0 0 20px rgba(57, 255, 20, 0.8)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✓
            </motion.span>
          </motion.div>

          <div className="font-mono space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl text-neon-green font-bold tracking-wider"
              style={{ textShadow: '0 0 20px rgba(57, 255, 20, 0.6)' }}
            >
              ACCESS GRANTED
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/90 text-base"
            >
              Neural_ID successfully uploaded to mainframe
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-sm pt-4 border-t border-neon-green/30"
            >
              You will receive transmission shortly
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="text-neon-green/70 text-xs pt-2"
            >
              ⟳ SYNCHRONIZING_WITH_NEURAL_NETWORK...
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="w-full max-w-2xl mx-auto relative"
    >
      <div className="relative">
        <div
          className={`w-full px-6 py-5 bg-void-black/80 backdrop-blur-md border-2 rounded-lg font-mono text-lg transition-all duration-200 ${
            isFocused
              ? 'border-neon-green shadow-[0_0_30px_rgba(57,255,20,0.3)]'
              : 'border-white/20'
          } ${error ? 'animate-glitch border-strike-red' : ''}`}
          style={{
            filter: isFocused ? 'drop-shadow(0 0 2px rgba(255,0,0,0.5)) drop-shadow(2px 0 0 rgba(0,255,0,0.3)) drop-shadow(-2px 0 0 rgba(0,0,255,0.3))' : 'none',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isSubmitting}
            className="w-full bg-transparent outline-none text-white placeholder-white/40"
            placeholder="Input_Neural_ID (Email Address)..."
            autoComplete="off"
          />
          {isFocused && email.length === 0 && showCursor && (
            <span className="absolute text-white/40">|</span>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-0 text-strike-red text-sm font-mono"
          >
            ERROR: {error}
          </motion.div>
        )}
      </div>

      <motion.button
        ref={buttonRef}
        type="submit"
        disabled={isSubmitting || !email}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full mt-6 px-8 py-5 font-mono text-xl font-bold text-white rounded-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${
          isSubmitting ? 'bg-neon-green' : 'bg-electric-indigo'
        }`}
        style={{
          x,
          y,
          boxShadow: isSubmitting ? '0 0 40px rgba(57, 255, 20, 0.6), 0 0 80px rgba(57, 255, 20, 0.4)' : 'none',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-electric-indigo/20"
          animate={{
            x: isSubmitting ? ['-100%', '100%'] : '0%',
          }}
          transition={{
            duration: 0.8,
            repeat: isSubmitting ? Infinity : 0,
            ease: 'linear',
          }}
        />

        <motion.span
          className="relative z-10 flex items-center justify-center gap-3"
          animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
        >
          {isSubmitting && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              ⟳
            </motion.span>
          )}
          {isSubmitting ? 'UPLOADING_DATA...' : 'INITIALIZE UPLOAD'}
        </motion.span>

        <motion.div
          className="absolute inset-0 border-4 border-neon-green opacity-0"
          animate={
            isSubmitting
              ? {
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 0.8,
            repeat: isSubmitting ? Infinity : 0,
          }}
        />
      </motion.button>

      <div className="text-center mt-4 text-white/40 text-xs font-mono">
        SECURE_CONNECTION :: ENCRYPTED_TRANSMISSION :: NO_SPAM_PROTOCOL
      </div>
    </motion.form>
  );
}
