import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use springs for ultra-smooth natural physics mouse movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 1 });
  const trailY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive-card')
      ) {
        setHovered('button');
      } else if (target.closest('.plushie-zone')) {
        setHovered('plushie');
      } else {
        setHovered(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Thread trail stretching from the mouse */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1={cursorX}
          y1={cursorY}
          x2={trailX}
          y2={trailY}
          stroke="#9A5B2A"
          strokeWidth={hovered ? "2.5" : "1.5"}
          strokeDasharray="4 4"
          className="opacity-50"
        />
      </svg>

      {/* Main Yarn Ball Cursor */}
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-[#DFA8B4] border border-[#70411B]/20 flex items-center justify-center shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered === 'button' ? 1.6 : hovered === 'plushie' ? 2.2 : 1,
          rotate: hovered ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Yarn strand lines inside cursor */}
        <div className="absolute inset-0.5 border border-dashed border-[#70411B]/25 rounded-full animate-spin-slow"></div>
        {hovered === 'plushie' && (
          <span className="text-[7px] font-bold text-[#70411B] mt-0.5 animate-pulse">👀</span>
        )}
      </motion.div>

      {/* Lagging Yarn tail center anchor */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#9A5B2A]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
