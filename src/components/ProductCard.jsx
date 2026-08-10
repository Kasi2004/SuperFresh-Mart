import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaEye, FaShoppingBag, FaCheck } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Rating from './Rating';

const getCategoryHoverClasses = (category) => {
  if (!category) return 'hover:bg-slate-100/80 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700';
  const cat = category.toLowerCase();
  if (cat.includes('fruit') || cat.includes('veg')) {
    return 'hover:bg-emerald-50/90 dark:hover:bg-emerald-950/20 hover:border-emerald-200/50 dark:hover:border-emerald-800/30';
  }
  if (cat.includes('dairy') || cat.includes('bakery')) {
    return 'hover:bg-blue-50/90 dark:hover:bg-blue-950/20 hover:border-blue-200/50 dark:hover:border-blue-800/30';
  }
  if (cat.includes('snack')) {
    return 'hover:bg-orange-50/90 dark:hover:bg-orange-950/20 hover:border-orange-200/50 dark:hover:border-orange-800/30';
  }
  if (cat.includes('beverage')) {
    return 'hover:bg-purple-50/90 dark:hover:bg-purple-950/20 hover:border-purple-200/50 dark:hover:border-purple-800/30';
  }
  if (cat.includes('clean')) {
    return 'hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:border-slate-300/60 dark:hover:border-slate-700/30';
  }
  return 'hover:bg-amber-50/80 dark:hover:bg-amber-950/10 hover:border-amber-200/50 dark:hover:border-amber-900/30';
};

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={{ 
        y: -10,
        scale: 1.04,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 p-4 flex flex-col h-full relative overflow-hidden group transition-colors duration-300 ${getCategoryHoverClasses(product.category)}`}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] md:text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-md">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 border border-slate-100 dark:border-slate-800 transition-colors shadow-sm focus:outline-none"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wishlisted ? (
          <FaHeart className="w-4 h-4 text-rose-500 fill-current animate-ping-once" />
        ) : (
          <FaRegHeart className="w-4 h-4" />
        )}
      </button>

      {/* Image Area with Zoom */}
      <div
        onClick={(e) => {
          e.preventDefault();
          if (onQuickView) onQuickView(product);
          else setQuickViewProduct(product);
        }}
        className="block relative aspect-square rounded-2xl overflow-hidden bg-slate-100/50 dark:bg-slate-800/30 mb-4 pt-1 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
              else setQuickViewProduct(product);
            }}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-500 hover:text-white"
          >
            <FaEye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
          {product.brand}
        </span>
        <div
          onClick={(e) => {
            e.preventDefault();
            if (onQuickView) onQuickView(product);
            else setQuickViewProduct(product);
          }}
          className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors leading-snug mb-1 block cursor-pointer"
        >
          {product.name}
        </div>

        {/* Rating and Weight row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Rating value={product.rating} text={`${product.rating}`} size="xs" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
            {product.weight}
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-100/50 dark:border-slate-800/40">
          <div className="flex flex-col">
            {product.originalPrice > product.price && (
              <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="font-extrabold text-sm md:text-lg text-slate-800 dark:text-slate-100 leading-none">
              ₹{product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`flex items-center justify-center p-2 md:p-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all focus:outline-none ${
                isAdding
                  ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-slate-100/10'
              }`}
              title={isAdding ? "Added to Cart" : "Add to Cart"}
            >
              {isAdding ? (
                <FaCheck className="w-3.5 h-3.5 text-white animate-bounce" />
              ) : (
                <FaShoppingBag className="w-3.5 h-3.5" />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 py-2 px-3 md:py-2.5 md:px-4 rounded-xl text-xs md:text-sm font-black bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-all focus:outline-none shadow-primary-500/10"
            >
              <span>Order</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
