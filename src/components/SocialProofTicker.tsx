import { motion } from 'framer-motion';

const companies = [
  { name: 'GOOGLE', status: 'ACTIVE', signal: 'STRONG' },
  { name: 'TESLA', status: 'ACTIVE', signal: 'STRONG' },
  { name: 'OPENAI', status: 'ACTIVE', signal: 'OPTIMAL' },
  { name: 'SPACEX', status: 'ACTIVE', signal: 'STRONG' },
  { name: 'META', status: 'ACTIVE', signal: 'STRONG' },
  { name: 'NVIDIA', status: 'ACTIVE', signal: 'OPTIMAL' },
  { name: 'ANTHROPIC', status: 'ACTIVE', signal: 'STRONG' },
  { name: 'APPLE', status: 'ACTIVE', signal: 'STRONG' },
];

const duplicatedCompanies = [...companies, ...companies, ...companies];

export default function SocialProofTicker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-void-black/95 backdrop-blur-md border-t-2 border-neon-green/50 pt-8 pb-4 overflow-hidden z-50">
      <div className="absolute top-2 left-4 flex items-center gap-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-red-500"
          animate={{
            opacity: [1, 0.3, 1],
            boxShadow: [
              '0 0 8px rgba(239, 68, 68, 0.8)',
              '0 0 4px rgba(239, 68, 68, 0.4)',
              '0 0 8px rgba(239, 68, 68, 0.8)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-[10px] font-mono text-white/40 tracking-widest">
          LIVE_FEED :: TALENT_ACQUISITION_NETWORK
        </span>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -duplicatedCompanies.length * 300 / 3],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-2 rounded-full border border-neon-green/30 bg-neon-green/5 min-w-[280px]"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-neon-green"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span className="text-white font-mono font-bold text-sm">{company.name}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-neon-green/70">HIRING_PROTOCOL:</span>
                <span className="text-neon-green font-semibold">{company.status}</span>
              </div>

              <div className="ml-auto flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-neon-green rounded-full"
                      style={{
                        height: `${(i + 1) * 3}px`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <span className="text-neon-green/70 text-[10px] ml-1">{company.signal}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
