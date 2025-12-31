import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="pattern-leaves absolute inset-0" />
      
      <div className="container relative py-12 md:py-20 lg:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            {/* Content */}
            <div className="space-y-6 text-center md:text-left">
              {heroSlides[currentSlide].isAd && (
                <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                  Promo
                </span>
              )}
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <Link to={heroSlides[currentSlide].ctaLink}>
                  <Button size="lg" className="gap-2 bg-gradient-nature text-primary-foreground shadow-lg transition-transform hover:scale-105">
                    {heroSlides[currentSlide].ctaText}
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Lihat Kategori
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full bg-nature-200/50 blur-3xl" />
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="relative z-10 h-64 w-auto animate-float object-contain drop-shadow-2xl md:h-80 lg:h-96"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
