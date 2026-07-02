import { ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onProductQuickView?: () => void;
}

export default function Navbar({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom', label: 'Custom Orders' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <>
      <motion.nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#FFF7F1]/90 backdrop-blur-md border-b border-[#70411B]/10 shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Elegant top announcement bar for Indian Shipping & Store policies */}
        <div className="bg-[#70411B] text-[#FFF7F1] text-[10px] md:text-[11px] font-sans font-bold py-2 px-4 text-center tracking-wide border-b border-[#FFF7F1]/10 flex items-center justify-center gap-1.5 shadow-sm relative z-50">
          <Sparkles className="w-3.5 h-3.5 text-[#DFA8B4] animate-pulse shrink-0" />
          <span>Shipping 🇮🇳 | No return / COD | Order at least 15 days prior 🧶 | Haldwani 🏔️</span>
        </div>

        <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'py-3.5' : 'py-5'
        }`}>
          
          {/* Logo with Cozy Style */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            id="nav-logo"
          >
            {/* Round frame for the logo uploaded by the user */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-[#EAAFB9]/20 border-2 border-[#70411B]/20 flex items-center justify-center shrink-0 shadow-md">
              <img
                src="/src/assets/images/crochet_yarn_logo_1783009375471.jpg"
                alt="ऊनीverse Logo"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackEl = document.getElementById('navbar-logo-fallback');
                  if (fallbackEl) {
                    fallbackEl.style.display = 'flex';
                  }
                }}
              />
              {/* Fallback emoji */}
              <div id="navbar-logo-fallback" className="hidden absolute inset-0 items-center justify-center bg-[#F4E9E1]">
                <span className="text-2xl">🧶</span>
              </div>
            </div>

            <div className="flex flex-col items-start leading-none">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-[#70411B] group-hover:text-[#9A5B2A] transition-colors duration-300">
                ऊनीverse
              </span>
              <span className="text-[10px] font-sans tracking-widest text-[#9A5B2A] uppercase font-bold mt-1.5 opacity-90">
                Don't Yawn, Just Yarn
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - Styled like Aesop/Bakery elegant menus */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`relative font-sans text-sm tracking-wide font-medium py-1 cursor-pointer transition-all duration-300 ${
                    isActive ? 'text-[#70411B] font-semibold' : 'text-[#70411B]/70 hover:text-[#70411B]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9A5B2A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Icons (Wishlist, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-3.5 md:gap-5">
            {/* Wishlist Button */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 rounded-full hover:bg-[#F4E9E1] text-[#70411B] hover:text-[#9A5B2A] transition-all duration-300 cursor-pointer"
              title="View Wishlist"
              id="wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wishlist-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-[#DFA8B4] border border-[#FFF7F1] text-[9px] font-bold text-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart Button with Shaking Animation on addition */}
            <motion.button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-[#F4E9E1] text-[#70411B] hover:text-[#9A5B2A] transition-all duration-300 cursor-pointer"
              title="Open Shopping Cart"
              id="cart-btn"
              animate={cartCount > 0 ? { scale: [1, 1.15, 0.95, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#9A5B2A] border border-[#FFF7F1] text-[9.5px] font-bold text-white rounded-full flex items-center justify-center shadow-sm font-mono"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Micro Sparkle Button for Custom orders (Callout) */}
            <button
              onClick={() => setActiveView('custom')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#FFF7F1] border border-[#70411B]/15 text-[#70411B] rounded-full hover:bg-[#DFA8B4]/20 transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DFA8B4]" />
              <span>Custom Crochet</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#70411B] hover:bg-[#F4E9E1] rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-35 bg-[#FFF7F1] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => {
                const isActive = activeView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left font-serif text-3xl font-semibold tracking-wide ${
                      isActive ? 'text-[#9A5B2A]' : 'text-[#70411B]/70'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Details */}
            <motion.div
              className="border-t border-[#70411B]/10 pt-8 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => {
                  setActiveView('custom');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#DFA8B4] hover:bg-[#DFA8B4]/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Knit a Custom Design</span>
              </button>
              <p className="text-center text-xs text-[#70411B]/50 font-sans tracking-wide">
                🌸 Handmade Stories, One Stitch at a Time
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
