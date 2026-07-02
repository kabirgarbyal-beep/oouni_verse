import { X, Trash2, Heart, ArrowRight, Ticket, Gift, Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onMoveToWishlist: (product: Product, index: number) => void;
  onCheckoutComplete: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  onCheckoutComplete,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Form Fields for Checkout
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');

  if (!isOpen) return null;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'YARNLOVE' || couponCode.toUpperCase() === 'OOU') {
      setActiveCoupon(couponCode.toUpperCase());
      setCouponError(false);
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const packagingFee = subtotal > 0 ? 2.50 : 0; // eco packaging fee
  const discount = activeCoupon ? subtotal * 0.15 : 0; // 15% discount
  const total = subtotal + packagingFee - discount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;
    setCheckoutStep('success');
  };

  const handleFinishCheckout = () => {
    onCheckoutComplete();
    setCheckoutStep('cart');
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Dark blur backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#70411B]/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Drawer Slide Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            className="w-screen max-w-md bg-[#FFF7F1] border-l border-[#70411B]/10 shadow-2xl flex flex-col justify-between"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#70411B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧶</span>
                <h3 className="font-serif text-xl font-bold text-[#70411B]">
                  {checkoutStep === 'cart' ? 'Your Cozy Cart' : checkoutStep === 'details' ? 'Delivery Details' : 'Order Stitched!'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#F4E9E1] text-[#70411B] transition-colors cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* CART CONTENT STEP */}
            {checkoutStep === 'cart' && (
              <div className="flex-grow flex flex-col justify-between overflow-y-auto">
                
                {/* Scrollable Items list */}
                <div className="px-6 py-4 flex-grow overflow-y-auto flex flex-col gap-5">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        🧸
                      </motion.div>
                      <h4 className="font-serif text-lg font-bold text-[#70411B] mb-2">Your cart is feeling drafty...</h4>
                      <p className="text-xs text-[#70411B]/60 max-w-[240px] leading-relaxed mb-6">
                        No crochet cuteness here yet! Fill it with custom plushies, flower bouquets, or shoulder bags.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 bg-[#70411B] hover:bg-[#9A5B2A] text-white text-xs font-semibold tracking-wide rounded-xl shadow transition-colors cursor-pointer"
                      >
                        Browse Shop
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item, idx) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor}-${idx}`}
                        className="relative p-4 bg-white rounded-2xl border border-[#70411B]/5 shadow-sm flex gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                      >
                        {/* Dashed micro border */}
                        <div className="absolute inset-1.5 border border-dashed border-[#70411B]/5 rounded-xl pointer-events-none"></div>

                        {/* Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4E9E1] relative shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <h5 className="font-serif text-sm font-bold text-[#70411B] pr-4 line-clamp-1">
                                {item.product.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(idx)}
                                className="text-[#70411B]/40 hover:text-red-500 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {item.selectedColor && (
                              <span className="text-[10px] bg-[#F4E9E1] text-[#70411B] px-1.5 py-0.5 rounded font-medium">
                                Color: {item.selectedColor}
                              </span>
                            )}
                            {item.customOptions?.isCustom && (
                              <div className="text-[9px] mt-1 text-[#9A5B2A] bg-[#DFA8B4]/10 px-1.5 py-0.5 rounded font-bold border border-[#DFA8B4]/20 flex items-center gap-1">
                                <span>🎨</span>
                                <span>Custom: {item.customOptions.yarnColor} ({item.customOptions.accessory})</span>
                              </div>
                            )}
                          </div>

                          {/* Controls (quantity, subtotal) */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#70411B]/5">
                            <div className="flex items-center border border-[#70411B]/15 rounded-lg px-2 bg-[#FFF7F1]/30">
                              <button
                                onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                                className="text-xs font-bold w-4 text-center cursor-pointer text-[#70411B]"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-bold w-6 text-center text-[#70411B]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                className="text-xs font-bold w-4 text-center cursor-pointer text-[#70411B]"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Move to Wishlist */}
                              <button
                                onClick={() => onMoveToWishlist(item.product, idx)}
                                className="text-xs text-[#70411B]/50 hover:text-[#DFA8B4] transition-colors flex items-center gap-0.5"
                                title="Move to Wishlist"
                              >
                                <Heart className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-serif text-sm font-bold text-[#70411B]">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Subtotals, Coupon fields and CTA buttons (Only if items exist) */}
                {cartItems.length > 0 && (
                  <div className="bg-white p-6 border-t border-[#70411B]/10 flex flex-col gap-4">
                    
                    {/* Coupon Promo Row */}
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#9A5B2A] shrink-0" />
                      <input
                        type="text"
                        placeholder="YARNLOVE for 15% off..."
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-3 py-1.5 text-xs text-[#70411B] bg-[#FFF7F1]/20 outline-none uppercase font-semibold"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-[#F4E9E1] hover:bg-[#70411B] hover:text-white text-[#70411B] text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Show Coupon Errors or Success */}
                    {activeCoupon && (
                      <div className="p-2 bg-[#A9C1A5]/25 text-[#70411B] rounded-lg text-[10px] font-bold flex items-center justify-between border border-[#A9C1A5]/40">
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-[#A9C1A5]" />
                          Promo applied: {activeCoupon} (15% Off)
                        </span>
                        <button onClick={() => setActiveCoupon(null)} className="text-[#70411B]/40 hover:text-[#70411B]">
                          Remove
                        </button>
                      </div>
                    )}
                    {couponError && (
                      <div className="text-[10px] text-red-500 font-bold px-1">
                        * Invalid code. Try "YARNLOVE"
                      </div>
                    )}

                    {/* Calculations Ledger */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-[#70411B]/5 text-xs text-[#70411B]/80">
                      <div className="flex justify-between">
                        <span>Cart Subtotal</span>
                        <span className="font-mono font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5 text-[#DFA8B4]" />
                          Botanical Pack fee
                        </span>
                        <span className="font-mono font-bold">₹{packagingFee.toLocaleString('en-IN')}</span>
                      </div>
                      {activeCoupon && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>15% Member Discount</span>
                          <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-serif font-bold text-[#70411B] pt-2 border-t border-[#70411B]/10">
                        <span>Total Estimate</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Big primary checkout action */}
                    <button
                      onClick={() => setCheckoutStep('details')}
                      className="w-full py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CHECKOUT DETAILS FORM STEP */}
            {checkoutStep === 'details' && (
              <form onSubmit={handleCheckoutSubmit} className="flex-grow flex flex-col justify-between overflow-y-auto">
                <div className="px-6 py-4 flex-grow overflow-y-auto flex flex-col gap-4">
                  <p className="text-xs text-[#70411B]/70 leading-relaxed mb-4">
                    Please provide your delivery information. We knit every order with love, infused with raw botanicals, packed safely.
                  </p>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Blossom Peterson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm text-[#70411B] bg-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. blossom@cozy.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm text-[#70411B] bg-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="For custom updates & order tracking"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm text-[#70411B] bg-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Shipping Address *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Street, City, Postal Code, Country"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm text-[#70411B] bg-white outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="bg-white p-6 border-t border-[#70411B]/10 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs font-serif font-bold text-[#70411B] mb-2">
                    <span>Total Amount due</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="py-3 bg-[#F4E9E1] hover:bg-[#F4E9E1]/80 text-[#70411B] font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="py-3 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Complete Order</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* CHECKOUT SUCCESS STEP */}
            {checkoutStep === 'success' && (
              <div className="flex-grow flex flex-col justify-between p-6 text-center">
                <div className="flex-grow flex flex-col items-center justify-center py-10">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-[#A9C1A5]/25 border border-[#A9C1A5]/40 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ShoppingBag className="w-10 h-10 text-[#A9C1A5]" />
                  </motion.div>

                  <h4 className="font-serif text-2xl font-bold text-[#70411B] mb-3">Order Stitched with Love!</h4>
                  <p className="text-xs text-[#70411B]/70 leading-relaxed max-w-xs mb-6">
                    Thank you, <span className="font-bold">{fullName}</span>! Your order has been placed successfully. A cozy confirmation receipt has been sent to <span className="font-semibold text-[#9A5B2A]">{email}</span>.
                  </p>

                  {/* Delivery timeline card */}
                  <div className="p-4 bg-[#FFF7F1] border border-[#70411B]/10 rounded-2xl w-full max-w-sm text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9A5B2A]">Shipping Timeline</span>
                    <h5 className="font-serif font-bold text-[#70411B] text-sm mt-1">Arrival in 5 - 10 Business Days</h5>
                    <p className="text-[11px] text-[#70411B]/70 mt-1">
                      Our crochet studio is spinning your creations immediately. All items are packed in eco-friendly boxes containing soft dried lavender stems.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 border-t border-[#70411B]/10">
                  <button
                    onClick={handleFinishCheckout}
                    className="w-full py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg cursor-pointer"
                  >
                    Continue Exploring Oouniverse
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
}
