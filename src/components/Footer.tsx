import { Mail, ArrowRight, Instagram, Phone, MapPin, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#F4E9E1] border-t border-[#70411B]/15 pt-20 pb-12 relative overflow-hidden" id="footer-section">
      {/* Background Stitches */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      {/* Continuously looping thread across the footer that ends as a rotating yarn ball */}
      <div className="absolute top-0 left-0 right-0 h-4 flex items-center justify-between pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 16" preserveAspectRatio="none">
          <motion.path
            d="M 0,8 Q 150,0 300,8 T 600,8 T 900,8 T 1200,8"
            fill="none"
            stroke="#9A5B2A"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Col 1: Brand & Instagram Hook (Span 4) */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl animate-spin-slow">🧶</span>
            <span className="font-serif text-2xl font-bold tracking-wide text-[#70411B]">
              ऊनीverse
            </span>
          </div>
          <p className="text-xs text-[#70411B]/85 leading-relaxed max-w-sm mb-6">
            Handcrafting premium cozy crochet plushies, accessories, home decor accents, and vintage shoulder bags with unbleached organic Coimbatore cotton and premium Himalayan merino wool blends. "Don't Yawn, Just Yarn."
          </p>

          {/* Social icons row */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/oouni_verse/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white text-[#70411B] hover:bg-[#DFA8B4] hover:text-white transition-all shadow-sm"
              title="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white text-[#70411B] hover:bg-[#A9C1A5] hover:text-white transition-all shadow-sm"
              title="WhatsApp Chat"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Quick links (Span 3) */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <h4 className="font-serif text-sm font-bold text-[#70411B] uppercase tracking-widest mb-5">
            Loom Navigation
          </h4>
          <div className="flex flex-col gap-3.5 text-xs text-[#70411B]/80 font-medium">
            <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              🏡 Cozy Home
            </button>
            <button onClick={() => setActiveView('shop')} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              🛍️ Shop Catalog
            </button>
            <button onClick={() => setActiveView('custom')} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              🎨 Custom Orders
            </button>
            <button onClick={() => setActiveView('gallery')} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              📱 Pinterest Gallery
            </button>
            <button onClick={() => setActiveView('about')} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              📖 Our Story
            </button>
            <button onClick={() => setActiveView('contact')} className="hover:text-[#9A5B2A] text-left cursor-pointer transition-colors">
              📞 Contact Us
            </button>
          </div>
        </div>

        {/* Col 3: Studio Contact Info (Span 2) */}
        <div className="md:col-span-2 flex flex-col items-start text-left">
          <h4 className="font-serif text-sm font-bold text-[#70411B] uppercase tracking-widest mb-5">
            The Studio
          </h4>
          <div className="flex flex-col gap-4 text-xs text-[#70411B]/80 font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#DFA8B4] shrink-0 mt-0.5" />
              <span>Haldwani, Uttarakhand, India (DM @oouni_verse)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#DFA8B4] shrink-0" />
              <span>hello@oouniverse.in</span>
            </div>
          </div>
        </div>

        {/* Col 4: Elegant Newsletter signup (Span 3) */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <h4 className="font-serif text-sm font-bold text-[#70411B] uppercase tracking-widest mb-4">
            Join the Club
          </h4>
          <p className="text-[11px] text-[#70411B]/75 leading-relaxed mb-4">
            Receive exclusive early access to restocks, limited pattern drops, and vintage design stories. No spam, only cozy.
          </p>

          <form onSubmit={handleSubscribe} className="relative w-full flex items-center">
            <input
              type="email"
              required
              placeholder="Your warm email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-[#70411B]/15 focus:border-[#70411B] outline-none rounded-xl px-4 py-3 text-xs text-[#70411B] pr-12 font-medium"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-[#70411B] hover:bg-[#9A5B2A] text-white rounded-lg transition-colors cursor-pointer"
              title="Subscribe"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-[10px] font-semibold text-[#70411B] bg-white border border-[#A9C1A5] p-2 rounded-lg flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A9C1A5]" />
                <span>Subscribed! Check your inbox for cozy warmth.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative Rotating Yarn Ball at the footer bottom */}
      <div className="absolute bottom-6 right-8 opacity-25 hover:opacity-50 transition-opacity hidden sm:block">
        <motion.div
          className="text-4xl select-none cursor-pointer"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          🧶
        </motion.div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-[#70411B]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#70411B]/60 font-semibold tracking-wider uppercase">
        <span>© 2026 Oouniverse Studio. All stitch rights reserved.</span>
        <span className="flex items-center gap-1 mt-3 sm:mt-0">
          Handcrafted with <Heart className="w-3 h-3 text-[#DFA8B4] fill-current" /> by master knitters
        </span>
      </div>

    </footer>
  );
}
