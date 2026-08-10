import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function HeroSlider({ banners = [] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const slideCount = banners.length;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, slideCount]);

  if (slideCount === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Framer Motion variants for slide transition
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const activeBanner = banners[current];

  const handleOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: "/categories",
          message: "Please login first to continue your order."
        }
      });
      return;
    }

    navigate("/categories");
  };

  return (
    <div className="relative w-full h-[350px] md:h-[480px] lg:h-[520px] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-lg bg-slate-900">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className={`absolute inset-0 bg-gradient-to-r ${activeBanner.bgGradient} flex flex-col md:flex-row items-center justify-between p-6 md:p-12 lg:p-16 gap-6`}
        >
          {/* Text Area */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left text-white max-w-xl z-10">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3 md:mb-4"
            >
              {activeBanner.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-6 md:mb-8 leading-relaxed max-w-lg"
            >
              {activeBanner.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start w-full sm:w-auto"
            >
              <Link
                to="/products"
                className="w-full sm:w-auto text-center px-6 py-3 md:px-8 md:py-3.5 bg-secondary-500 hover:bg-secondary-600 active:scale-95 text-slate-900 font-extrabold rounded-2xl shadow-lg shadow-black/10 transition-all text-xs md:text-sm tracking-wider uppercase"
              >
                {activeBanner.buttonText}
              </Link>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrder}
                className="w-full sm:w-auto text-center px-6 py-3 md:px-8 md:py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-extrabold rounded-2xl shadow-lg transition-all text-xs md:text-sm tracking-wider uppercase focus:outline-none border border-slate-200/20 cursor-pointer"
              >
                Order Now
              </motion.button>
            </motion.div>
          </div>

          {/* Image Area */}
          <div className="flex-1 w-full h-1/2 md:h-full relative overflow-hidden flex items-center justify-center md:justify-end">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={activeBanner.image}
              alt={activeBanner.title}
              className="w-full max-w-[320px] md:max-w-md lg:max-w-lg aspect-[4/3] object-cover rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav Arrows */}
      {slideCount > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/10 hover:scale-105 transition-all shadow-md focus:outline-none cursor-pointer"
            aria-label="Previous Slide"
          >
            <FaChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/10 hover:scale-105 transition-all shadow-md focus:outline-none cursor-pointer"
            aria-label="Next Slide"
          >
            <FaChevronRight className="w-3.5 h-3.5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                current === index ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
