import { ReactNode } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

interface TerminalWindowProps {
    id: string;
    title?: string;
    children: ReactNode;
    className?: string;
    initialPosition?: { x: number; y: number };
    onMinimize?: (id: string) => void;
    onClose?: (id: string) => void;
    onMaximize?: (id: string) => void;
    onFocus?: (id: string) => void;
    isMaximized?: boolean;
    isMinimized?: boolean;
    zIndex?: number;
    maxZIndex?: number;
}

export default function TerminalWindow({
    id,
    title = 'terminal',
    children,
    className = '',
    initialPosition = { x: 0, y: 0 },
    onMinimize,
    onClose,
    onMaximize,
    onFocus,
    isMaximized = false,
    isMinimized = false,
    zIndex = 1,
    maxZIndex = 1
}: TerminalWindowProps) {
    const dragControls = useDragControls();
    const isFocused = zIndex === maxZIndex;

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMinimize?.(id);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose?.(id);
    };

    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMaximize?.(id);
    };

    const handleFocus = () => {
        onFocus?.(id);
    };

    return (
        <motion.div
            drag={!isMaximized && !isMinimized}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            initial={{ opacity: 0, y: 20, ...initialPosition }}
            animate={{
                opacity: 1,
                y: 0,
                scale: isMaximized ? 1 : 1,
                x: isMaximized ? 0 : undefined,
                width: isMaximized ? '100vw' : undefined,
                height: isMaximized ? '100vh' : isMinimized ? 'auto' : undefined,
            }}
            transition={{ duration: 0.3 }}
            className={`bg-void-black/95 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm transition-all ${className} ${isFocused
                ? 'border-2 border-neon-green/50'
                : 'border border-white/20'
                }`}
            style={{
                position: isMaximized ? 'fixed' : 'relative',
                top: isMaximized ? 0 : undefined,
                left: isMaximized ? 0 : undefined,
                zIndex,
                boxShadow: isFocused
                    ? '0 0 30px rgba(57, 255, 20, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)'
                    : undefined
            }}
            onClick={handleFocus}
        >
            {/* Terminal Header */}
            <div
                onPointerDown={(e) => !isMaximized && !isMinimized && dragControls.start(e)}
                className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between select-none cursor-grab active:cursor-grabbing"
            >
                <div className="flex gap-2">
                    <button
                        onClick={handleClose}
                        className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors cursor-pointer"
                        title="Close"
                    />
                    <button
                        onClick={handleMinimize}
                        className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors cursor-pointer"
                        title="Minimize"
                    />
                    <button
                        onClick={handleMaximize}
                        className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors cursor-pointer"
                        title={isMaximized ? 'Restore' : 'Maximize'}
                    />
                </div>
                <div className="text-white/40 text-xs font-mono">{title}</div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Terminal Content - Hidden when minimized */}
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-sm overflow-hidden"
                    >
                        <div className="h-full">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
