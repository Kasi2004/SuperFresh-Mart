import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeart, FaRegHeart, FaPlus, FaMinus, FaShoppingBag, FaStar, FaShareAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Custom Button component with precise coordinates ripple effect
const ButtonWithRipple = ({ onClick, children, className, ...props }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    if (onClick) onClick(event);
  };

  useEffect(() => {
    if (ripples.length === 0) return;
    const lastRipple = ripples[ripples.length - 1];
    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== lastRipple.id));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <motion.button
      whileHover={{ scale: 1.04, boxShadow: '0 8px 20px -6px rgba(0, 0, 0, 0.15)' }}
      whileTap={{ scale: 0.96 }}
      onClick={createRipple}
      className={`relative overflow-hidden transition-all focus:outline-none ${className}`}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </motion.button>
  );
};

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, showToast } = useApp();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const modalRef = useRef(null);
  const originRef = useRef(null);

  // Determine screen width for responsive animations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync state when product opens
  useEffect(() => {
    if (product) {
      setQty(1);
      setRating(product.rating || 5);
      originRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (originRef.current) {
        originRef.current.focus();
        originRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Focus trap, outside click and ESC close
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus the close button or first action
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocus = modalRef.current.querySelector('.close-modal-btn') || modalRef.current.querySelector('button');
        if (firstFocus) firstFocus.focus();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, qty);
    showToast('✓ Added to Cart', 'success');
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 800);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    onClose();
    navigate('/checkout');
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Product link copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy product link', 'error');
    });
  };

  // Generate a mock stock level consistently based on product ID
  const stock = (product.id.split('-')[1] * 7 + 13) % 15 + 3;

  // Stagger variants for details page
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  };

  // Modal animation configurations
  const modalVariants = isMobile
    ? {
        hidden: { y: '100%', opacity: 1 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 24, stiffness: 220 } },
        exit: { y: '100%', opacity: 1, transition: { duration: 0.35, ease: 'easeInOut' } }
      }
    : {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 22, stiffness: 180 } },
        exit: { scale: 0.8, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }
      };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          className="relative w-full h-[92vh] md:h-[600px] lg:h-[680px] max-w-4xl bg-white dark:bg-slate-900 shadow-2xl border-t md:border border-slate-100 dark:border-slate-800/80 z-10 flex flex-col md:flex-row rounded-t-[32px] md:rounded-[32px] overflow-hidden"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="close-modal-btn absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close modal"
          >
            <FaTimes className="w-4 h-4" />
          </motion.button>

          {/* Left Side: Image container */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950/20 relative border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/40 min-h-[260px] md:min-h-0 flex-shrink-0">
            {/* Discount badge */}
            {product.discount > 0 && (
              <span className="absolute top-5 left-5 z-10 px-3.5 py-1 text-xs font-black tracking-wide uppercase bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-full shadow-md">
                {product.discount}% OFF
              </span>
            )}

            {/* Float & Zoom product image */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="max-h-[220px] md:max-h-[360px] object-contain rounded-2xl drop-shadow-xl select-none"
              />
            </motion.div>
          </div>

          {/* Right Side: Info details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto flex-grow h-full"
          >
            {/* Brand */}
            <motion.span
              variants={itemVariants}
              className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-1"
            >
              {product.brand}
            </motion.span>

            {/* Product Name */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight mb-2.5"
            >
              {product.name}
            </motion.h2>

            {/* Rating Stars & Stock */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 mb-4.5"
            >
              {/* Interactive Hover Rating Stars */}
              <div
                className="flex items-center gap-1"
                onMouseLeave={() => setHoveredStar(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.35, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setRating(star);
                      showToast(`You rated this product ${star} stars!`, 'info');
                    }}
                    onMouseEnter={() => setHoveredStar(star)}
                    className="focus:outline-none focus:ring-1 focus:ring-primary-500 rounded"
                    aria-label={`Rate ${star} stars`}
                  >
                    <FaStar
                      className={`w-5 h-5 transition-all duration-200 ${
                        star <= (hoveredStar || rating)
                          ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] fill-current'
                          : 'text-slate-200 dark:text-slate-700'
                      }`}
                    />
                  </motion.button>
                ))}
                <span className="text-xs font-black text-slate-500 dark:text-slate-400 ml-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  {(hoveredStar || rating).toFixed(1)}
                </span>
              </div>

              {/* Reviews count & weight */}
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                ({product.reviewsCount} reviews)
              </span>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl">
                {product.weight}
              </span>
            </motion.div>

            {/* Price Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-baseline gap-3 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800/60"
            >
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-slate-400 dark:text-slate-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                    Save ₹{product.originalPrice - product.price} ({product.discount}% OFF)
                  </span>
                </>
              )}
            </motion.div>

            {/* Stock Level Notification */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-5"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${stock <= 5 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className={`text-xs font-extrabold uppercase tracking-wide ${
                stock <= 5 
                  ? 'text-rose-600 dark:text-rose-400' 
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {stock <= 5 ? `Only ${stock} items left in stock!` : `Available Stock: ${stock} items`}
              </span>
            </motion.div>

            {/* Product Description */}
            <motion.p
              variants={itemVariants}
              className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow"
            >
              {product.description}
            </motion.p>

            {/* Specifications Snippet */}
            {product.specifications && (
              <motion.div
                variants={itemVariants}
                className="bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 mb-6"
              >
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, val]) => (
                    <div key={key} className="truncate">
                      <span className="text-slate-400 dark:text-slate-500 font-normal mr-1">{key}:</span> {val}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Row 1: Quantity Adjuster & Share & Wishlist */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3.5 mb-4"
            >
              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-850">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="w-3 h-3" />
                </motion.button>
                <span className="w-9 text-center font-black text-sm text-slate-800 dark:text-slate-100 select-none">
                  {qty}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(prev => prev + 1)}
                  className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="w-3 h-3" />
                </motion.button>
              </div>

              {/* Wishlist button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  wishlisted
                    ? 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-sm shadow-rose-500/5'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:text-rose-500'
                }`}
                aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                {wishlisted ? <FaHeart className="w-5 h-5 fill-current" /> : <FaRegHeart className="w-5 h-5" />}
              </motion.button>

              {/* Share button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:text-primary-500 transition-all"
                aria-label="Share product link"
              >
                <FaShareAlt className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Action Row 2: Add to Cart & Buy Now Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3.5 mt-auto"
            >
              {/* Add to Cart button with ripple */}
              <ButtonWithRipple
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-3 px-6 text-white rounded-2xl text-sm font-black shadow-md text-center transition-all ${
                  isAdding
                    ? 'bg-emerald-500 shadow-emerald-500/10'
                    : 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/10'
                }`}
              >
                {isAdding ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <FaShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </ButtonWithRipple>

              {/* Buy Now button with ripple */}
              <ButtonWithRipple
                onClick={handleBuyNow}
                className="flex-1 py-3 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-2xl text-sm font-black shadow-md shadow-slate-900/10 dark:shadow-white/5 text-center"
              >
                <span>Buy Now</span>
              </ButtonWithRipple>
            </motion.div>
          </motion.div>
        </motion.div>
    </div>
  );
}
