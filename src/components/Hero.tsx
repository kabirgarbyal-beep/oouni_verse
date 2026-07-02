import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle subtle mouse movement parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Title letters for "stitching" animation
  const titleText = "Handmade Stories, One Stitch at a Time.";
  const words = titleText.split(" ");

  return (
    <div
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-gradient-to-b from-[#F7D8DE] via-[#FFF7F1] to-[#FFF7F1] overflow-hidden"
    >
      {/* Knitted Backdrop Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      {/* Floating Organic Blurs / Cozy Blobs */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-[#FFF7F1] opacity-60 blur-3xl"
        style={{
          top: '10%',
          left: '5%',
          x: mousePosition.x * 40,
          y: mousePosition.y * 40,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#DFA8B4]/30 opacity-40 blur-3xl"
        style={{
          bottom: '15%',
          right: '5%',
          x: mousePosition.x * -50,
          y: mousePosition.y * -50,
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          rotate: [180, 0, 180],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Yarn Fibers or Threads Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl select-none"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + (i * 15) % 80}%`,
              x: mousePosition.x * (i + 1) * -12,
              y: mousePosition.y * (i + 1) * -12,
            }}
            animate={{
              y: [-12, 12, -12],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['🧶', '🌸', '✨', '🪡', '🍃', '🧸'][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Continuously Animating SVG Thread running behind */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
        <motion.path
          d="M -50,200 C 150,150 200,450 450,300 C 700,150 900,450 1200,350 C 1500,250 1600,450 1800,400"
          fill="none"
          stroke="#9A5B2A"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          animate={{
            strokeDashoffset: [0, -40],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
        />
      </svg>

      {/* Grid Layout Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left: Text & Call-To-Action (Stitched Text Entrance) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Tagline pill */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFA8B4]/20 border border-[#DFA8B4]/40 text-[#70411B] text-xs font-semibold tracking-wider mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="w-3 h-3 text-[#9A5B2A] animate-pulse" />
            <span>Don't Yawn, Just Yarn</span>
          </motion.div>

          {/* Stitched Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#70411B] tracking-tight leading-[1.1] mb-6">
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block mr-3 overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: wordIdx * 0.08,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            className="font-sans text-base sm:text-lg text-[#70411B]/80 leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover handcrafted crochet creations made with love for every cozy moment. From adorable plushies to luxurious vintage shoulder bags.
          </motion.p>

          {/* Call to Actions with Elegant Hover */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-[#FFF7F1] font-sans font-semibold tracking-wide rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={onCustomClick}
              className="px-8 py-4 bg-white border-2 border-[#70411B]/15 hover:border-[#70411B] text-[#70411B] font-sans font-semibold tracking-wide rounded-xl hover:bg-[#F4E9E1]/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Custom Orders</span>
            </button>
          </motion.div>
        </div>

        {/* Right: Premium Floating Showcase with Mouse Parallax & Live Needles */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[550px] flex items-center justify-center">
          
          {/* Animated Spinning Needles behind the showcase */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
            <motion.div
              className="w-1.5 h-72 bg-[#70411B]/20 rounded-full origin-bottom"
              style={{ rotate: -35 }}
              animate={{ rotate: [-30, -40, -30] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <motion.div
              className="w-1.5 h-72 bg-[#70411B]/15 rounded-full origin-bottom"
              style={{ rotate: 35 }}
              animate={{ rotate: [40, 30, 40] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Core Floating Showcase Showcase Items */}
          
          {/* Main Hero Card (Large Crochet Bag) */}
          <motion.div
            className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white z-20"
            style={{
              x: mousePosition.x * 25,
              y: mousePosition.y * 25,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
          >
            <img
              src="/src/assets/images/crochet_bags_hero_1783006461148.jpg"
              alt="Handcrafted Bag"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-4 text-white">
              <span className="font-serif italic text-sm text-pink-100">Classic Collection</span>
              <p className="font-sans font-bold text-sm tracking-wide">Muguet Floral Bag</p>
            </div>
          </motion.div>

          {/* Secondary Floating Card (Plushies) */}
          <motion.div
            className="absolute w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFF7F1] bg-white z-30 top-4 right-2 sm:right-6"
            style={{
              x: mousePosition.x * -40,
              y: mousePosition.y * -40,
            }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, type: "spring" }}
          >
            <img
              src="/src/assets/images/crochet_plushies_1783006474452.jpg"
              alt="Cutest Plushies"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Tertiary Floating Card (Bouquet) */}
          <motion.div
            className="absolute w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden shadow-lg border-4 border-[#FFF7F1] bg-white z-10 bottom-6 left-2 sm:left-6"
            style={{
              x: mousePosition.x * 45,
              y: mousePosition.y * -25,
            }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
          >
            <img
              src="/src/assets/images/crochet_flowers_1783006487670.jpg"
              alt="Eternal Bouquet"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Sparkly Floating Sticker (Coasters) */}
          <motion.div
            className="absolute w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden shadow-md border-4 border-[#FFF7F1] bg-white z-30 bottom-12 right-12 flex items-center justify-center p-0.5"
            style={{
              x: mousePosition.x * -15,
              y: mousePosition.y * 35,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
          >
            <img
              src="/src/assets/images/crochet_coasters_1783006500338.jpg"
              alt="Aesthetic Coasters"
              className="w-full h-full object-cover rounded-full select-none"
              referrerPolicy="no-referrer"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
