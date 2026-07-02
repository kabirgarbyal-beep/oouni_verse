import { Sparkles, MessageCircle, Info, Check, Calendar, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

interface CustomOrderProps {
  onAddCustomToCart: (customDetails: {
    baseProduct: string;
    yarnColor: string;
    accessory: string;
    textLabel: string;
    price: number;
  }) => void;
}

export default function CustomOrder({ onAddCustomToCart }: CustomOrderProps) {
  // Custom Playground States
  const [baseProduct, setBaseProduct] = useState<'Coaster' | 'Octo Plushie' | 'Hair Bow'>('Coaster');
  const [yarnColor, setYarnColor] = useState('Peach Sorbet');
  const [accessory, setAccessory] = useState('Flower Crown');
  const [textLabel, setTextLabel] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Inquiry Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [palette, setPalette] = useState('Pastel Pink & Sage');
  const [concept, setConcept] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  // Color options
  const yarnColors = [
    { name: 'Peach Sorbet', hex: '#F7D8DE' },
    { name: 'Warm Beige', hex: '#F4E9E1' },
    { name: 'Coffee Brown', hex: '#9A5B2A' },
    { name: 'Sage Green', hex: '#A9C1A5' },
    { name: 'Cream White', hex: '#FFF7F1' }
  ];

  // Accessory options
  const accessoryOptions = [
    { name: 'Flower Crown', icon: '🌸' },
    { name: 'Cosy Scarf', icon: '🧣' },
    { name: 'Mini Satin Bow', icon: '🎀' },
    { name: 'None', icon: '✨' }
  ];

  // Dynamic price calculation
  const calculatePrice = () => {
    let basePrice = 450;
    if (baseProduct === 'Octo Plushie') basePrice = 750;
    if (baseProduct === 'Hair Bow') basePrice = 350;

    const accessoryPrice = accessory === 'None' ? 0 : 100;
    const labelPrice = textLabel.trim().length > 0 ? 120 : 0;

    return basePrice + accessoryPrice + labelPrice;
  };

  const currentPrice = calculatePrice();

  const handlePlaygroundAddToCart = () => {
    onAddCustomToCart({
      baseProduct,
      yarnColor,
      accessory,
      textLabel: textLabel.trim(),
      price: currentPrice
    });
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  // Inquiry Form submission and WhatsApp link building
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !whatsapp || !concept) return;

    // Build elegant WhatsApp message URL
    const msg = `Hello *Oouniverse*! 🧶 I would like to inquire about a Custom Crochet Creation.
• *Name*: ${fullName}
• *Email*: ${email}
• *Palette Selection*: ${palette}
• *My Idea*: ${concept}
• *Requested Timeline*: 7 - 14 Days
Please get back to me! ✨`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, '') || '1234567890'}?text=${encodedMsg}`;

    setSubmittedInquiry(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F1] pt-32 pb-24 overflow-hidden">
      {/* Background Stitches */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFA8B4]/20 border border-[#DFA8B4]/40 text-[#70411B] text-xs font-semibold tracking-wider uppercase mb-5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DFA8B4]" />
            <span>Interactive Customizer Studio</span>
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#70411B] tracking-tight leading-tight mb-4">
            Custom Crochet Creations
          </h1>
          <p className="font-sans text-[#70411B]/80 text-base max-w-xl mx-auto leading-relaxed">
            Dream up your perfect knits. Use our interactive loom below to design instantly, or request a bespoke custom curation via WhatsApp.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE DESIGNER STUDIO PLAYGROUND */}
        <div className="bg-white rounded-[40px] p-6 md:p-12 border border-[#70411B]/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative">
          {/* Accent decoration threads */}
          <div className="absolute inset-3 border border-dashed border-[#70411B]/10 rounded-[32px] pointer-events-none"></div>

          {/* PLAYGROUND LEFT: Dynamic Live Render Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#FFF7F1] rounded-[30px] p-8 min-h-[380px] border border-[#70411B]/5 shadow-inner relative">
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-[#70411B]/60">
              🧶 Live Custom Loom
            </span>

            {/* Render customizable crochet bases */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Coaster Render */}
              {baseProduct === 'Coaster' && (
                <motion.div
                  className="w-48 h-48 rounded-full border-8 border-dashed border-[#70411B]/15 flex items-center justify-center shadow-lg relative"
                  style={{ backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {/* Knit spirals inside */}
                  <div className="absolute inset-3 border-4 border-double border-white/40 rounded-full flex items-center justify-center">
                    <div className="absolute inset-4 border-2 border-dashed border-[#70411B]/10 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#FFF7F1] rounded-full shadow-inner flex items-center justify-center text-xs font-mono font-bold text-[#70411B]">
                        {textLabel ? textLabel.slice(0, 4) : '☕️'}
                      </div>
                    </div>
                  </div>

                  {/* Attached accessory decoration */}
                  {accessory !== 'None' && (
                    <motion.div
                      className="absolute -top-2 -right-2 text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      {accessoryOptions.find((a) => a.name === accessory)?.icon}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Octopus Plushie Render */}
              {baseProduct === 'Octo Plushie' && (
                <motion.div
                  className="relative flex flex-col items-center justify-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {/* Octo Head */}
                  <div
                    className="w-40 h-40 rounded-full shadow-lg border-2 border-[#70411B]/10 flex flex-col items-center justify-center relative"
                    style={{ backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex }}
                  >
                    {/* Blink eyes */}
                    <div className="flex gap-6 mb-1">
                      <motion.div
                        className="w-3.5 h-3.5 bg-[#70411B] rounded-full relative flex items-center justify-center"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1.5 }}
                      >
                        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
                      </motion.div>
                      <motion.div
                        className="w-3.5 h-3.5 bg-[#70411B] rounded-full relative flex items-center justify-center"
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 1.5 }}
                      >
                        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
                      </motion.div>
                    </div>

                    {/* Rosy blush */}
                    <div className="absolute inset-x-8 top-20 flex justify-between px-2">
                      <div className="w-4 h-2 bg-[#DFA8B4]/70 rounded-full blur-[1px]"></div>
                      <div className="w-4 h-2 bg-[#DFA8B4]/70 rounded-full blur-[1px]"></div>
                    </div>

                    {/* Smiley mouth */}
                    <span className="text-xl font-bold text-[#70411B] select-none -mt-1.5">‿</span>

                    {/* Custom Stitched label tag */}
                    {textLabel && (
                      <div className="absolute bottom-4 bg-[#FFF7F1] border border-[#70411B]/15 px-2 py-0.5 rounded text-[8px] font-bold text-[#70411B] tracking-wider uppercase shadow-sm">
                        🏷️ {textLabel.slice(0, 6)}
                      </div>
                    )}
                  </div>

                  {/* Little tentacles row */}
                  <div className="flex gap-1.5 -mt-3 relative z-10">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-6 h-6 rounded-full shadow-sm border border-[#70411B]/5"
                        style={{ backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex }}
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
                      />
                    ))}
                  </div>

                  {/* Attached accessory decoration */}
                  {accessory !== 'None' && (
                    <motion.div
                      className="absolute top-[-10px] text-4.5xl drop-shadow-md z-20"
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    >
                      {accessoryOptions.find((a) => a.name === accessory)?.icon}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Hair Bow Render */}
              {baseProduct === 'Hair Bow' && (
                <motion.div
                  className="relative flex flex-col items-center justify-center w-52 h-44"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {/* Bow Wings Left & Right */}
                  <div className="flex items-center relative">
                    <div
                      className="w-24 h-28 rounded-[24px] border border-[#70411B]/5 shadow-md origin-right"
                      style={{
                        backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex,
                        rotate: '-12deg'
                      }}
                    />
                    <div
                      className="w-10 h-10 rounded-xl bg-white/40 border-2 border-white shadow-inner flex items-center justify-center relative z-20 mx-[-20px]"
                      style={{ backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex }}
                    >
                      <div className="w-3 h-3 bg-[#FFF7F1] rounded-full"></div>
                    </div>
                    <div
                      className="w-24 h-28 rounded-[24px] border border-[#70411B]/5 shadow-md origin-left"
                      style={{
                        backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex,
                        rotate: '12deg'
                      }}
                    />
                  </div>

                  {/* Ribbon tails hanging */}
                  <div className="flex gap-16 mt-[-10px] relative z-10 w-full justify-center px-4">
                    <div
                      className="w-4 h-16 rounded-b-full origin-top"
                      style={{
                        backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex,
                        rotate: '-15deg'
                      }}
                    />
                    <div
                      className="w-4 h-16 rounded-b-full origin-top"
                      style={{
                        backgroundColor: yarnColors.find((c) => c.name === yarnColor)?.hex,
                        rotate: '15deg'
                      }}
                    />
                  </div>

                  {/* Text label embroidered */}
                  {textLabel && (
                    <span className="absolute bottom-1 bg-white border border-[#70411B]/15 px-2 py-0.5 rounded text-[8px] font-bold text-[#70411B] tracking-wider uppercase z-20">
                      🧵 {textLabel.slice(0, 5)}
                    </span>
                  )}

                  {/* Attached accessory decoration */}
                  {accessory !== 'None' && (
                    <motion.div
                      className="absolute top-2 right-4 text-4xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      {accessoryOptions.find((a) => a.name === accessory)?.icon}
                    </motion.div>
                  )}
                </motion.div>
              )}

            </div>

            {/* Design overview labels */}
            <div className="mt-8 text-center text-xs text-[#70411B]/60 font-medium">
              Stitched with <span className="font-bold text-[#70411B]">100% Organic Cotton Thread</span> • Pre-arranged setup
            </div>
          </div>

          {/* PLAYGROUND RIGHT: Loom Controls Selector Grid */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              
              {/* STEP 1: SELECT PRODUCT BASE */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A5B2A] block mb-3">
                  Step 1: Choose Base Product
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Coaster', 'Octo Plushie', 'Hair Bow'] as const).map((base) => (
                    <button
                      key={base}
                      onClick={() => setBaseProduct(base)}
                      className={`py-3 rounded-xl border-2 font-serif text-sm font-bold tracking-wide transition-all cursor-pointer ${
                        baseProduct === base
                          ? 'border-[#70411B] bg-[#70411B]/5 text-[#70411B]'
                          : 'border-[#70411B]/10 hover:border-[#70411B]/40 text-[#70411B]/60'
                      }`}
                    >
                      {base === 'Coaster' ? 'Coaster (₹450)' : base === 'Octo Plushie' ? 'Octopus (₹750)' : 'Hair Bow (₹350)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: SELECT COLOR */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A5B2A] block mb-3">
                  Step 2: Choose Yarn Color ({yarnColor})
                </span>
                <div className="flex gap-3">
                  {yarnColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setYarnColor(color.name)}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center`}
                      style={{
                        backgroundColor: color.hex,
                        borderColor: yarnColor === color.name ? '#70411B' : 'transparent',
                      }}
                      title={color.name}
                    >
                      {yarnColor === color.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: ACCENT DECAL ACCESSORY */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A5B2A] block mb-3">
                  Step 3: Stitched Accent Decoration (+₹100)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {accessoryOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setAccessory(opt.name)}
                      className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        accessory === opt.name
                          ? 'border-[#70411B] bg-[#70411B]/5 text-[#70411B]'
                          : 'border-[#70411B]/10 hover:border-[#70411B]/40 text-[#70411B]/50'
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span className="text-[9px] font-semibold tracking-tight text-center leading-tight">
                        {opt.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 4: CUSTOM STITCHED LABEL EMBROIDERY */}
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#9A5B2A] block mb-2">
                  Step 4: Custom Stitched Name Tag (+₹120)
                </span>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Type tag (e.g., COZY, MUMU)..."
                  value={textLabel}
                  onChange={(e) => setTextLabel(e.target.value.toUpperCase())}
                  className="w-full border-2 border-[#70411B]/15 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none tracking-widest font-mono font-bold placeholder-[#70411B]/45"
                />
                <p className="text-[10px] text-[#70411B]/55 mt-1.5 italic">
                  * Name tag is delicately stitched into the side rib of the item. Max 10 letters.
                </p>
              </div>

            </div>

            {/* ACTION FOOTER LEDGER */}
            <div className="pt-4 border-t border-[#70411B]/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif font-bold text-[#70411B]">Total Cost for Creation:</span>
                <span className="font-serif text-2xl font-bold text-[#70411B]">₹{currentPrice.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={handlePlaygroundAddToCart}
                className="w-full py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Knit My Design & Add to Cart</span>
              </button>

              <AnimatePresence>
                {isAddedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-3.5 rounded-xl bg-[#A9C1A5]/25 border border-[#A9C1A5]/40 text-[#70411B] text-xs font-semibold flex items-center gap-2 justify-center"
                  >
                    <span>🧶</span>
                    <span>Added your custom creation to cart! Stitches lock loaded.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* SECTION 2: PROCESS OVERVIEW FLOW CHART */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl font-bold text-[#70411B] text-center mb-12">
            The Custom Craft Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {/* Horizontal line for desktop flow */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-[#70411B]/10 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#DFA8B4]/30 text-[#70411B] flex items-center justify-center font-serif text-xl font-bold mb-4 border border-[#70411B]/10 shadow">
                1
              </div>
              <h4 className="font-serif font-bold text-[#70411B] text-lg mb-2">Design & loom</h4>
              <p className="text-xs text-[#70411B]/70 max-w-[220px] leading-relaxed">
                Choose base plushies, accessories, or home decor structures. Decide on organic colors.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#FFF7F1] text-[#70411B] flex items-center justify-center font-serif text-xl font-bold mb-4 border-2 border-[#DFA8B4] shadow">
                2
              </div>
              <h4 className="font-serif font-bold text-[#70411B] text-lg mb-2">Artisanal Stitching</h4>
              <p className="text-xs text-[#70411B]/70 max-w-[220px] leading-relaxed">
                Our designer works over 10-18 continuous hours row by row to knit your design.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#A9C1A5]/30 text-[#70411B] flex items-center justify-center font-serif text-xl font-bold mb-4 border border-[#70411B]/10 shadow">
                3
              </div>
              <h4 className="font-serif font-bold text-[#70411B] text-lg mb-2">Fibre Infused Pack</h4>
              <p className="text-xs text-[#70411B]/70 max-w-[220px] leading-relaxed">
                Packed with organic lavender stems to keep knits fresh, tied with handmade unbleached ribbons.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: BESPOKE CUSTOM ENQUIRY FORM / WHATSAPP INTEGRATION */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F4E9E1] rounded-[36px] p-6 md:p-10 border border-[#70411B]/15 shadow-md">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-white text-[#70411B] rounded-2xl shadow border border-[#70411B]/5 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#70411B]">
                  Bespoke Crochet Inquiry Form
                </h3>
                <p className="text-xs text-[#70411B]/75 leading-relaxed mt-1">
                  Have a specific vision, custom sweater, or baby shower gift kit in mind? Provide details below. Clicking submit will automatically package your request and redirect you to WhatsApp to connect with our loom artist!
                </p>
              </div>
            </div>

            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lavender Watson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm bg-white outline-none text-[#70411B]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. lavender@cozy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm bg-white outline-none text-[#70411B]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 15550199"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm bg-white outline-none text-[#70411B]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Yarn Palette Vibe</label>
                <select
                  value={palette}
                  onChange={(e) => setPalette(e.target.value)}
                  className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm bg-white outline-none text-[#70411B] font-medium"
                >
                  <option>Pastel Pink & Sage</option>
                  <option>Warm Mocha & Beige</option>
                  <option>Sunny Sunflower & Cream</option>
                  <option>Lavender Dream & Mint</option>
                  <option>Surprise Me (Vibrant Organics)</option>
                </select>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#70411B] uppercase tracking-wider">Describe Your Crochet Dream *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe shapes, sizes, colors, or references. For example: 'A cozy matching cardigan for my cat and me...'"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="border-2 border-[#70411B]/15 focus:border-[#70411B] rounded-xl px-4 py-3 text-sm bg-white outline-none resize-none text-[#70411B]"
                />
              </div>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={submittedInquiry}
                  className="w-full py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>
                    {submittedInquiry ? 'Assembling your request details...' : 'Submit Inquiry via WhatsApp'}
                  </span>
                </button>
              </div>
            </form>

            <AnimatePresence>
              {submittedInquiry && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-white border border-[#70411B]/10 rounded-xl text-xs text-[#70411B]/80 font-medium flex items-center gap-2 justify-center"
                >
                  <Info className="w-4 h-4 text-[#DFA8B4] animate-bounce" />
                  <span>Redirecting securely to WhatsApp chat with Oouniverse team...</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
