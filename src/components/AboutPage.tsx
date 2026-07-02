import { Heart, Sparkles, BookOpen, Smile, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  const timelineEvents = [
    {
      year: '2024',
      title: 'First Stitches',
      desc: 'Oouniverse was born in the serene foothills of Haldwani, Uttarakhand, where our founder hand-stitched her very first cute creations as heartfelt birthday gifts for friends.'
    },
    {
      year: '2025',
      title: 'The Viral Tiny Octo',
      desc: 'Our cozy little matcha octopus plushie went viral on Pinterest, with over 50,000 saves! High-demand inspired us to launch a sustainable, collective studio for local Pahadi women and rural female artisans.'
    },
    {
      year: '2026',
      title: 'Cozy Collective',
      desc: 'Today, Oouniverse is a community of 12 master artisans, row-stitching custom bags, plushies, and floral bouquets, shipped safely with organic dried botanicals worldwide.'
    }
  ];

  const values = [
    {
      icon: <Smile className="w-6 h-6 text-[#DFA8B4]" />,
      title: 'Cozy Connection',
      desc: 'Every item we make is infused with gentle care, bringing Studio Ghibli warmth and comfort straight to your bookshelves, desks, and shoulders.'
    },
    {
      icon: <Heart className="w-6 h-6 text-[#DFA8B4]" />,
      title: 'Ethical Sourcing',
      desc: 'We support independent female artisans. We exclusively source unbleached, organic Coimbatore cotton yarns and premium Himalayan merino wool blends.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#DFA8B4]" />,
      title: 'Zero Industrial Mass',
      desc: 'No heavy machines, no assembly lines, no generic templates. Every single loop is manually threaded, checked, and approved by a single artist.'
    }
  ];

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
            <BookOpen className="w-3.5 h-3.5 text-[#DFA8B4]" />
            <span>Our Cozy Story</span>
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#70411B] tracking-tight mb-4">
            Stepping into the Oouniverse
          </h1>
          <p className="font-sans text-[#70411B]/80 text-base leading-relaxed">
            We believe that objects carry soul. By slowing down and knitting one stitch at a time, we build artifacts that feel like a warm hug.
          </p>
        </div>

        {/* Section 1: Cinematic Brand Story with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Visual Collage */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px]">
            {/* Primary collage item */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-[32px] overflow-hidden border-4 border-white shadow-xl z-20 left-0 top-0">
              <img
                src="/src/assets/images/crochet_wearables_1783006542606.jpg"
                alt="Cozy Shrug Cardigan Stitching"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Secondary collage item */}
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-[24px] overflow-hidden border-4 border-white shadow-lg z-10 right-0 bottom-0">
              <img
                src="/src/assets/images/crochet_bags_hero_1783006461148.jpg"
                alt="Our crochet shoulder bag styling"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Text Stories */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#70411B] mb-5 tracking-wide leading-snug">
              "We Don't Just Knit; We Spin Cozy Memories into Thread"
            </h3>
            <p className="font-sans text-[#70411B]/80 text-sm leading-relaxed mb-4">
              In a fast-paced world of digital screens, automatic factories, and mass-produced plastics, our studio chose a different journey. We wanted to return to raw, slow craftsmanship—using simple metal hooks, warm unbleached cotton threads, and hours of thoughtful, mindful row stitching.
            </p>
            <p className="font-sans text-[#70411B]/80 text-sm leading-relaxed mb-6">
              Oouniverse was founded in 2024 with a single philosophy: <span className="font-bold">"Don't Yawn, Just Yarn."</span> Our goal is to bring sweet, adorable, Pinterest-inspired warmth back into your everyday life.
            </p>

            {/* Designer quote */}
            <div className="p-5 bg-white border border-[#70411B]/10 rounded-2xl relative shadow-sm">
              {/* Stitch border */}
              <div className="absolute inset-1.5 border border-dashed border-[#70411B]/5 rounded-xl"></div>
              <p className="font-serif italic text-sm text-[#9A5B2A] leading-relaxed">
                “When you hold one of our crochet plushies or sling a shoulder bag, you are holding 12 hours of quiet meditation, soft classical music, and dedicated love from a real kniter's hands. We hope you feel that connection.”
              </p>
              <span className="block text-[10px] uppercase tracking-wider font-bold text-[#70411B] mt-3">
                — Aditi Sharma, Loom Artist & Founder
              </span>
            </div>
          </div>

        </div>

        {/* Section 2: Values Bento Grid */}
        <div className="mb-24">
          <h2 className="font-serif text-3xl font-bold text-[#70411B] text-center mb-12">
            The Cozy Code of Ethics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-[#70411B]/15 shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Stitch border */}
                <div className="absolute inset-1.5 border border-dashed border-[#70411B]/5 rounded-2xl pointer-events-none"></div>

                <div className="w-12 h-12 rounded-xl bg-[#FFF7F1] flex items-center justify-center mb-5 shadow-sm border border-[#70411B]/5">
                  {v.icon}
                </div>
                <h4 className="font-serif font-bold text-lg text-[#70411B] mb-2">{v.title}</h4>
                <p className="text-xs text-[#70411B]/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Stitched Yarn Timeline */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#70411B] text-center mb-16">
            The Stitch Timeline
          </h2>
          <div className="max-w-3xl mx-auto relative pl-8 border-l-2 border-dashed border-[#9A5B2A]/40 flex flex-col gap-12">
            
            {/* Thread timeline connectors */}
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative">
                
                {/* Yarn ball bullet point */}
                <span className="absolute -left-[41px] top-1 text-xl select-none">
                  🧶
                </span>

                {/* Event details */}
                <div className="bg-[#F4E9E1] rounded-2xl p-5 border border-[#70411B]/10 shadow-sm relative">
                  <div className="absolute top-1 right-2 border-dashed border-[#70411B]/10 rounded"></div>
                  <span className="font-serif font-bold text-lg text-[#9A5B2A] block mb-1">
                    {evt.year} — {evt.title}
                  </span>
                  <p className="text-xs text-[#70411B]/85 leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
