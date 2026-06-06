/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  discountBadge: string;
  image: string;
  ctaText: string;
  category: string;
}

const SECTIONS: CarouselSlide[] = [
  {
    id: 1,
    title: 'The Flagship Mobile Revolution',
    subtitle: 'Pre-order Aerophone Pro 15 with ultra-capacitive batteries & superior lens optical sensors.',
    badge: 'Limited Tech Launch',
    discountBadge: 'Flat ₹5,000 Bank Cashback',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
    ctaText: 'Pre-order Mobile',
    category: 'Mobiles'
  },
  {
    id: 2,
    title: 'Precision Workstation Gear',
    subtitle: 'Maximize creative computing output & speeds with Aerobook Pro custom processors.',
    badge: 'Creator Workstation',
    discountBadge: 'Up to 33% Savings',
    image: 'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=500&q=80',
    ctaText: 'Explore Laptops',
    category: 'Laptops'
  },
  {
    id: 3,
    title: 'Urban Athletics Reflow',
    subtitle: 'Experience dynamic mesh suspension running sneakers with anti-slip microfibers.',
    badge: 'Seasonal Fitness Offer',
    discountBadge: 'BOGO: Buy 1 Get 1 50%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    ctaText: 'Browse Shoes',
    category: 'Shoes'
  }
];

interface HeroCarouselProps {
  onSelectCategory: (category: string) => void;
  onExploreProducts: () => void;
}

export function HeroCarousel({ onSelectCategory, onExploreProducts }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SECTIONS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SECTIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SECTIONS.length);
  };

  const slide = SECTIONS[currentSlide];

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
      {/* Left: 70% rotating slider */}
      <div 
        id="hero-carousel-container" 
        className="w-full md:w-[70%] h-[260px] md:h-[320px] bg-slate-900 rounded-xl overflow-hidden relative group shadow-sm flex"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex relative"
          >
            {/* Dark tint gradient strip */}
            <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />

            {/* Slide Details Left Panel */}
            <div className="z-10 flex flex-col justify-center h-full p-6 md:p-8 max-w-md text-left text-white">
              <div className="flex flex-wrap gap-1.5 items-center mb-2.5">
                <span className="inline-flex items-center gap-1 bg-indigo-600/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  {slide.badge}
                </span>
                <span className="inline-flex items-center gap-1 bg-yellow-400 text-slate-955 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  {slide.discountBadge}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2 leading-snug">
                {slide.title}
              </h2>

              <p className="text-[11px] md:text-xs text-slate-350 text-slate-300 mb-4 font-normal leading-relaxed">
                {slide.subtitle}
              </p>

              <div>
                <button
                  id={`carousel-cta-${slide.id}`}
                  onClick={() => onSelectCategory(slide.category)}
                  className="inline-flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 py-2 rounded-lg shadow-sm transition-all text-[11px] cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
                  {slide.ctaText}
                </button>
              </div>
            </div>

            {/* Right Media Display Banner */}
            <div className="absolute inset-y-0 right-0 w-1/2 h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-r-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <button
          id="carousel-prev"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-950/40 hover:bg-slate-950/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          id="carousel-next"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-950/40 hover:bg-slate-950/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Indicator dots navigation */}
        <div className="absolute bottom-3 left-6 flex gap-1.5 z-20">
          {SECTIONS.map((_, idx) => (
            <button
              key={idx}
              id={`carousel-dot-${idx}`}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-4.5 bg-white' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right: 30% stationary high-conversion promo boxes */}
      <div className="w-full md:w-[30%] flex md:flex-col gap-3 shrink-0">
        
        {/* Deal Card A: Audio Category feature */}
        <div 
          onClick={() => onSelectCategory('Electronics')}
          className="flex-1 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-xl p-4.5 cursor-pointer relative overflow-hidden flex flex-col justify-between text-left group border border-indigo-850"
        >
          <div className="z-10">
            <span className="text-[10px] font-black uppercase text-yellow-300 tracking-wider">Premium Sound</span>
            <h4 className="text-xs font-black tracking-tight mt-0.5 leading-tight max-w-[120px] group-hover:text-yellow-250">Acoustic Gear 35% Blowout</h4>
          </div>
          <div className="z-10 mt-6 flex justify-between items-center">
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
              Shop Active
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80" 
            alt="Audio promo representation" 
            className="absolute -right-2 -bottom-2 w-20 h-20 md:w-24 md:h-24 object-contain opacity-33 mix-blend-lighten pointer-events-none group-hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Deal Card B: Casual Apparel feature */}
        <div 
          onClick={() => onSelectCategory('Fashion')}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-4.5 cursor-pointer relative overflow-hidden flex flex-col justify-between text-left group"
        >
          <div className="z-10">
            <span className="text-[10px] font-black uppercase text-indigo-650 text-indigo-600 tracking-wider">Smart Apparel</span>
            <h4 className="text-xs font-black text-slate-800 leading-tight mt-0.5 max-w-[130px]">Urban Outerwear & Khakis</h4>
          </div>
          <div className="z-10 mt-6 flex justify-between items-center text-[10px]">
            <span className="font-extrabold text-slate-900 text-[11px]">Starts ₹1,499</span>
            <span className="text-indigo-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              See Selection
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=300&q=80" 
            alt="Apparel representation" 
            className="absolute -right-2 -bottom-2 w-20 h-20 md:w-24 md:h-24 object-contain opacity-25 pointer-events-none group-hover:rotate-3 transition-transform duration-350"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </div>
  );
}
