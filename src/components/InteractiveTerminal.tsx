import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandRegistry from '../utils/CommandRegistry';

interface TerminalLine {
    id: string;
    type: 'input' | 'output' | 'error';
    content: string;
    prompt?: string;
}

interface InteractiveTerminalProps {
    staticContent: React.ReactNode;
    allowInteractive?: boolean;
    isFocused?: boolean;
}

export default function InteractiveTerminal({
    staticContent,
    allowInteractive = true,
    isFocused = false
}: InteractiveTerminalProps) {
    const [isInteractive, setIsInteractive] = useState(false);
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    const commandRegistry = useRef(new CommandRegistry());
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto-scroll to bottom
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        // Ctrl+C listener - only works when this terminal is focused (hidden Easter egg!)
        const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'c' && e.ctrlKey && allowInteractive && !isInteractive && isFocused) {
                e.preventDefault();
                setIsInteractive(true);
                setLines([{
                    id: Date.now().toString(),
                    type: 'output',
                    content: '^C\n\nInteractive mode enabled.\nType "help" for available commands.'
                }]);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [allowInteractive, isInteractive, isFocused]);

    const handleCommand = (input: string) => {
        if (!input.trim()) return;

        const inputLine: TerminalLine = {
            id: Date.now().toString(),
            type: 'input',
            content: input,
            prompt: commandRegistry.current.getCurrentPath()
        };

        setLines(prev => [...prev, inputLine]);
        setIsProcessing(true);

        setTimeout(() => {
            const result = commandRegistry.current.executeCommand(input);

            if (result.text === 'CLEAR_SCREEN') {
                setLines([]);
            } else if (result.text) {
                const outputLine: TerminalLine = {
                    id: (Date.now() + 1).toString(),
                    type: result.type === 'error' ? 'error' : 'output',
                    content: result.text
                };
                setLines(prev => [...prev, outputLine]);
            }

            setIsProcessing(false);
            setCurrentInput('');
            setHistoryIndex(-1);
        }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const history = commandRegistry.current.getHistory();

        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setCurrentInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(history[history.length - 1 - newIndex]);
            } else {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        } else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            setLines(prev => [...prev, {
                id: Date.now().toString(),
                type: 'output',
                content: '^C'
            }]);
            setCurrentInput('');
            setIsProcessing(false);
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    // Show static content until interactive mode is enabled (no hint - hidden Easter egg!)
    if (!isInteractive) {
        return (
            <div className="h-full overflow-y-auto p-6">
                {staticContent}
            </div>
        );
    }

    // Interactive terminal mode
    return (
        <div className="flex flex-col h-full">
            {/* Terminal Output */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto overflow-x-hidden p-6 font-mono text-sm space-y-2"
                onClick={() => inputRef.current?.focus()}
            >
                <AnimatePresence initial={false}>
                    {lines.map((line) => (
                        <motion.div
                            key={line.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {line.type === 'input' ? (
                                <div className="flex items-start gap-2">
                                    <span className="text-neon-green shrink-0">$</span>
                                    <span className="text-white break-all">{line.content}</span>
                                </div>
                            ) : (
                                <div className={`whitespace-pre-wrap break-words ${line.type === 'error' ? 'text-strike-red' : 'text-white/80'
                                    }`}>
                                    {line.content}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Current Input Line */}
                {!isProcessing && (
                    <div className="flex items-start gap-2">
                        <span className="text-neon-green shrink-0">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-neon-green"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-4 bg-neon-green"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
