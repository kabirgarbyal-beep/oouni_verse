import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, Filter, Quote, ArrowRight, Sparkles, Star, ChevronRight, X, Trash2, ShoppingBag } from 'lucide-react';

// Shared TS Types & Catalog Data
import { CartItem, Product } from './types';
import { PRODUCTS } from './data';

// Custom Handcrafted Components
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CustomOrder from './components/CustomOrder';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  // Global View & Loading States
  const [activeView, setActiveView] = useState<string>('home');
  const [showLoader, setShowLoader] = useState<boolean>(true);

  // Synchronize state with URL pathname (for separate URLs /shop, /custom etc.)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const validViews = ['home', 'shop', 'custom', 'gallery', 'about', 'contact'];
      if (!path) {
        setActiveView('home');
      } else if (validViews.includes(path)) {
        setActiveView(path);
      } else {
        setActiveView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const handleSetView = (view: string) => {
    const path = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // E-commerce States (Cart & Wishlist persistent via localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('oou_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('oou_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Drawer Toggles
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Deep-dive detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Search & Filter state for the Shop view
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('recommended');

  // Synchronize storage whenever updated
  useEffect(() => {
    localStorage.setItem('oou_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('oou_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, color?: string, customOptions?: any) => {
    setCartItems((prev) => {
      // Find matching item (with exact color choice)
      const matchIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && !item.customOptions?.isCustom
      );

      if (matchIdx > -1) {
        const updated = [...prev];
        updated[matchIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedColor: color, customOptions }];
    });
  };

  const handleAddCustomToCart = (customDetails: {
    baseProduct: string;
    yarnColor: string;
    accessory: string;
    textLabel: string;
    price: number;
  }) => {
    // Generate a pseudo-product structure for custom crafts
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Custom ${customDetails.baseProduct}`,
      tagline: 'Hand-loomed in your colors with custom details.',
      price: customDetails.price,
      rating: 5.0,
      category: customDetails.baseProduct === 'Octo Plushie' ? 'plushies' : customDetails.baseProduct === 'Coaster' ? 'coasters' : 'accessories',
      image: customDetails.baseProduct === 'Octo Plushie' 
        ? '/src/assets/images/crochet_plushies_1783006474452.jpg' 
        : customDetails.baseProduct === 'Coaster' 
          ? '/src/assets/images/crochet_coasters_1783006500338.jpg' 
          : '/src/assets/images/crochet_accessories_1783006515912.jpg',
      secondaryImages: [],
      description: `Bespoke handcrafted ${customDetails.baseProduct} styled with ${customDetails.yarnColor} wool, finished with a beautiful ${customDetails.accessory} and a stitched name tag.`,
      story: 'Crafted on demand by our lead loom artist.',
      materials: ['Organic Coimbatore Cotton', 'Sustainably sourced yarn blends'],
      careInstructions: ['Hand wash cold gently', 'Dry flat in shade'],
      stockStatus: 'Pre-Order',
      reviews: []
    };

    setCartItems((prev) => [
      ...prev,
      {
        product: customProduct,
        quantity: 1,
        selectedColor: customDetails.yarnColor,
        customOptions: {
          isCustom: true,
          yarnColor: customDetails.yarnColor,
          accessory: customDetails.accessory,
          textLabel: customDetails.textLabel
        }
      }
    ]);

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveToWishlist = (product: Product, index: number) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    handleRemoveItem(index);
  };

  // Wishlist Handlers
  const handleWishlistToggle = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleMoveToCartFromWishlist = (product: Product, wishlistIdx: number) => {
    handleAddToCart(product, 1, product.colorVariants?.[0]?.name);
    setWishlist((prev) => prev.filter((_, i) => i !== wishlistIdx));
  };

  // Checkout Success complete reset
  const handleCheckoutComplete = () => {
    setCartItems([]);
  };

  // Open Detailed Modal Quick View
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Shop filter and search logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return 0; // Default Recommended
  });

  // Featured and Best Sellers arrays
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller);

  // Category listing variables
  const categoryTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'bags', label: 'Crochet Bags' },
    { id: 'plushies', label: 'Plushies' },
    { id: 'flowers', label: 'Eternal Flowers' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'coasters', label: 'Coasters' },
    { id: 'homedecor', label: 'Home Decor' },
    { id: 'wearables', label: 'Wearables' }
  ];

  return (
    <div className="relative min-h-screen bg-[#FFF7F1] font-sans antialiased selection:bg-[#DFA8B4]/40 selection:text-[#70411B]">
      
      {/* Visual background layers */}
      <div className="bg-noise absolute inset-0 pointer-events-none"></div>

      {/* Unforgettable Yarn-rolling Preloader */}
      <AnimatePresence>
        {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      </AnimatePresence>

      {!showLoader && (
        <div className="flex flex-col min-h-screen">
          
          {/* Custom micro yarn ball cursor */}
          <Cursor />

          {/* Sticky transparent on-scroll blurred glass Navbar */}
          <Navbar
            activeView={activeView}
            setActiveView={handleSetView}
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            wishlistCount={wishlist.length}
            onCartClick={() => setIsCartOpen(true)}
            onWishlistClick={() => setIsWishlistOpen(true)}
          />

          {/* MAIN CHRONICLED PAGES RENDERING */}
          <main className="flex-grow">
            {activeView === 'home' && (
              <div className="bg-knitted-texture">
                {/* Hero Section */}
                <Hero
                  onExploreClick={() => handleSetView('shop')}
                  onCustomClick={() => handleSetView('custom')}
                />

                {/* FEATURED COLLECTION */}
                <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9A5B2A]">
                      Hand-knitted Gems
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#70411B] mt-2 tracking-wide">
                      Featured Cozy Creations
                    </h2>
                    <div className="w-16 h-0.5 bg-[#DFA8B4] mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.slice(0, 4).map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        isWishlisted={wishlist.some((w) => w.id === p.id)}
                        onWishlistToggle={() => handleWishlistToggle(p)}
                        onQuickView={() => handleQuickView(p)}
                        onAddToCart={() => handleAddToCart(p, 1, p.colorVariants?.[0]?.name)}
                      />
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <button
                      onClick={() => handleSetView('shop')}
                      className="px-8 py-3.5 bg-[#FFF7F1] border-2 border-[#70411B]/15 hover:border-[#70411B] text-[#70411B] font-sans font-semibold tracking-wide rounded-xl hover:bg-[#F4E9E1]/30 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Explore Full Catalog</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>

                {/* BEST SELLERS GRID CAROUSEL */}
                <section className="py-24 bg-[#F4E9E1]/30 border-y border-[#70411B]/5">
                  <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between mb-16">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#9A5B2A]">
                          Most Loved by Community
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#70411B] mt-2 tracking-wide">
                          Oouniverse Best Sellers
                        </h2>
                      </div>
                      <button
                        onClick={() => handleSetView('shop')}
                        className="mt-4 sm:mt-0 font-sans text-xs font-bold uppercase tracking-widest text-[#70411B] hover:text-[#9A5B2A] flex items-center gap-1.5 transition-colors group cursor-pointer"
                      >
                        <span>See All Best Sellers</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {bestSellerProducts.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          isWishlisted={wishlist.some((w) => w.id === p.id)}
                          onWishlistToggle={() => handleWishlistToggle(p)}
                          onQuickView={() => handleQuickView(p)}
                          onAddToCart={() => handleAddToCart(p, 1, p.colorVariants?.[0]?.name)}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* CUSTOM ORDERS DUAL CALLOUT CARD */}
                <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                  <div className="bg-[#F7D8DE] rounded-[48px] p-8 md:p-16 border border-[#70411B]/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden shadow-xl">
                    {/* Background Soft Blurs */}
                    <div className="absolute w-64 h-64 rounded-full bg-[#FFF7F1] opacity-60 blur-3xl top-10 right-10"></div>
                    
                    {/* Left details */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-sm border border-[#70411B]/10 text-xs font-semibold uppercase tracking-wider text-[#70411B] rounded-full mb-6">
                        <Sparkles className="w-3 h-3 text-[#9A5B2A]" />
                        <span>Bespoke Handwoven</span>
                      </div>
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#70411B] tracking-tight leading-tight mb-4">
                        Knit Your Cozy Dreams Into Reality
                      </h2>
                      <p className="font-sans text-sm text-[#70411B]/80 leading-relaxed mb-8 max-w-lg">
                        Have a specific color scheme, custom name tag, or a Pinterest pattern reference in mind? Step into our Interactive Loom customizer to choose your base, select organic cotton yarns, design instantly, and see a live stitched preview!
                      </p>
                      <button
                        onClick={() => handleSetView('custom')}
                        className="px-8 py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                      >
                        <span>Open Loom Studio</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>

                    {/* Right Illustration/Showcase */}
                    <div className="lg:col-span-5 relative h-[300px] flex items-center justify-center relative z-10">
                      <div className="absolute w-[240px] h-[240px] rounded-full overflow-hidden border-4 border-white shadow-2xl scale-95 hover:scale-100 transition-transform duration-500">
                        <img
                          src="/src/assets/images/crochet_accessories_1783006515912.jpg"
                          alt="Custom crochet hair accessory"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border border-[#70411B]/10 bottom-6 right-12 animate-bounce">
                        🎀
                      </div>
                      <div className="absolute w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border border-[#70411B]/10 top-6 left-12 animate-pulse">
                        🧁
                      </div>
                    </div>
                  </div>
                </section>

                {/* TESTIMONIALS (PINNED NOTE DESIGN) */}
                <section className="py-24 bg-[#FFF7F1] border-t border-[#70411B]/15 relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                  
                  <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-xl mx-auto mb-16">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#9A5B2A]">
                        Reviews & Stories
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#70411B] mt-2 tracking-wide">
                        Letters From Our Cozy Community
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          author: 'Maya Lin',
                          role: 'Plushie Collector',
                          comment: 'The Matcha Froggy plushie is literally the cutest thing on my desk! The packaging had real dried lavender sprigs, and the knit is incredibly sturdy. You can feel the hours of love!',
                          avatar: '🐸'
                        },
                        {
                          author: 'Evelyn Taylor',
                          role: 'Bespoke customer',
                          comment: 'I ordered a custom Muguet Bag with my daughter\'s name stitched into the clasp. The team updated me on WhatsApp, and it was delivered within 8 days wrapped like an absolute luxury gift!',
                          avatar: '🌷'
                        },
                        {
                          author: 'Sora Tanaka',
                          role: 'Aesthetics Lover',
                          comment: 'Oouniverse coaster sets have made my morning espresso routine feel like a slow Japanese cottagecore dream. Soft chocolate-beige tones, highly absorbable, premium craftsmanship!',
                          avatar: '☕️'
                        }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-3xl p-8 border border-[#70411B]/15 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                          {/* Thread stitched border */}
                          <div className="absolute inset-2 border border-dashed border-[#70411B]/5 rounded-2xl pointer-events-none"></div>

                          <div>
                            <Quote className="w-8 h-8 text-[#DFA8B4] opacity-75 mb-6" />
                            <p className="font-sans text-sm text-[#70411B]/80 leading-relaxed mb-6 italic">
                              “{item.comment}”
                            </p>
                          </div>

                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#70411B]/5">
                            <span className="text-3xl select-none">{item.avatar}</span>
                            <div>
                              <h5 className="font-serif font-bold text-[#70411B] text-sm leading-none">
                                {item.author}
                              </h5>
                              <span className="text-[10px] uppercase tracking-wider font-bold text-[#70411B]/55 block mt-1">
                                {item.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQ section */}
                <FAQ />
              </div>
            )}

            {activeView === 'shop' && (
              <div className="min-h-screen bg-[#FFF7F1] pt-32 pb-24 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                  
                  {/* Shop Heading */}
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-bold tracking-widest text-[#9A5B2A] uppercase">
                      "Don't Yawn, Just Yarn"
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#70411B] mt-2 tracking-wide">
                      Our Crochet Universe
                    </h1>
                    <p className="text-sm text-[#70411B]/75 leading-relaxed mt-2.5 max-w-lg mx-auto">
                      Explore our fully custom, row-by-row hand-knitted creations. Every shoulder bag, plushie, and lavender tulip blooms with dedicated care.
                    </p>
                  </div>

                  {/* Filtering, Search & Sorting Controls Grid Row */}
                  <div className="bg-white rounded-[24px] p-4 border border-[#70411B]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 flex items-center">
                      <Search className="absolute left-4 w-4 h-4 text-[#70411B]/40" />
                      <input
                        type="text"
                        placeholder="Search our cozy crafts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#FFF7F1]/50 border-2 border-[#70411B]/10 focus:border-[#70411B] rounded-xl pl-11 pr-4 py-2.5 text-xs text-[#70411B] outline-none font-semibold placeholder-[#70411B]/40"
                      />
                    </div>

                    {/* Sorting Toggle dropdown */}
                    <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                      <Filter className="w-3.5 h-3.5 text-[#70411B]/60" />
                      <span className="text-xs font-bold uppercase tracking-wide text-[#70411B]/60">Sort By:</span>
                      <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className="bg-[#FFF7F1]/50 border-2 border-[#70411B]/10 rounded-xl px-3 py-2 text-xs text-[#70411B] font-semibold outline-none focus:border-[#70411B] cursor-pointer"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>

                  </div>

                  {/* Category Scrolling Horizontal Tabs */}
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-12 scrollbar-none max-w-full">
                    {categoryTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border-2 transition-all cursor-pointer whitespace-nowrap ${
                          selectedCategory === tab.id
                            ? 'bg-[#70411B] border-[#70411B] text-white shadow-md'
                            : 'bg-white border-[#70411B]/10 hover:border-[#70411B]/35 text-[#70411B]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* ACTIVE CATALOG GRID LISTING */}
                  {filteredProducts.length === 0 ? (
                    <div className="py-24 text-center">
                      <span className="text-4xl">🧸</span>
                      <h3 className="font-serif text-xl font-bold text-[#70411B] mt-4">We searched high and low...</h3>
                      <p className="text-xs text-[#70411B]/60 mt-1 max-w-xs mx-auto">
                        No matches found for "{searchQuery}". Try browsing another category tab!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {filteredProducts.map((p) => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          isWishlisted={wishlist.some((w) => w.id === p.id)}
                          onWishlistToggle={() => handleWishlistToggle(p)}
                          onQuickView={() => handleQuickView(p)}
                          onAddToCart={() => handleAddToCart(p, 1, p.colorVariants?.[0]?.name)}
                        />
                      ))}
                    </div>
                  )}

                </div>
              </div>
            )}

            {activeView === 'custom' && (
              <CustomOrder onAddCustomToCart={handleAddCustomToCart} />
            )}

            {activeView === 'gallery' && (
              <GalleryPage />
            )}

            {activeView === 'about' && (
              <AboutPage />
            )}

            {activeView === 'contact' && (
              <ContactPage />
            )}
          </main>

          {/* BEAUTIFUL LOOM FOOTER SECTION */}
          <Footer setActiveView={handleSetView} />

          {/* SINGLE PRODUCT DETAIL MODAL SHEET OVERLAY */}
          <AnimatePresence>
            {isProductModalOpen && selectedProduct && (
              <ProductModal
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
                onWishlistToggle={() => handleWishlistToggle(selectedProduct)}
                onAddToCart={(qty, col) => handleAddToCart(selectedProduct, qty, col)}
                relatedProducts={PRODUCTS.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
                onRelatedProductClick={(p) => setSelectedProduct(p)}
              />
            )}
          </AnimatePresence>

          {/* COZY SLIDING CART DRAWER */}
          <AnimatePresence>
            {isCartOpen && (
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onMoveToWishlist={handleMoveToWishlist}
                onCheckoutComplete={handleCheckoutComplete}
              />
            )}
          </AnimatePresence>

          {/* BEAUTIFUL SLIDING WISHLIST OVERLAY SHEET */}
          <AnimatePresence>
            {isWishlistOpen && (
              <div className="fixed inset-0 z-50 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#70411B]/20 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsWishlistOpen(false)}
                />

                <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                  <motion.div
                    className="w-screen max-w-md bg-[#FFF7F1] border-l border-[#70411B]/10 shadow-2xl flex flex-col justify-between"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 220 }}
                  >
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-[#70411B]/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5.5 h-5.5 text-[#DFA8B4] fill-current" />
                        <h3 className="font-serif text-xl font-bold text-[#70411B]">Your Cozy Wishlist</h3>
                      </div>
                      <button
                        onClick={() => setIsWishlistOpen(false)}
                        className="p-1.5 rounded-full hover:bg-[#F4E9E1] text-[#70411B] transition-colors cursor-pointer"
                      >
                        <X className="w-5.5 h-5.5" />
                      </button>
                    </div>

                    {/* Scrollable list of items */}
                    <div className="flex-grow overflow-y-auto px-6 py-4 flex flex-col gap-4">
                      {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                          <span className="text-4xl mb-3">🧺</span>
                          <h4 className="font-serif text-base font-bold text-[#70411B]">Your Wishlist is empty</h4>
                          <p className="text-[11px] text-[#70411B]/60 max-w-[200px] leading-relaxed mt-1">
                            Save your favorite crochet bags, plushies, and floral bouquets to keep them warm here!
                          </p>
                        </div>
                      ) : (
                        wishlist.map((p, idx) => (
                          <div
                            key={p.id}
                            className="relative p-3.5 bg-white rounded-2xl border border-[#70411B]/5 flex gap-3.5 shadow-sm"
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F4E9E1] shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>

                            <div className="flex-grow flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between">
                                  <h5 className="font-serif text-xs font-bold text-[#70411B] pr-4 line-clamp-1">{p.name}</h5>
                                  <button
                                    onClick={() => handleWishlistToggle(p)}
                                    className="text-red-400 hover:text-red-600 p-0.5"
                                    title="Remove from Wishlist"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <span className="font-serif text-xs font-bold text-[#70411B] block mt-0.5">₹{p.price.toLocaleString('en-IN')}</span>
                              </div>

                              <button
                                onClick={() => handleMoveToCartFromWishlist(p, idx)}
                                className="w-full py-2 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold text-[10px] rounded-lg mt-2 tracking-wide flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>Move to Cart</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-6 bg-white border-t border-[#70411B]/10">
                      <button
                        onClick={() => { setIsWishlistOpen(false); handleSetView('shop'); }}
                        className="w-full py-3.5 bg-[#F4E9E1] hover:bg-[#70411B] hover:text-white text-[#70411B] text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                      >
                        Keep Browsing Shop
                      </button>
                    </div>

                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
