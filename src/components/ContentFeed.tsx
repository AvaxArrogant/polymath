import { motion } from 'framer-motion';

const contentItems = [
  {
    type: 'code',
    content: `function neuralLearn(data) {\n  return AI.optimize(data);\n}`,
    language: 'javascript',
  },
  {
    type: 'formula',
    content: 'E = mc²',
    label: 'Relativity',
  },
  {
    type: 'diagram',
    content: '🧠',
    label: 'Neural Architecture',
  },
  {
    type: 'code',
    content: `class Polymath {\n  adapt() { return this.evolve(); }\n}`,
    language: 'typescript',
  },
  {
    type: 'formula',
    content: '∫f(x)dx = F(x) + C',
    label: 'Calculus',
  },
  {
    type: 'stat',
    content: '4 MONTHS',
    label: 'Average Completion',
  },
  {
    type: 'code',
    content: `SELECT * FROM knowledge\nWHERE relevant = true;`,
    language: 'sql',
  },
  {
    type: 'formula',
    content: 'Δx · Δp ≥ ℏ/2',
    label: 'Uncertainty Principle',
  },
];

const duplicatedContent = [...contentItems, ...contentItems];

export default function ContentFeed() {
  return (
    <div className="relative w-full max-w-[280px] h-[500px] mx-auto perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-transparent to-void-black z-10 pointer-events-none" />

      <div className="relative h-full overflow-hidden rounded-3xl border border-electric-indigo/30 backdrop-blur-md bg-void-black/40 shadow-2xl shadow-electric-indigo/20">
        <motion.div
          className="absolute inset-0 flex flex-col gap-4 p-4"
          animate={{
            y: [0, -duplicatedContent.length * 130 / 2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedContent.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-[110px] rounded-xl p-4 backdrop-blur-sm border flex flex-col justify-center relative overflow-hidden"
              style={{
                backgroundColor: item.type === 'code' ? 'rgba(57, 255, 20, 0.05)' : 'rgba(111, 0, 255, 0.05)',
                borderColor: item.type === 'code' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(111, 0, 255, 0.3)',
              }}
            >
              <div className="absolute top-2 right-2 text-[10px] font-mono text-neon-green/50 uppercase tracking-wider">
                {item.type}
              </div>

              {item.type === 'code' && (
                <pre className="text-xs font-mono text-white overflow-hidden">
                  <code>{item.content}</code>
                </pre>
              )}

              {item.type === 'formula' && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green mb-1">{item.content}</div>
                  <div className="text-xs text-white/60">{item.label}</div>
                </div>
              )}

              {item.type === 'diagram' && (
                <div className="text-center">
                  <div className="text-5xl mb-2">{item.content}</div>
                  <div className="text-xs text-white/60">{item.label}</div>
                </div>
              )}

              {item.type === 'stat' && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric-indigo mb-1">{item.content}</div>
                  <div className="text-xs text-white/60">{item.label}</div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-void-black/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" style={{
        boxShadow: 'inset 0 0 60px rgba(111, 0, 255, 0.3)',
      }} />
    </div>
  );
}
