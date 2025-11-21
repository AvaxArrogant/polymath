import { motion } from 'framer-motion';
import ContentFeed from './ContentFeed';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white relative inline-block">
                  A{' '}
                  <span className="relative">
                    <span className="text-white/40">4-YEAR DEGREE</span>
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    >
                      <span
                        className="w-full h-1 bg-strike-red"
                        style={{
                          boxShadow: '0 0 10px #FF0033, 0 0 20px #FF0033',
                        }}
                      />
                    </motion.span>
                  </span>
                </span>
                <br />
                <span className="text-white">IN </span>
                <motion.span
                  className="text-neon-green animate-pulse-glow"
                  style={{
                    textShadow: '0 0 20px #39FF14, 0 0 40px #39FF14',
                  }}
                >
                  4 MONTHS
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Universities are dead men walking. Our AI builds a curriculum specifically for your brain type.{' '}
                <span className="text-neon-green font-semibold">Don't pay for tuition;</span>{' '}
                <span className="text-electric-indigo font-semibold">pay for the job offer.</span>
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-white/90 font-mono">Adaptive Learning</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-electric-indigo/30 bg-electric-indigo/5">
                <div className="w-2 h-2 rounded-full bg-electric-indigo animate-pulse" />
                <span className="text-white/90 font-mono">AI-Optimized</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neon-green/30 bg-neon-green/5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-white/90 font-mono">Job Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ContentFeed />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
