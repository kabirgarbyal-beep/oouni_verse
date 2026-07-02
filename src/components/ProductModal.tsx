import { X, Heart, ShoppingBag, Check, ShieldCheck, HeartCrack, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart: (quantity: number, color?: string) => void;
  relatedProducts: Product[];
  onRelatedProductClick: (product: Product) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  relatedProducts,
  onRelatedProductClick,
}: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'care'>('story');
  const [selectedColor, setSelectedColor] = useState(
    product.colorVariants && product.colorVariants.length > 0
      ? product.colorVariants[0].name
      : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleAddToCartClick = () => {
    onAddToCart(quantity, selectedColor);
    setIsSuccessMessage(true);
    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-8">
        
        {/* Backdrop glassmorphism overlay */}
        <motion.div
          className="fixed inset-0 bg-[#70411B]/25 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Sheet Container - Magazine layout */}
        <motion.div
          className="relative w-full max-w-5xl bg-[#FFF7F1] rounded-[36px] overflow-hidden shadow-2xl border border-[#70411B]/10 max-h-[90vh] flex flex-col z-20"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        >
          {/* Close button with circular hover */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-[#FFF7F1] border border-[#70411B]/15 text-[#70411B] hover:bg-[#70411B] hover:text-white transition-all duration-300 cursor-pointer"
            title="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrolling Content Zone */}
          <div className="overflow-y-auto p-6 md:p-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* LEFT: Premium Images Gallery (Lg span 6) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Primary Image Container */}
              <div className="relative aspect-square w-full rounded-[24px] overflow-hidden bg-[#F4E9E1] border border-[#70411B]/5">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4 }}
                  referrerPolicy="no-referrer"
                />

                {/* Handcrafted ribbon overlay */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm border border-[#70411B]/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#70411B] uppercase flex items-center gap-1">
                  <span>🧶</span> Handwoven
                </div>
              </div>

              {/* Thumbnails row (Multi-image layout) */}
              <div className="flex gap-3">
                {[product.image, ...(product.secondaryImages || [])]
                  .filter((img, idx, self) => self.indexOf(img) === idx) // unique list
                  .map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#F4E9E1] border-2 transition-all ${
                        activeImage === img ? 'border-[#9A5B2A] scale-95 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                      } cursor-pointer`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* RIGHT: Detailed Purchasing & Product Information (Lg span 6) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                
                {/* Category and stock status */}
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-xs font-bold tracking-widest text-[#9A5B2A] uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#70411B]/70 bg-[#F4E9E1]/60 px-2.5 py-1 rounded-full border border-[#70411B]/5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#A9C1A5] animate-pulse"></span>
                    <span>{product.stockStatus}</span>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#70411B] tracking-wide mb-2 leading-tight">
                  {product.name}
                </h2>

                {/* Rating line */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <div className="flex text-amber-500">⭐️⭐️⭐️⭐️⭐️</div>
                  <span className="font-bold text-[#70411B]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#70411B]/50 font-medium">({product.reviews.length} reviews)</span>
                </div>

                {/* Price Label */}
                <div className="text-3xl font-serif font-bold text-[#70411B] mb-6">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {/* Color Variants Selection */}
                {product.colorVariants && product.colorVariants.length > 0 && (
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#70411B] block mb-3">
                      Select Yarn Color: <span className="font-medium normal-case text-[#70411B]/70">{selectedColor}</span>
                    </span>
                    <div className="flex gap-2.5">
                      {product.colorVariants.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center`}
                          style={{
                            backgroundColor: col.hex,
                            borderColor: selectedColor === col.name ? '#70411B' : 'transparent',
                          }}
                          title={col.name}
                        >
                          {selectedColor === col.name && (
                            <Check className="w-4 h-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Detail Tab Systems (Story, Materials, Care) */}
                <div className="mb-8 border-b border-[#70411B]/10">
                  <div className="flex gap-6 -mb-px">
                    {(['story', 'materials', 'care'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                          activeTab === tab
                            ? 'border-[#70411B] text-[#70411B]'
                            : 'border-transparent text-[#70411B]/55 hover:text-[#70411B]'
                        }`}
                      >
                        {tab === 'story' ? 'The Story' : tab === 'materials' ? 'Materials' : 'Care Guide'}
                      </button>
                    ))}
                  </div>

                  <div className="py-5 text-sm leading-relaxed text-[#70411B]/80 min-h-[140px]">
                    {activeTab === 'story' && (
                      <div className="flex flex-col gap-3">
                        <p>{product.description}</p>
                        <p className="italic font-serif text-[#9A5B2A]">“{product.story}”</p>
                      </div>
                    )}
                    {activeTab === 'materials' && (
                      <ul className="list-disc pl-5 flex flex-col gap-2">
                        {product.materials.map((mat, i) => (
                          <li key={i}>{mat}</li>
                        ))}
                        {product.size && (
                          <li className="list-none mt-3 pt-3 border-t border-[#70411B]/5">
                            <span className="font-bold text-[#70411B]">Dimensions:</span> {product.size}
                          </li>
                        )}
                      </ul>
                    )}
                    {activeTab === 'care' && (
                      <ul className="list-decimal pl-5 flex flex-col gap-2">
                        {product.careInstructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </div>

              {/* STICKY PURCHASE CONTROLS */}
              <div className="bg-[#FFF7F1] pt-4 border-t border-[#70411B]/5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity adjustment */}
                  <div className="flex items-center justify-between border-2 border-[#70411B]/15 rounded-xl px-4 py-2 bg-white sm:w-32">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="text-lg font-bold text-[#70411B] hover:text-[#9A5B2A] w-6 text-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-[#70411B] w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="text-lg font-bold text-[#70411B] hover:text-[#9A5B2A] w-6 text-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCartClick}
                    className="flex-grow py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <span>Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </button>

                  {/* Heart / Wishlist Toggle */}
                  <button
                    onClick={onWishlistToggle}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                      isWishlisted
                        ? 'bg-[#DFA8B4]/20 border-[#DFA8B4] text-[#DFA8B4]'
                        : 'bg-white border-[#70411B]/15 hover:border-[#70411B] text-[#70411B]'
                    }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Addition Confirmation Toast banner */}
                <AnimatePresence>
                  {isSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3.5 p-3 rounded-xl bg-[#A9C1A5]/25 border border-[#A9C1A5]/40 text-[#70411B] text-xs font-semibold flex items-center gap-2 justify-center"
                    >
                      <Sparkles className="w-4 h-4 text-[#A9C1A5]" />
                      <span>Added successfully to your warm little cart!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reassurance text */}
                <div className="flex items-center gap-1.5 justify-center mt-4 text-[10px] font-semibold text-[#70411B]/60 tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A9C1A5]" />
                  <span>Plastic-free, compostable, botanical-infused packing</span>
                </div>
              </div>

            </div>
          </div>

          {/* RELATED PRODUCTS / CUSTOMER STORIES FOOTER ROW */}
          <div className="bg-[#F4E9E1]/30 p-6 md:p-8 border-t border-[#70411B]/10 max-h-[220px] overflow-y-auto hidden sm:block">
            <h4 className="font-serif text-sm font-bold text-[#70411B] mb-4 uppercase tracking-widest">
              You Might Also Love
            </h4>
            <div className="flex gap-4">
              {relatedProducts.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onRelatedProductClick(p);
                    setActiveImage(p.image);
                    setQuantity(1);
                    setSelectedColor(p.colorVariants && p.colorVariants.length > 0 ? p.colorVariants[0].name : undefined);
                  }}
                  className="flex items-center gap-3 p-2 bg-[#FFF7F1] rounded-xl hover:shadow-md transition-shadow text-left border border-[#70411B]/5 max-w-xs cursor-pointer group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#70411B] line-clamp-1 group-hover:text-[#9A5B2A]">
                      {p.name}
                    </h5>
                    <span className="text-xs font-mono text-[#70411B]/60">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
