import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800); // give time for completion animation
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  // SVG drawing animation for the logo outline
  const logoPath = "M 20 60 C 40 40, 60 40, 80 60 C 100 80, 120 80, 140 60 C 160 40, 180 40, 200 60";

  return (
    <motion.div
      id="preloader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF7F1] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Background Soft Knitted Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Needle and Rolling Yarn Ball */}
        <div className="relative w-72 h-44 flex items-center justify-center mb-6">
          {/* Crochet Needle 1 */}
          <motion.div
            className="absolute w-40 h-2 bg-amber-800 rounded-full origin-right"
            style={{ x: -60, y: -10 }}
            animate={{
              rotate: [15, -15, 15],
              y: [-12, -8, -12],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />
          {/* Crochet Needle 2 */}
          <motion.div
            className="absolute w-40 h-2 bg-amber-700 rounded-full origin-right"
            style={{ x: -40, y: 15, rotate: 45 }}
            animate={{
              rotate: [30, 60, 30],
              y: [12, 18, 12],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />

          {/* Rolling Yarn Ball */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-[#DFA8B4] flex items-center justify-center shadow-md border-2 border-[#70411B]/10 overflow-hidden"
            animate={{
              x: [-120, 120, -120],
              rotate: [-360, 360, -360],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            {/* Yarn Strands Visual Details */}
            <div className="absolute inset-0 opacity-40 border-4 border-dashed border-[#70411B]/30 rounded-full scale-90"></div>
            <div className="absolute inset-0 opacity-30 border-4 border-double border-[#FFF7F1] rounded-full scale-75 rotate-45"></div>
            <div className="absolute w-3 h-3 bg-[#FFF7F1] rounded-full"></div>
          </motion.div>

          {/* Curly Thread leaving behind */}
          <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 240 120">
            {/* Draw Thread path */}
            <motion.path
              d={logoPath}
              fill="none"
              stroke="#9A5B2A"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="300"
              initial={{ strokeDashoffset: 300 }}
              animate={{ strokeDashoffset: [300, 0, 300] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>

        {/* Brand Typography Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl tracking-wide text-[#70411B] flex items-center justify-center gap-1.5 font-semibold">
            <span>🧶</span> ऊनीverse
          </h1>
          <p className="font-sans text-xs tracking-widest text-[#9A5B2A] uppercase mt-2 select-none">
            "Don't Yawn, Just Yarn"
          </p>
        </motion.div>

        {/* Progress Bar with Soft Organic Styling */}
        <div className="w-56 h-1 bg-[#F4E9E1] rounded-full mt-8 overflow-hidden relative border border-[#70411B]/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#DFA8B4] to-[#9A5B2A] rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <span className="font-serif italic text-[#70411B]/60 text-sm mt-3 font-medium">
          Spinning cozy fibers... {percent}%
        </span>
      </div>
    </motion.div>
  );
}
