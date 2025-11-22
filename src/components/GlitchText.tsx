import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlitchTextProps {
    children: ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export default function GlitchText({ children, className = '', intensity = 'medium' }: GlitchTextProps) {
    const glitchVariants = {
        low: {
            x: [-1, 1, -1, 0],
            textShadow: [
                '1px 0 0 #FF0033, -1px 0 0 #39FF14',
                '-1px 0 0 #FF0033, 1px 0 0 #39FF14',
                '0 0 0 transparent'
            ]
        },
        medium: {
            x: [-2, 2, -2, 0],
            textShadow: [
                '2px 0 0 #FF0033, -2px 0 0 #39FF14',
                '-2px 0 0 #FF0033, 2px 0 0 #39FF14',
                '2px 0 0 #39FF14, -2px 0 0 #FF0033',
                '0 0 0 transparent'
            ]
        },
        high: {
            x: [-3, 3, -3, 3, 0],
            y: [-1, 1, -1, 0],
            textShadow: [
                '3px 0 0 #FF0033, -3px 0 0 #39FF14',
                '-3px 0 0 #FF0033, 3px 0 0 #39FF14',
                '3px 0 0 #39FF14, -3px 0 0 #FF0033',
                '-3px 0 0 #39FF14, 3px 0 0 #FF0033',
                '0 0 0 transparent'
            ]
        }
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            whileHover={{
                ...glitchVariants[intensity],
                transition: {
                    duration: 0.3,
                    times: intensity === 'high' ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [0, 0.33, 0.66, 1]
                }
            }}
        >
            {children}
        </motion.span>
    );
}
