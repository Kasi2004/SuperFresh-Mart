import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Exactly 10 high-quality snack products
const productsData = [
  {
    id: "snack-chips",
    name: "Classic Potato Chips",
    brand: "Lays",
    category: "snacks",
    price: 40,
    originalPrice: 50,
    discount: 20,
    rating: 4.6,
    reviewsCount: 421,
    weight: "100 g",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    description: "Crispy and light potato chips seasoned with fine salt. Perfect crunchy companion for party snacks or tea-time.",
    specifications: {
      "Pack Type": "Pouch",
      "Shelf Life": "6 Months",
      "Storage": "Keep in a cool, dry airtight place"
    },
    ingredients: ["Potato", "Edible Vegetable Oil", "Salt"]
  },
  {
    id: "snack-popcorn",
    name: "Golden Butter Popcorn",
    brand: "Act II",
    category: "snacks",
    price: 60,
    originalPrice: 80,
    discount: 25,
    rating: 4.5,
    reviewsCount: 184,
    weight: "150 g",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80",
    description: "Crisp and fluffy hot popcorn flavored with rich butter. Perfect for movie nights.",
    specifications: {
      "Type": "Butter Popcorn",
      "Shelf Life": "12 Months",
      "Storage": "Store in a cool dry place"
    },
    ingredients: ["Popping Corn", "Edible Vegetable Fat", "Iodized Salt"]
  },
  {
    id: "snack-salted-biscuits",
    name: "Monaco Salted Biscuits",
    brand: "Britannia",
    category: "snacks",
    price: 28,
    originalPrice: 30,
    discount: 6,
    rating: 4.4,
    reviewsCount: 350,
    weight: "200 g",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    description: "Crispy and light biscuits with a salty touch. Perfect for topping with cheese, veggies, or eating plain with tea.",
    specifications: {
      "Type": "Salted Crackers",
      "Shelf Life": "6 Months",
      "Storage": "Keep in an airtight jar"
    },
    ingredients: ["Wheat Flour", "Vegetable Fat", "Salt", "Raising Agents"]
  },
  {
    id: "snack-cookies",
    name: "Choco Chip Gourmet Cookies",
    brand: "Sunfeast",
    category: "snacks",
    price: 85,
    originalPrice: 100,
    discount: 15,
    rating: 4.7,
    reviewsCount: 240,
    weight: "150 g",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    description: "Rich cookies loaded with real dark chocolate chips. Perfectly baked to a golden crunch, melts in your mouth.",
    specifications: {
      "Flavour": "Chocolate Chip",
      "Shelf Life": "9 Months",
      "Storage": "Store in an airtight container"
    },
    ingredients: ["Wheat Flour", "Chocolate Chips", "Sugar", "Butter"]
  },
  {
    id: "snack-peanuts",
    name: "Classic Roasted Peanuts",
    brand: "Haldiram's",
    category: "snacks",
    price: 72,
    originalPrice: 80,
    discount: 10,
    rating: 4.5,
    reviewsCount: 160,
    weight: "200 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPgrtlosFHD5sX9RqX6pTdrNrkITaP6eheHNpi73eNA&s=10",
    description: "Crunchy, slowly dry-roasted peanuts with a dash of fine salt. Ideal healthy protein-rich snack.",
    specifications: {
      "Type": "Roasted Peanuts",
      "Shelf Life": "6 Months",
      "Storage": "Airtight dry storage"
    },
    ingredients: ["Peanuts", "Common Salt"]
  },
  {
    id: "snack-mixture",
    name: "Kashmiri Mixture",
    brand: "Haldiram's",
    category: "snacks",
    price: 95,
    originalPrice: 110,
    discount: 13,
    rating: 4.8,
    reviewsCount: 420,
    weight: "150 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmzyr4umKKPIai5JtRNf1RVolw2BdGHbhPP51NaHq5HA&s",
    description: "A delicious combination of split green gram, potato sticks, cashews, and traditional Indian spices.",
    specifications: {
      "Type": "Namkeen / Savory Mixture",
      "Shelf Life": "6 Months",
      "Storage": "Store in dry place"
    },
    ingredients: ["Moth Flour", "Cashew Nuts", "Potato", "Spices and Condiments"]
  },
  {
    id: "snack-banana-chips",
    name: "Kerala Banana Chips",
    brand: "Beyond Snack",
    category: "snacks",
    price: 85,
    originalPrice: 100,
    discount: 15,
    rating: 4.7,
    reviewsCount: 290,
    weight: "150 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe1E-ia8ZIA9TTexpowUAbQCbhTiE-IWz4j9E0wLH5QQ&s=10",
    description: "Traditional crispy banana chips prepared from raw Nendran bananas in pure coconut oil.",
    specifications: {
      "Flavor": "Original Salted",
      "Shelf Life": "4 Months",
      "Storage": "Store in a cool dry place"
    },
    ingredients: ["Raw Banana", "Pure Coconut Oil", "Salt"]
  },
  {
    id: "snack-masala-peanuts",
    name: "Spicy Masala Peanuts",
    brand: "Haldiram's",
    category: "snacks",
    price: 45,
    originalPrice: 50,
    discount: 10,
    rating: 4.6,
    reviewsCount: 180,
    weight: "150 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpd2QRFXGQSF6l8yVnU7vA0N2WjbFQ7w8_OqxsPIG3Zg&s=10",
    description: "Tasty peanuts coated with chickpea flour batter and a tangy, spicy masala blend, fried to a crispy texture.",
    specifications: {
      "Type": "Spiced Fried Peanuts",
      "Shelf Life": "6 Months",
      "Storage": "Keep in airtight container"
    },
    ingredients: ["Peanuts", "Gram Flour (Besan)", "Red Chilli Powder", "Amchur"]
  },
  {
    id: "snack-murukku",
    name: "South Indian Murukku",
    brand: "Grand Sweets",
    category: "snacks",
    price: 60,
    originalPrice: 75,
    discount: 20,
    rating: 4.7,
    reviewsCount: 210,
    weight: "200 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdYH0eXVEkIEMLQSmBG0h4st8X173J6d8gQL2esmgqEA&s=10",
    description: "Traditional South Indian crunchy murukku seasoned with butter and sesame seeds. Sourced fresh.",
    specifications: {
      "Type": "Rice Flour Snack",
      "Shelf Life": "3 Months",
      "Storage": "Keep dry and airtight"
    },
    ingredients: ["Rice Flour", "Urad Dal Flour", "White Sesame", "Butter"]
  },
  {
    id: "snack-chocolate-bar",
    name: "Dairy Milk Chocolate",
    brand: "Cadbury",
    category: "snacks",
    price: 70,
    originalPrice: 80,
    discount: 12,
    rating: 4.9,
    reviewsCount: 920,
    weight: "80 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrPqDLru2ljN-G9jtipuQGr650UtF0vDJnmHc4hRp2kiljP7mxW4y9bo&s=10",
    description: "The classic, smooth, and creamy milk chocolate bar made with the goodness of real milk cocoa.",
    specifications: {
      "Flavor": "Milk Chocolate",
      "Shelf Life": "12 Months",
      "Storage": "Store in a cool, dry place"
    },
    ingredients: ["Sugar", "Milk Solids", "Cocoa Butter", "Cocoa Solids"]
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

export default function Snacks() {
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
          { name: 'Snacks' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🍿 Snacks & Savories 🍪
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Crunchy chips, delicious cookies, healthy peanuts, and premium chocolate bars for your tea-time.
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
            placeholder="Search snacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-11 pr-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-xl outline-none transition-all shadow-inner focus:border-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
          Displaying exactly {filteredProducts.length} items
        </div>
      </div>

      {/* Snacks Grid layout */}
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
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Snacks Found</h3>
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
