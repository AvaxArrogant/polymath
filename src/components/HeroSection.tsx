import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import GlitchText from './GlitchText';

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <TerminalWindow title="POLYMATH_OS.exe" className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* System Header */}
            <div className="flex items-center justify-between text-xs text-white/60 pb-4 border-b border-white/10">
              <div>$ POLYMATH_OS v2.0.1</div>
              <div className="flex gap-4">
                <span className="text-neon-green">ACTIVE_USERS: 1,247</span>
                <span className="text-strike-red animate-pulse">SPOTS_LEFT: 23</span>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-neon-green">$</span>
                <span>run program: REPLACE_UNIVERSITY.exe</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-neon-green">{'>'}</span>
                <span>Initializing neural pathways...</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="py-8">
              <div className="text-4xl md:text-6xl font-bold leading-tight">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-white relative inline-block">
                    A{' '}
                    <motion.span
                      className="relative inline-block text-white/40"
                      initial={{ textDecorationColor: 'rgba(255, 0, 51, 0)' }}
                      animate={{ textDecorationColor: 'rgba(255, 0, 51, 1)' }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                      style={{
                        textDecoration: 'line-through',
                        textDecorationThickness: '4px',
                        textDecorationColor: '#FF0033',
                        textShadow: '0 0 10px #FF0033',
                      }}
                    >
                      4-YEAR DEGREE
                    </motion.span>
                  </span>
                </div>
                <div className="text-white mt-2">
                  IN <GlitchText className="text-neon-green" intensity="medium">4 MONTHS</GlitchText>
                </div>
              </div>

              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl"
              >
                <div className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">{'>'}</span>
                  <div>
                    Universities are dead men walking. Our AI builds a curriculum specifically for your brain type.{' '}
                    <span className="text-neon-green font-semibold">Don't pay for tuition;</span>{' '}
                    <span className="text-neon-green font-semibold">pay for the job offer.</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-white/90 font-mono text-sm">Adaptive Learning</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-white/90 font-mono text-sm">AI-Optimized</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-white/90 font-mono text-sm">Job Guaranteed</span>
              </div>
            </motion.div>

            {/* CTA Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-white/60 mb-4">
                <span className="text-neon-green">$</span>
                <span className="text-sm">Ready to initialize uplink?</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-green">{'>'}</span>
                <button
                  onClick={() => {
                    document.getElementById('signup-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-neon-green text-void-black font-bold rounded hover:bg-neon-green/90 transition-all hover:shadow-lg hover:shadow-neon-green/50 font-mono"
                >
                  [INITIALIZE_UPLINK]
                </button>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="flex justify-center mt-8 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => document.getElementById('signup-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-white/60 font-mono">SCROLL_DOWN</span>
                  <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
