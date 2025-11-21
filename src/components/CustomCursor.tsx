import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null;

      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 500,
          mass: 0.5,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle
            cx="10"
            cy="10"
            r="2"
            fill={isPointer ? '#39FF14' : '#FFFFFF'}
            className="transition-all duration-200"
          />
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="6"
            stroke={isPointer ? '#39FF14' : '#FFFFFF'}
            strokeWidth="1"
            className="transition-all duration-200"
          />
          <line
            x1="10"
            y1="14"
            x2="10"
            y2="20"
            stroke={isPointer ? '#39FF14' : '#FFFFFF'}
            strokeWidth="1"
            className="transition-all duration-200"
          />
          <line
            x1="0"
            y1="10"
            x2="6"
            y2="10"
            stroke={isPointer ? '#39FF14' : '#FFFFFF'}
            strokeWidth="1"
            className="transition-all duration-200"
          />
          <line
            x1="14"
            y1="10"
            x2="20"
            y2="10"
            stroke={isPointer ? '#39FF14' : '#FFFFFF'}
            strokeWidth="1"
            className="transition-all duration-200"
          />
        </svg>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        <div
          className="w-10 h-10 rounded-full border transition-all duration-200"
          style={{
            borderColor: isPointer ? '#39FF14' : 'rgba(255, 255, 255, 0.3)',
            borderWidth: '1px',
          }}
        />
      </motion.div>
    </>
  );
}
