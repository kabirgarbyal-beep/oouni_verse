import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Implement high-fidelity 3D tilt effect on mouse hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = (x / width) - 0.5;
    const normalizedY = (y / height) - 0.5;

    // Convert to maximum rotation degrees (e.g., max 10 degrees tilt)
    setRotateX(-normalizedY * 12);
    setRotateY(normalizedX * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Human friendly display tags for categories
  const categoryLabels: Record<string, string> = {
    bags: 'Bags',
    plushies: 'Plushies',
    flowers: 'Eternal Flowers',
    keychains: 'Keychains',
    accessories: 'Accessories',
    coasters: 'Coasters',
    homedecor: 'Home Decor',
    wearables: 'Wearables'
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group bg-[#FFF7F1] rounded-3xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-[#70411B]/5 overflow-hidden flex flex-col justify-between"
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.15s ease-out, shadow 0.4s ease-out',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      
      {/* Dashed Stitch Border that animates slightly on card hover */}
      <div className="absolute inset-2 border border-dashed border-[#70411B]/15 rounded-2xl pointer-events-none group-hover:border-[#9A5B2A]/30 transition-colors duration-500"></div>

      {/* Floating Category Tag */}
      <span className="absolute top-6 left-6 z-25 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#70411B] uppercase bg-[#FFF7F1]/80 backdrop-blur-sm border border-[#70411B]/15 rounded-md">
        {categoryLabels[product.category] || product.category}
      </span>

      {/* Stock Status Tag */}
      {product.stockStatus !== 'In Stock' && (
        <span className={`absolute top-6 right-6 z-25 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-md ${
          product.stockStatus === 'Low Stock' 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-indigo-50 text-indigo-800'
        }`}>
          {product.stockStatus}
        </span>
      )}

      {/* Image Showcase Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F4E9E1] mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          referrerPolicy="no-referrer"
        />

        {/* Hover Action Overlay Overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center gap-3">
          {/* Quick View */}
          <button
            onClick={onQuickView}
            className="p-3 bg-[#FFF7F1] hover:bg-[#DFA8B4] hover:text-white text-[#70411B] rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          {/* Add to Cart */}
          <button
            onClick={onAddToCart}
            className="p-3 bg-[#FFF7F1] hover:bg-[#70411B] hover:text-white text-[#70411B] rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Heart / Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          className={`absolute bottom-4 right-4 z-20 p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-[#DFA8B4] text-white'
              : 'bg-[#FFF7F1]/90 hover:bg-[#FFF7F1] text-[#70411B]'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info & Metadata Section */}
      <div className="px-1 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#70411B] tracking-wide mb-1 leading-tight group-hover:text-[#9A5B2A] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-sans text-xs text-[#70411B]/75 italic mb-3 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Pricing, Reviews and Visual Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#70411B]/10">
          <span className="font-serif text-lg font-bold text-[#70411B]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1 text-[#9A5B2A] text-xs font-semibold">
            <span>⭐️</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-xs text-[#70411B]/50 font-normal">
              ({product.reviews.length})
            </span>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
}
