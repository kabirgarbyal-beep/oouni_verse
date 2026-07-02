import { Heart, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [items, setItems] = useState(GALLERY_ITEMS.map(item => ({ ...item, liked: false })));

  const handleLikeClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setItems(prev => prev.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF7F1] pt-32 pb-24 relative overflow-hidden">
      {/* Background Stitches */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Grid Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFA8B4]/20 border border-[#DFA8B4]/40 text-[#70411B] text-xs font-semibold tracking-wider uppercase mb-5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span>📱</span>
            <span>Pinterest Aesthetics</span>
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#70411B] tracking-tight mb-4">
            Cozy Universe Gallery
          </h1>
          <p className="font-sans text-[#70411B]/80 text-base leading-relaxed">
            See how our beautiful crochet companions, wearables, and vintage floral shoulder bags style real lives, shared by our cozy community.
          </p>
        </div>

        {/* Pinterest Masonry Bento Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="break-inside-avoid bg-white rounded-[24px] overflow-hidden border border-[#70411B]/10 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-400 group relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              {/* Stitch border */}
              <div className="absolute inset-1.5 border border-dashed border-[#70411B]/5 rounded-2xl pointer-events-none z-20"></div>

              {/* Showcase Image */}
              <div className="overflow-hidden bg-[#F4E9E1] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Hover overlay mask */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white/90 backdrop-blur-sm text-[#70411B] rounded-full shadow hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Item Info row */}
              <div className="p-5 flex items-center justify-between z-10 relative">
                <div>
                  <h4 className="font-serif font-bold text-[#70411B] text-base group-hover:text-[#9A5B2A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#70411B]/60 leading-relaxed mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                {/* Heart Button */}
                <button
                  onClick={(e) => handleLikeClick(e, idx)}
                  className={`flex items-center gap-1 text-xs font-semibold py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                    item.liked
                      ? 'bg-[#DFA8B4]/20 border border-[#DFA8B4] text-[#DFA8B4]'
                      : 'bg-[#FFF7F1] hover:bg-[#F4E9E1] text-[#70411B]/60 border border-[#70411B]/10'
                  }`}
                  title={item.liked ? "Unlike creation" : "Like creation"}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.liked ? 'fill-current' : ''}`} />
                  <span>{item.likes}</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX ANIMATION MODAL */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Dark backdrop blur */}
              <motion.div
                className="absolute inset-0 bg-[#70411B]/35 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
              />

              {/* Lightbox Content Shield */}
              <motion.div
                className="relative bg-[#FFF7F1] rounded-[32px] overflow-hidden shadow-2xl border border-[#70411B]/15 max-w-2xl w-full z-20"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white border border-[#70411B]/15 text-[#70411B] hover:bg-[#70411B] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4E9E1] relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative flower label */}
                  <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm border border-[#70411B]/10 rounded-full text-[10px] font-bold text-[#70411B]">
                    🌸 Oouniverse Certified Warm
                  </span>
                </div>

                {/* Text Details */}
                <div className="p-6 md:p-8 text-left relative">
                  {/* Stitch border */}
                  <div className="absolute inset-2 border border-dashed border-[#70411B]/5 rounded-2xl pointer-events-none"></div>

                  <h3 className="font-serif text-2xl font-bold text-[#70411B] tracking-wide mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="font-sans text-sm text-[#70411B]/80 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#70411B]/5 text-xs text-[#70411B]/50 font-medium">
                    <span>Uploaded October 2026</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#DFA8B4] fill-current" />
                      {selectedItem.likes} cozy likes
                    </span>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
