import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PremiumHoverText({ children, className = "", active = false }) {
  const [isTouch, setIsTouch] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Detect touchscreen devices
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouch) {
    return (
      <span className={`inline-block transition-all duration-150 active:scale-95 active:text-primary-500 dark:active:text-primary-400 ${className}`}>
        {children}
      </span>
    );
  }

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    
    const maxDist = 6; // max pull offset in pixels
    const pullX = (x / (rect.width / 2)) * maxDist;
    const pullY = (y / (rect.height / 2)) * maxDist;
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.span
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.08 : 1,
        textShadow: isHovered 
          ? "0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)" 
          : "0 0 0px rgba(0,0,0,0)",
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        mass: 0.8
      }}
    >
      <span className={`transition-colors duration-300 ${isHovered ? 'text-primary-500 dark:text-primary-400' : ''}`}>
        {children}
      </span>
      {/* Underline left-to-right animation */}
      <span 
        className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary-500 dark:bg-primary-400 rounded-full origin-left transition-transform duration-300 ease-out pointer-events-none ${
          active || isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </motion.span>
  );
}
