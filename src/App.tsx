import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalWindow from './components/TerminalWindow';
import BootSequence from './components/BootSequence';
import InteractiveTerminal from './components/InteractiveTerminal';
import NeuralNetworkBackground from './components/NeuralNetworkBackground';
import NeuralPortInput from './components/NeuralPortInput';
import SocialProofTicker from './components/SocialProofTicker';
import CustomCursor from './components/CustomCursor';

interface WindowState {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosed: boolean;
  zIndex: number;
}

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'hero', title: 'POLYMATH_OS.exe', isMinimized: false, isMaximized: false, isClosed: false, zIndex: 1 },
    { id: 'features', title: 'FEATURES.txt', isMinimized: false, isMaximized: false, isClosed: false, zIndex: 2 },
    { id: 'stats', title: 'STATS.log', isMinimized: false, isMaximized: false, isClosed: false, zIndex: 3 },
    { id: 'signup', title: 'SIGNUP.exe', isMinimized: false, isMaximized: false, isClosed: false, zIndex: 4 },
  ]);
  const [maxZIndex, setMaxZIndex] = useState(4);
  const handleSignupRef = useRef<((email: string) => void) | null>(null);

  const handleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const handleClose = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isClosed: true } : w));
  };

  const handleMaximize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const handleFocus = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
  };

  const handleRestore = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w));
  };

  const getWindowState = (id: string) => windows.find(w => w.id === id);

  return (
    <>
      <AnimatePresence>
        {showBoot && (
          <BootSequence onComplete={() => setShowBoot(false)} />
        )}
      </AnimatePresence>

      {!showBoot && (
        <div className="min-h-screen bg-void-black text-white grain relative overflow-hidden">
          <CustomCursor />
          <NeuralNetworkBackground isSubmitting={isSubmitting} />

          {/* Gradient Vignette Overlay */}
          <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-radial from-transparent via-void-black/20 to-void-black/80" />

          <main className="relative z-10 h-screen overflow-hidden p-4">

            {/* Hero Terminal - Top Left */}
            {!getWindowState('hero')?.isClosed && !getWindowState('hero')?.isMinimized && (
              <div className="absolute top-4 left-4 w-[45%] h-[45%]">
                <TerminalWindow
                  id="hero"
                  title={getWindowState('hero')?.title || 'POLYMATH_OS.exe'}
                  onMinimize={handleMinimize}
                  onClose={handleClose}
                  onMaximize={handleMaximize}
                  onFocus={handleFocus}
                  isMaximized={getWindowState('hero')?.isMaximized}
                  zIndex={getWindowState('hero')?.zIndex}
                  maxZIndex={maxZIndex}
                  className="h-full"
                >
                  <InteractiveTerminal
                    isFocused={getWindowState('hero')?.zIndex === maxZIndex}
                    staticContent={
                      <div className="space-y-4">
                        {/* System Header */}
                        <div className="flex items-center justify-between text-xs text-white/60 pb-3 border-b border-white/10">
                          <div>$ POLYMATH_OS v2.0.1</div>
                          <div className="flex gap-3">
                            <span className="text-neon-green">WAITLIST: 847</span>
                            <span className="text-strike-red animate-pulse">BETA SPOTS: 50</span>
                          </div>
                        </div>

                        {/* Main Headline */}
                        <div>
                          <div className="text-2xl md:text-3xl font-bold leading-tight">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-white">A{' '}</span>
                              <motion.span
                                className="text-white/40"
                                initial={{ textDecorationColor: 'rgba(255, 0, 51, 0)' }}
                                animate={{ textDecorationColor: 'rgba(255, 0, 51, 1)' }}
                                transition={{ delay: 1, duration: 0.6 }}
                                style={{
                                  textDecoration: 'line-through',
                                  textDecorationThickness: '3px',
                                }}
                              >
                                4-YEAR DEGREE
                              </motion.span>
                            </div>
                            <div className="text-white mt-1">
                              IN <span className="text-neon-green">4 MONTHS</span>
                            </div>
                          </div>

                          <div className="mt-4 text-sm text-white/70">
                            <span className="text-neon-green">{'>'}</span> Don't pay for tuition; pay for the job offer.
                          </div>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => {
                            const signupWindow = document.getElementById('signup-window');
                            signupWindow?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="w-full px-6 py-2 bg-neon-green text-void-black font-bold rounded hover:bg-neon-green/90 transition-all text-sm"
                        >
                          [INITIALIZE_UPLINK]
                        </button>
                      </div>
                    }
                  />
                </TerminalWindow>
              </div>
            )}

            {/* Features Terminal - Top Right */}
            {!getWindowState('features')?.isClosed && !getWindowState('features')?.isMinimized && (
              <div className="absolute top-4 right-4 w-[50%] h-[45%]">
                <TerminalWindow
                  id="features"
                  title={getWindowState('features')?.title || 'FEATURES.txt'}
                  onMinimize={handleMinimize}
                  onClose={handleClose}
                  onMaximize={handleMaximize}
                  onFocus={handleFocus}
                  isMaximized={getWindowState('features')?.isMaximized}
                  zIndex={getWindowState('features')?.zIndex}
                  maxZIndex={maxZIndex}
                  className="h-full"
                >
                  <InteractiveTerminal
                    isFocused={getWindowState('features')?.zIndex === maxZIndex}
                    staticContent={
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-white/60 pb-2 border-b border-white/10">
                          <span className="text-neon-green">$</span>
                          <span>cat features.txt</span>
                        </div>

                        {[
                          { title: 'AI_CURRICULUM', desc: 'Adapts to your brain' },
                          { title: 'JOB_GUARANTEE', desc: '100% refund policy' },
                          { title: 'LIVE_MENTORS', desc: '24/7 expert access' },
                          { title: 'PORTFOLIO', desc: '5 production projects' }
                        ].map((feature, index) => (
                          <div key={index} className="text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-neon-green">[✓]</span>
                              <span className="text-white font-bold">{feature.title}</span>
                            </div>
                            <div className="ml-5 text-white/60">└─ {feature.desc}</div>
                          </div>
                        ))}
                      </div>
                    }
                  />
                </TerminalWindow>
              </div>
            )}

            {/* Stats Terminal - Bottom Left */}
            {!getWindowState('stats')?.isClosed && !getWindowState('stats')?.isMinimized && (
              <div className="absolute bottom-4 left-4 w-[45%] h-[45%]">
                <TerminalWindow
                  id="stats"
                  title={getWindowState('stats')?.title || 'STATS.log'}
                  onMinimize={handleMinimize}
                  onClose={handleClose}
                  onMaximize={handleMaximize}
                  onFocus={handleFocus}
                  isMaximized={getWindowState('stats')?.isMaximized}
                  zIndex={getWindowState('stats')?.zIndex}
                  maxZIndex={maxZIndex}
                  className="h-full"
                >
                  <InteractiveTerminal
                    isFocused={getWindowState('stats')?.zIndex === maxZIndex}
                    staticContent={
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-white/60 pb-2 border-b border-white/10">
                          <span className="text-neon-green">$</span>
                          <span>tail -f stats.log</span>
                        </div>

                        <div className="text-xs space-y-2 text-white/70">
                          <div className="flex justify-between">
                            <span>Waitlist Signups:</span>
                            <span className="text-neon-green font-bold">847</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Beta Testers:</span>
                            <span className="text-neon-green font-bold">50</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Early Access:</span>
                            <span className="text-neon-green font-bold">Active</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Launch Status:</span>
                            <span className="text-neon-green font-bold">Q1 2026</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest Score:</span>
                            <span className="text-neon-green font-bold">4.8/5.0</span>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </TerminalWindow>
              </div>
            )}

            {/* Signup Terminal - Bottom Right */}
            {!getWindowState('signup')?.isClosed && !getWindowState('signup')?.isMinimized && (
              <div id="signup-window" className="absolute bottom-4 right-4 w-[50%] h-[45%]">
                <TerminalWindow
                  id="signup"
                  title={getWindowState('signup')?.title || 'SIGNUP.exe'}
                  onMinimize={handleMinimize}
                  onClose={handleClose}
                  onMaximize={handleMaximize}
                  onFocus={handleFocus}
                  isMaximized={getWindowState('signup')?.isMaximized}
                  zIndex={getWindowState('signup')?.zIndex}
                  className="h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-2 text-xs text-white/60 pb-2 border-b border-white/10">
                        <span className="text-neon-green">$</span>
                        <span>sudo access_early_beta</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Join the <span className="text-neon-green">Neural Revolution</span>
                        </h3>
                        <p className="text-xs text-white/60 mb-3">
                          Limited spots. Secure your position now.
                        </p>
                      </div>

                      <NeuralPortInput
                        onSubmitStart={() => setIsSubmitting(true)}
                        onSubmitComplete={() => setIsSubmitting(false)}
                        onSignupSuccess={(email) => handleSignupRef.current?.(email)}
                      />

                      {/* Mini Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                        {[
                          { value: '847', label: 'Waitlist' },
                          { value: '50', label: 'Beta Spots' },
                          { value: 'Q1 26', label: 'Launch' }
                        ].map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-lg font-bold text-neon-green">{stat.value}</div>
                            <div className="text-[10px] text-white/50">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            )}

            {/* Taskbar for minimized windows */}
            {windows.some(w => w.isMinimized) && (
              <div className="fixed bottom-0 left-0 right-0 bg-void-black/90 border-t border-white/20 p-2 flex gap-2 z-50">
                {windows.filter(w => w.isMinimized).map(window => (
                  <button
                    key={window.id}
                    onClick={() => handleRestore(window.id)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-mono text-white/80 transition-colors"
                  >
                    {window.title}
                  </button>
                ))}
              </div>
            )}

          </main>

          <SocialProofTicker />
        </div>
      )}
    </>
  );
}

export default App;
