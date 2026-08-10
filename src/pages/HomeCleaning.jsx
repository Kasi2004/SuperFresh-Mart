import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Exactly 5 high-quality Home Cleaning products
const productsData = [
  {
    id: "hc-floor",
    name: "Floor Cleaner",
    brand: "Lysol",
    category: "home-cleaning",
    price: 149,
    originalPrice: 180,
    discount: 17,
    rating: 4.5,
    reviewsCount: 612,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ArRo2MebXon8OxYMwuSUj_Gft-wlpPm2hVN7z8dT_Q&s",
    description: "Kills 99.9% of germs. Refreshes home floors with a lasting fragrance. Suitable for marble, granite, and tiles.",
    specifications: {
      "Germ Protection": "99.9%",
      "Shelf Life": "24 Months",
      "Surfaces": "Multi-surface"
    },
    ingredients: ["Benzalkonium Chloride", "Fragrance Oils"]
  },
  {
    id: "hc-dishwash",
    name: "Dishwashing Liquid",
    brand: "Vim",
    category: "home-cleaning",
    price: 99,
    originalPrice: 115,
    discount: 13,
    rating: 4.6,
    reviewsCount: 850,
    weight: "500 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXUniyj_bt4vzU3YkshImpy6WmFr1z4J3Plbym0piZSQ&s=10",
    description: "Powerful lemon grease-cutter formula. Cleans tough grease from utensils easily without leaving scratches.",
    specifications: {
      "Flavour": "Lemon",
      "Shelf Life": "24 Months",
      "Type": "Concentrated Liquid"
    },
    ingredients: ["Active Surfactants", "Lemon Extract", "Water"]
  },
  {
    id: "hc-glass",
    name: "Glass Cleaner",
    brand: "Colin",
    category: "home-cleaning",
    price: 85,
    originalPrice: 100,
    discount: 15,
    rating: 4.5,
    reviewsCount: 420,
    weight: "500 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuYkM8equsCKZMndAi-Rg_KvzTlBWQLSI6kzJFTUAXQ&s",
    description: "Provides shine and 2x streak-free clean for glass, mirrors, tabletops, and window panels.",
    specifications: {
      "Type": "Spray Cleaner",
      "Shelf Life": "24 Months",
      "Suited For": "Glass and Shiny Surfaces"
    },
    ingredients: ["Isopropyl Alcohol", "Cleaning Agents", "Fragrance"]
  },
  {
    id: "hc-toilet",
    name: "Toilet Cleaner",
    brand: "Harpic",
    category: "home-cleaning",
    price: 120,
    originalPrice: 145,
    discount: 17,
    rating: 4.7,
    reviewsCount: 920,
    weight: "750 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZrrjDiILqKQNyn1Nkw42H51H_XeqRvGLaB24S1jfPw&s=10",
    description: "Disinfectant toilet cleaner. Removes tough yellow stains, scaling, and kills 99.9% of germs.",
    specifications: {
      "Type": "Liquid Gel",
      "Shelf Life": "24 Months",
      "Germ Protection": "99.9%"
    },
    ingredients: ["Hydrochloric Acid (10.5%)", "Cationic Surfactants", "Fragrance"]
  },
  {
    id: "hc-detergent",
    name: "Laundry Detergent",
    brand: "Surf Excel",
    category: "home-cleaning",
    price: 195,
    originalPrice: 240,
    discount: 18,
    rating: 4.7,
    reviewsCount: 789,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmlBitABEBlzmD587GXmqswHexBdXFN3Bhlr4jVMInA&s=10",
    description: "Advanced liquid detergent that dissolves rapidly in washing machines, removing tough grease or tea stains easily.",
    specifications: {
      "Machine Type": "Front Load & Top Load",
      "Shelf Life": "24 Months",
      "Fragrance": "Fresh Comfort"
    },
    ingredients: ["Anionic Surfactant Blend", "Stain Removing Enzymes", "Perfume"]
  }
];

function LocalProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, setQuickViewProduct, showToast } = useApp();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, qty);
    showToast('✓ Added to Cart', 'success');
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4.5 relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <span className="absolute top-4.5 left-4.5 z-10 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-sm">
          {product.discount}% OFF
        </span>
      )}

      {/* Wishlist Heart Icon button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4.5 right-4.5 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors"
        aria-label="Wishlist toggle"
      >
        {wishlisted ? (
          <FaHeart className="w-4 h-4 text-rose-500 fill-current" />
        ) : (
          <FaRegHeart className="w-4 h-4" />
        )}
      </button>

      {/* Image Area with hover zoom */}
      <div
        onClick={() => setQuickViewProduct(product)}
        className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/20 mb-4 flex items-center justify-center relative cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-grow text-left">
        {/* Brand */}
        <span className="text-[10px] font-extrabold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-0.5">
          {product.brand}
        </span>

        {/* Name */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-tight mb-1 truncate cursor-pointer hover:text-primary-500 transition-colors"
        >
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-grow">
          {product.description}
        </p>

        {/* Rating and Weight row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <FaStar className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-400">
              ({product.reviewsCount})
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-150/40 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/10">
            {product.weight}
          </span>
        </div>

        {/* Price display row */}
        <div className="flex items-baseline gap-2 mb-4 border-t border-slate-100 dark:border-slate-800 pt-3">
          <span className="text-lg font-black text-slate-800 dark:text-slate-100">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Interactive Controls Row: Quantity Selector & Add Button */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Quantity Selector +/- */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-850 shrink-0">
            <button
              onClick={() => setQty(prev => Math.max(1, prev - 1))}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <FaMinus className="w-2.5 h-2.5" />
            </button>
            <span className="w-6 text-center font-black text-xs text-slate-800 dark:text-slate-100 select-none">
              {qty}
            </span>
            <button
              onClick={() => setQty(prev => prev + 1)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
              aria-label="Increase quantity"
            >
              <FaPlus className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Add to Cart button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all focus:outline-none shadow-sm ${isAdding
              ? 'bg-emerald-500 text-white shadow-emerald-500/10'
              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-primary-500/10'
              }`}
          >
            {isAdding ? (
              <>
                <FaCheck className="w-3.5 h-3.5 animate-bounce" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FaShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeCleaning() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by search query
  const filteredProducts = productsData.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Back Button */}
      <div className="flex justify-start mb-2">
        <motion.button
          whileHover={{
            scale: 1.03,
            x: -2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm focus:outline-none group cursor-pointer"
        >
          <span className="transform transition-transform duration-300 group-hover:-translate-x-1 inline-block">
            ←
          </span>
          <span>Back</span>
        </motion.button>
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        paths={[
          { name: 'Categories', link: '/categories' },
          { name: 'Home Cleaning' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🧹 Home Cleaning & Hygiene 🧽
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Freshness for your home with premium floor cleaners, dish liquids, spray glass cleaners, and laundry detergents.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
        <div className="relative flex-grow max-w-md w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <FaSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search home cleaning products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-11 pr-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-xl outline-none transition-all shadow-inner focus:border-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
          Displaying exactly {filteredProducts.length} items
        </div>
      </div>

      {/* Home Cleaning Grid layout */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map(product => (
                <LocalProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-16 glass-card rounded-[32px] border border-slate-150/40 dark:border-slate-800/40 text-center gap-4 my-8"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400">
                <FaSearch className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Cleaning Products Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  We couldn't find any products matching "{searchQuery}".
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
