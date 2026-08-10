import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Exactly 10 high-quality beverage products
const productsData = [
  {
    id: "bev-coke",
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "beverages",
    subCategory: "Soft Drinks",
    price: 40,
    originalPrice: 45,
    discount: 11,
    rating: 4.6,
    reviewsCount: 890,
    weight: "500 ml",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    description: "Refreshingly cold classic Coca-Cola soda. Best served chilled with ice.",
    specifications: {
      "Type": "Carbonated Soft Drink",
      "Shelf Life": "6 Months",
      "Storage": "Store in cool dry place, keep away from direct sunlight"
    },
    ingredients: ["Carbonated Water", "Sugar", "Acidity Regulator", "Caffeine"]
  },
  {
    id: "bev-pepsi",
    name: "Pepsi",
    brand: "Pepsi",
    category: "beverages",
    subCategory: "Soft Drinks",
    price: 38,
    originalPrice: 45,
    discount: 15,
    rating: 4.5,
    reviewsCount: 780,
    weight: "500 ml",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
    description: "Classic carbonated Pepsi soft drink. Delivers a refreshing bold taste.",
    specifications: {
      "Type": "Carbonated Soft Drink",
      "Shelf Life": "6 Months",
      "Storage": "Store in cool dry place"
    },
    ingredients: ["Carbonated Water", "Sugar", "Acidity Regulator", "Caffeine"]
  },
  {
    id: "bev-real-juice",
    name: "Real Fruit Juice",
    brand: "Real",
    category: "beverages",
    subCategory: "Juices",
    price: 110,
    originalPrice: 125,
    discount: 12,
    rating: 4.4,
    reviewsCount: 420,
    weight: "1 L",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
    description: "Premium pasteurized fruit juice, packed with goodness of natural vitamins.",
    specifications: {
      "Type": "Fruit Juice",
      "Shelf Life": "9 Months",
      "Storage": "Refrigerate after opening"
    },
    ingredients: ["Water", "Fruit Concentrate", "Sugar", "Vitamin C"]
  },
  {
    id: "bev-mixed-juice",
    name: "Mixed Fruit Juice",
    brand: "Real",
    category: "beverages",
    subCategory: "Juices",
    price: 115,
    originalPrice: 130,
    discount: 11,
    rating: 4.5,
    reviewsCount: 380,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM3f2JGLLxxE3s__nsHQlx-mGdN6F-pVTd4CmO3dsCBA&s=10",
    description: "Delightful blend of chosen delicious fruits. Rich in fiber and essential vitamins.",
    specifications: {
      "Type": "Mixed Fruit Juice",
      "Shelf Life": "9 Months",
      "Storage": "Refrigerate after opening"
    },
    ingredients: ["Water", "Mixed Fruit Concentrates", "Sugar", "Acidity Regulator"]
  },
  {
    id: "bev-mango-juice",
    name: "Mango Juice",
    brand: "Maaza",
    category: "beverages",
    subCategory: "Juices",
    price: 120,
    originalPrice: 140,
    discount: 14,
    rating: 4.5,
    reviewsCount: 910,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZzBgnyzLirrOf3g4NQ_2NtU_eG4Ep1nlmpyX34P-jA&s=10",
    description: "Delectable Alphonso Mango pulp juice. Thick, sweet, and perfect for summers.",
    specifications: {
      "Type": "Fruit Drink",
      "Shelf Life": "6 Months",
      "Storage": "Serve chilled"
    },
    ingredients: ["Water", "Mango Pulp (19.5%)", "Sugar", "Acidity Regulator"]
  },
  {
    id: "bev-lemon",
    name: "Lemon Drink",
    brand: "Limca",
    category: "beverages",
    subCategory: "Soft Drinks",
    price: 38,
    originalPrice: 45,
    discount: 15,
    rating: 4.3,
    reviewsCount: 260,
    weight: "500 ml",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "Fizzy lime and lemon drink. The ultimate thirst quencher with a citrus kick.",
    specifications: {
      "Type": "Carbonated Lime Drink",
      "Shelf Life": "5 Months",
      "Storage": "Serve ice cold"
    },
    ingredients: ["Carbonated Water", "Sugar", "Lemon Juice Concentrate", "Acidity Regulator"]
  },
  {
    id: "bev-sprite",
    name: "Sprite",
    brand: "Sprite",
    category: "beverages",
    subCategory: "Soft Drinks",
    price: 40,
    originalPrice: 45,
    discount: 11,
    rating: 4.6,
    reviewsCount: 680,
    weight: "500 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcnSxmFqR5msHXTh5t34DUVQrRFcxE98hImJsYCITeQ&s",
    description: "Refreshing clear lemon-lime sparkling soft drink. Crisp, clean taste.",
    specifications: {
      "Type": "Carbonated Soft Drink",
      "Shelf Life": "6 Months",
      "Storage": "Store in a cool dry place"
    },
    ingredients: ["Carbonated Water", "Sugar", "Acidity Regulators"]
  },
  {
    id: "bev-water",
    name: "Packaged Drinking Water",
    brand: "Kinley",
    category: "beverages",
    subCategory: "Water",
    price: 20,
    originalPrice: 20,
    discount: 0,
    rating: 4.8,
    reviewsCount: 1890,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU0f7Pbdj8VLLwBNFc68c2fGz0GgE7vquon-XMizn7Yg&s=10",
    description: "Purified water with added minerals. Safe, crisp, and refreshing drinking water.",
    specifications: {
      "Type": "Purified Mineral Water",
      "Shelf Life": "12 Months",
      "Storage": "Keep in clean, hygienic place"
    },
    ingredients: ["Purified Water", "Magnesium Sulphate", "Potassium Bicarbonate"]
  },
  {
    id: "bev-energy",
    name: "Energy Drink",
    brand: "Red Bull",
    category: "beverages",
    subCategory: "Energy Drinks",
    price: 115,
    originalPrice: 125,
    discount: 8,
    rating: 4.7,
    reviewsCount: 540,
    weight: "250 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKti0GhaAZarUaiTXABbVNMYlMPcKFHqYg60Mhj6_v5g&s=10",
    description: "Functional energy drink formulated to vitalize body and mind. High caffeine.",
    specifications: {
      "Type": "Energy Drink Can",
      "Shelf Life": "12 Months",
      "Storage": "Serve chilled"
    },
    ingredients: ["Carbonated Water", "Sucrose", "Glucose", "Caffeine", "Taurine"]
  },
  {
    id: "bev-coffee",
    name: "Cold Coffee",
    brand: "Nescafe",
    category: "beverages",
    subCategory: "Cold Coffee",
    price: 60,
    originalPrice: 65,
    discount: 7,
    rating: 4.7,
    reviewsCount: 490,
    weight: "180 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMqkmnLEZTK8bQ9XAfvUqR834bCGnAig5wtwbeVl_xA&s=10",
    description: "Creamy, rich ready-to-drink cold coffee. Crafted with premium milk and coffee blend.",
    specifications: {
      "Type": "Milk Beverage",
      "Shelf Life": "6 Months",
      "Storage": "Serve cold"
    },
    ingredients: ["Double Toned Milk", "Sugar", "Coffee Solids"]
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

export default function Beverages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');

  const filters = ["All", "Juices", "Soft Drinks", "Water", "Energy Drinks", "Cold Coffee"];

  // Filter products dynamically by search query and subcategory
  const filteredProducts = productsData.filter(product => {
    // 1. Search Query Match
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // 2. Subcategory Match
    const matchesSubCategory = selectedSubCategory === 'All'
      ? true
      : product.subCategory === selectedSubCategory;

    return matchesSearch && matchesSubCategory;
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
          { name: 'Beverages' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🥤 Beverages & Drinks 💧
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Quench your thirst with soft drinks, fruit juices, packaged mineral water, energizing canned drinks, and cold coffees.
        </p>
      </div>

      {/* Search Input and Subcategory Filter Container */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <FaSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search beverages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-11 pr-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-xl outline-none transition-all shadow-inner focus:border-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
            Displaying exactly {filteredProducts.length} items
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedSubCategory(filter)}
              className={`px-4.5 py-2 text-xs font-bold rounded-xl transition-all outline-none ${selectedSubCategory === filter
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/10'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Beverages Grid layout */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${searchQuery}-${selectedSubCategory}`}
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
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Beverages Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  We couldn't find any drinks matching your filter or search query.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
