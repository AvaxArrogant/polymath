import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

const bootMessages = [
    { text: 'POLYMATH_OS v2.0.1 INITIALIZING...', delay: 0 },
    { text: 'Loading neural pathways...', delay: 500, progress: true },
    { text: 'Connecting to AI matrix...', delay: 1500, progress: true },
    { text: 'Optimizing learning algorithms...', delay: 2500, progress: true },
    { text: 'System ready.', delay: 3500 },
    { text: 'Launching interface...', delay: 4000 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentStep < bootMessages.length) {
            const message = bootMessages[currentStep];
            const timeout = setTimeout(() => {
                setCurrentStep(currentStep + 1);

                if (message.progress) {
                    let prog = 0;
                    const interval = setInterval(() => {
                        prog += 10;
                        setProgress(prog);
                        if (prog >= 100) {
                            clearInterval(interval);
                            setProgress(0);
                        }
                    }, 80);
                }
            }, message.delay);

            return () => clearTimeout(timeout);
        } else {
            const finalTimeout = setTimeout(() => {
                onComplete();
            }, 500);
            return () => clearTimeout(finalTimeout);
        }
    }, [currentStep, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-void-black flex items-center justify-center"
        >
            <div className="w-full max-w-2xl px-4">
                <div className="bg-void-black/95 border border-neon-green/30 rounded-lg p-8 font-mono">
                    <AnimatePresence mode="wait">
                        {bootMessages.slice(0, currentStep + 1).map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-3"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-neon-green">{'>'}</span>
                                    <span className="text-white/90">{message.text}</span>
                                </div>
                                {message.progress && index === currentStep && (
                                    <div className="ml-4 mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-neon-green"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.1 }}
                                            />
                                        </div>
                                        <span className="text-neon-green text-xs">{progress}%</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="mt-4 flex items-center gap-2"
                    >
                        <span className="text-neon-green">$</span>
                        <span className="w-2 h-4 bg-neon-green" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
