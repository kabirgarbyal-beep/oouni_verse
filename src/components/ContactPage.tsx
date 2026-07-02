import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Instagram, Send, Sparkles, Coffee } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Build elegant WhatsApp message URL for custom query
    const textMsg = `Hello *Oouniverse*! 🧶 I am reaching out to you from your website.
• *Name*: ${name}
• *Email*: ${email}
• *Phone*: ${phone || 'Not provided'}
• *Subject*: ${subject}
• *Message*: ${message}`;
    
    const encodedMsg = encodeURIComponent(textMsg);
    // Open WhatsApp URL with inquiry text
    window.open(`https://wa.me/919876543210?text=${encodedMsg}`, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F1] pt-32 pb-24 relative overflow-hidden">
      {/* Background Stitches */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFA8B4]/20 border border-[#DFA8B4]/40 text-[#70411B] text-xs font-semibold tracking-wider uppercase mb-5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Coffee className="w-3.5 h-3.5 text-[#DFA8B4]" />
            <span>Chai & Crochet Conversations</span>
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#70411B] tracking-tight mb-4">
            Connect with Our Cozy Studio
          </h1>
          <p className="font-sans text-[#70411B]/80 text-base leading-relaxed">
            Have a question, a custom request, or just want to talk about wool yarn? Write us a note. Better yet, drop by if you are in the hills of Uttarakhand!
          </p>
        </div>

        {/* Core Layout: Contact Info & Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Handcrafted details + Google Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Quick Details Card */}
            <div className="bg-white rounded-[32px] p-8 border border-[#70411B]/15 shadow-sm relative overflow-hidden">
              {/* Stitch border */}
              <div className="absolute inset-2 border border-dashed border-[#70411B]/5 rounded-[24px] pointer-events-none"></div>
              
              <h3 className="font-serif text-2xl font-bold text-[#70411B] mb-6 tracking-wide flex items-center gap-2">
                <span>Studio Details</span>
                <span className="text-lg">🕉️🧿</span>
              </h3>

              <div className="flex flex-col gap-6 font-sans text-[#70411B]/80 text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7F1] border border-[#70411B]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#9A5B2A]" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-[#70411B] text-xs uppercase tracking-wide mb-1">Our Studio Location</span>
                    <p className="leading-relaxed font-medium">
                      The ऊनीverse Studio,<br />
                      Haldwani, Uttarakhand — 263139
                    </p>
                  </div>
                </div>

                {/* Shipping & Order Note */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7F1] border border-[#70411B]/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#9A5B2A]" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-[#70411B] text-xs uppercase tracking-wide mb-1">Crafting Time & Policy</span>
                    <p className="leading-relaxed text-xs">
                      • Order at least 15 days prior to avoid the rush 🧶<br />
                      • Shipping 🇮🇳 | No return / COD |
                    </p>
                  </div>
                </div>

                {/* Instagram Bio Box */}
                <div className="p-4 rounded-2xl bg-[#FFF7F1]/50 border border-[#70411B]/10 text-xs">
                  <span className="block font-serif font-bold text-[#70411B] text-[10px] uppercase tracking-wider mb-2 text-[#9A5B2A]">Our Instagram Spirit 💌</span>
                  <div className="font-sans text-[#70411B]/90 space-y-1">
                    <p>🕉️🧿</p>
                    <p>📍 Haldwani, Uttarakhand</p>
                    <p>Crochet products 🧶</p>
                    <p>Order atleast 15 days prior to avoid the rush.</p>
                    <p>Dm to order 💌</p>
                    <p>Shipping 🇮🇳 | No return / cod</p>
                  </div>
                </div>

                {/* Instagram Link */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7F1] border border-[#70411B]/10 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4 text-[#9A5B2A]" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-[#70411B] text-xs uppercase tracking-wide mb-1">Follow Our Stitch Feed</span>
                    <a 
                      href="https://instagram.com/oouni_verse/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="leading-relaxed font-bold text-[#9A5B2A] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      @oouni_verse
                    </a>
                    <span className="text-[10px] text-[#70411B]/55 block mt-0.5">Where we post behind-the-scenes loop animations!</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-white rounded-[32px] p-4 border border-[#70411B]/15 shadow-sm relative overflow-hidden h-[260px]">
              {/* iframe for Google Map centered on Haldwani, Uttarakhand */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27918.49014167123!2d79.508535!3d29.218264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09ade140b5f13%3A0xbc4e7ff9ff0f44bd!2sHaldwani%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1783007120000!5m2!1sen!2sin" 
                className="w-full h-full rounded-[24px] border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Haldwani"
              />
            </div>

          </div>

          {/* Right Column: Contact/Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#70411B]/15 shadow-sm relative overflow-hidden">
              {/* Stitch border */}
              <div className="absolute inset-2 border border-dashed border-[#70411B]/5 rounded-[24px] pointer-events-none"></div>

              <h3 className="font-serif text-2xl font-bold text-[#70411B] mb-2 tracking-wide">
                Send a Cozy Message
              </h3>
              <p className="font-sans text-xs text-[#70411B]/60 mb-8">
                Your message will go straight to Aditi's workspace. We draft this beautifully so you can send it via WhatsApp for instant response!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-serif text-[11px] font-bold text-[#70411B]/80 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Aaradhya Joshi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-2 border-[#70411B]/10 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none transition-all placeholder-[#70411B]/40"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-serif text-[11px] font-bold text-[#70411B]/80 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., aaradhya@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-[#70411B]/10 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none transition-all placeholder-[#70411B]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-serif text-[11px] font-bold text-[#70411B]/80 uppercase tracking-wider">WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="e.g., +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-2 border-[#70411B]/10 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none transition-all placeholder-[#70411B]/40"
                    />
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-serif text-[11px] font-bold text-[#70411B]/80 uppercase tracking-wider">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border-2 border-[#70411B]/10 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Design Order">Custom Design Request</option>
                      <option value="Shipping & Delivery">Shipping & Delivery</option>
                      <option value="Artisan Collaboration">Artisan Collaboration</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-serif text-[11px] font-bold text-[#70411B]/80 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you would love to hear about..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-[#70411B]/10 focus:border-[#70411B] bg-[#FFF7F1]/20 rounded-xl px-4 py-3 text-sm text-[#70411B] outline-none resize-none transition-all placeholder-[#70411B]/40"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#70411B] hover:bg-[#9A5B2A] text-white font-sans font-bold tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>Send via WhatsApp Support</span>
                </button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-[#A9C1A5]/25 border border-[#A9C1A5]/40 text-[#70411B] text-xs font-semibold flex items-center gap-2 justify-center"
                  >
                    <Sparkles className="w-4 h-4 text-[#9A5B2A]" />
                    <span>Your WhatsApp message layout has been created successfully!</span>
                  </motion.div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
