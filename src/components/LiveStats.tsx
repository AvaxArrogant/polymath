import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface Signup {
    id: string;
    email: string;
    timestamp: number;
    isReal?: boolean;
}

interface LiveStatsProps {
    onRegisterRef?: (callback: (email: string) => void) => void;
}

export default function LiveStats({ onRegisterRef }: LiveStatsProps) {
    const [activeUsers, setActiveUsers] = useState(1243);
    const [signups, setSignups] = useState<Signup[]>([]);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    // Generate a random realistic-looking email
    const generateFakeEmail = () => {
        const firstNames = ['james', 'john', 'robert', 'michael', 'william', 'david', 'richard', 'joseph', 'thomas', 'charles', 'mary', 'patricia', 'jennifer', 'linda', 'elizabeth', 'barbara', 'susan', 'jessica', 'sarah', 'karen'];
        const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'rodriguez', 'martinez'];
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const domain = domains[Math.floor(Math.random() * domains.length)];

        // 30% chance of having a number
        const number = Math.random() > 0.7 ? Math.floor(Math.random() * 99) : '';

        return `${firstName}${lastName}${number}@${domain}`;
    };

    const maskEmail = (email: string) => {
        const [user, domain] = email.split('@');
        if (user.length <= 4) {
            return `${user}***@${domain}`;
        }
        return `${user.slice(0, 3)}***${user.slice(-1)}@${domain}`;
    };

    const addSignup = useCallback((email: string, isReal: boolean = false) => {
        const newSignup: Signup = {
            id: Math.random().toString(36).substr(2, 9),
            email: maskEmail(email),
            timestamp: Date.now(),
            isReal,
        };

        setSignups((prev) => [newSignup, ...prev].slice(0, 8));

        if (isReal) {
            setActiveUsers((prev) => prev + 1);
        }
    }, []);

    // Register the callback for real signups
    useEffect(() => {
        if (onRegisterRef) {
            onRegisterRef((email) => addSignup(email, true));
        }
    }, [onRegisterRef, addSignup]);

    // Simulate active users fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUsers((prev) => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.max(1000, prev + change);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Simulate new fake signups
    useEffect(() => {
        const scheduleNextSignup = () => {
            const delay = Math.random() * 4000 + 1000; // 1-5 seconds
            return setTimeout(() => {
                addSignup(generateFakeEmail());
                timer = scheduleNextSignup();
            }, delay);
        };

        let timer = scheduleNextSignup();
        return () => clearTimeout(timer);
    }, [addSignup]);

    return (
        <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            className="w-full max-w-2xl mx-auto mt-12 font-mono text-sm relative z-50"
        >
            <div
                className={`bg-void-black/90 border border-white/20 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-300 flex flex-col ${isMinimized ? 'h-auto w-auto inline-block' : 'resize overflow-auto h-80 min-h-[200px] min-w-[300px]'}`}
                style={{
                    resize: isMinimized ? 'none' : 'both',
                    height: isMinimized ? 'auto' : undefined,
                    width: isMinimized ? 'auto' : undefined
                }}
            >
                {/* Terminal Header */}
                <div
                    onPointerDown={(e) => dragControls.start(e)}
                    className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing select-none shrink-0"
                >
                    <div className="flex gap-2 group">
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"
                        />
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors"
                        />
                        <button
                            onClick={() => setIsMinimized(false)}
                            className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors"
                        />
                    </div>
                    <div className="text-white/40 text-xs ml-4">polymath_network_monitor.exe</div>
                    <div className="w-16" /> {/* Spacer for centering */}
                </div>

                {/* Terminal Content */}
                <AnimatePresence>
                    {!isMinimized && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-4 space-y-4 flex-1 overflow-hidden flex flex-col"
                        >
                            {/* Stats Header */}
                            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4 shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-neon-green">➜</span>
                                    <span className="text-white/80">NETWORK_STATUS:</span>
                                    <span className="text-neon-green animate-pulse">ONLINE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white/60">ACTIVE_NODES:</span>
                                    <span className="text-neon-green font-bold">{activeUsers.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Feed */}
                            <div className="space-y-1 relative overflow-hidden flex-1" ref={scrollRef}>
                                <AnimatePresence initial={false}>
                                    {signups.map((signup) => (
                                        <motion.div
                                            key={signup.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`flex items-center gap-3 ${signup.isReal ? 'text-neon-green bg-neon-green/10 -mx-2 px-2 py-1 rounded' : 'text-white/60'
                                                }`}
                                        >
                                            <span className="text-white/40 text-xs shrink-0">[{new Date(signup.timestamp).toLocaleTimeString()}]</span>
                                            <span className="text-xs opacity-50 shrink-0">{signup.isReal ? '>>' : '>'}</span>
                                            <span className={`shrink-0 ${signup.isReal ? 'font-bold' : ''}`}>
                                                {signup.isReal ? 'NEW_USER_VERIFIED:' : 'USER_JOINED:'}
                                            </span>
                                            <span className="break-all">{signup.email}</span>
                                            {signup.isReal && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="ml-auto text-xs bg-neon-green text-black px-1 rounded shrink-0"
                                                >
                                                    YOU
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Blinking Cursor */}
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-neon-green">➜</span>
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-2 h-4 bg-neon-green inline-block"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
