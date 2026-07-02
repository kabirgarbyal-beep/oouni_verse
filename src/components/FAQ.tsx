import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-[#FFF7F1] relative overflow-hidden" id="faq-section">
      {/* Background Stitches */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#70411B_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#70411B] tracking-wide mb-4">
            Unraveling Your Questions
          </h2>
          <p className="font-sans text-sm text-[#70411B]/85 leading-relaxed">
            Everything you wanted to know about our organic yarns, custom timelines, care tips, and packaging. Gently unwrap each layer.
          </p>
        </div>

        {/* FAQs Accordion Row */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#70411B]/10 overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Header question toggle */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                >
                  <span className="font-serif text-base md:text-lg font-bold text-[#70411B] group-hover:text-[#9A5B2A] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-[#70411B]/55 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Unraveling Thread animation for Accordion Opening */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {/* Accordion interior text details */}
                      <div className="px-6 pb-6 pt-1 text-sm text-[#70411B]/80 leading-relaxed border-t border-[#70411B]/5 relative">
                        {/* Animated dotted stitch thread line indicating unraveling */}
                        <div className="absolute left-6 right-6 top-0 h-px border-t-2 border-dashed border-[#9A5B2A]/30"></div>
                        <p className="mt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
