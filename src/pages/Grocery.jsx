import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Dynamic database of 44 real grocery products split into sub-categories
const productsData = [
  // --- RICE & GRAINS ---
  {
    id: "gr-basmati",
    name: "India Gate Basmati Rice",
    brand: "India Gate",
    category: "grocery",
    type: "rice-grains",
    price: 140,
    originalPrice: 175,
    discount: 20,
    rating: 4.8,
    reviewsCount: 312,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Premium long-grain aged Basmati rice. Extremely aromatic, perfect for biryanis, pulaos, and special occasions.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "gr-sonamasoori",
    name: "Sona Masoori Rice",
    brand: "Safe Harvest",
    category: "grocery",
    type: "rice-grains",
    price: 70,
    originalPrice: 85,
    discount: 17,
    rating: 4.5,
    reviewsCount: 184,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQugxiUltMxziXGRONtcsHWtHHX3IYQ7yoiR1lLIVBzXw&s=10",
    description: "Lightweight and aromatic medium-grain rice. Sourced from standard organic farms, ideal for daily meals.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "gr-ponni",
    name: "Ponni Rice",
    brand: "Ponni Fresh",
    category: "grocery",
    type: "rice-grains",
    price: 65,
    originalPrice: 75,
    discount: 13,
    rating: 4.4,
    reviewsCount: 96,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsPKORrEFsEr3QT0ODo5nveC_lQkgcpd1YUzxoypgv4A&s=10",
    description: "Standard boiled Ponni rice. Easy to digest and widely consumed daily staple across South India.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "gr-brownrice",
    name: "Brown Rice",
    brand: "Organic Tattva",
    category: "grocery",
    type: "rice-grains",
    price: 110,
    originalPrice: 130,
    discount: 15,
    rating: 4.6,
    reviewsCount: 115,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TEP_FrVQOXRxoneCd-tdscAbY-8ixW8ibFP8snHd2w&s=10",
    description: "Nutritious and high-fiber whole brown rice. Retains bran layer for maximum health benefits.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "gr-wheat",
    name: "Premium Lokwan Wheat",
    brand: "Aashirvaad",
    category: "grocery",
    type: "rice-grains",
    price: 50,
    originalPrice: 60,
    discount: 16,
    rating: 4.5,
    reviewsCount: 150,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    description: "Golden lokwan wheat grains sourced from Madhya Pradesh fields. Perfect for grinding fresh flour at home.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "gr-sooji",
    name: "Rava / Sooji",
    brand: "Rajdhani",
    category: "grocery",
    type: "rice-grains",
    price: 45,
    originalPrice: 55,
    discount: 18,
    rating: 4.3,
    reviewsCount: 78,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtGPlDE9ZsANHflUbdvEguuzPtq5-paREasdOdwL4rAA&s=10",
    description: "Coarsely ground semolina (rava). Ideal for preparing healthy breakfasts like upma, halwa, and idlis.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "gr-poha",
    name: "Tata Sampann Poha",
    brand: "Tata Sampann",
    category: "grocery",
    type: "rice-grains",
    price: 55,
    originalPrice: 65,
    discount: 15,
    rating: 4.4,
    reviewsCount: 125,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTvhxCCfkMlQG2Lu3pcv8Cam_qcaP_wZBEU6Rhe1ykGQ&s=10",
    description: "Thick beaten rice flakes. Made from premium paddy, processed cleanly for instant morning breakfasts.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "gr-dalia",
    name: "Organic Wheat Dalia",
    brand: "Organic Tattva",
    category: "grocery",
    type: "rice-grains",
    price: 60,
    originalPrice: 75,
    discount: 20,
    rating: 4.5,
    reviewsCount: 64,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO6GzLN21mfpT2AYryrLdPsxoFm-hYU3fwDT3ieNez4Q&s",
    description: "High-fiber broken wheat dalia. Ideal healthy breakfast option for seniors and fitness enthusiasts.",
    isOrganic: true,
    isBestSeller: false
  },

  // --- COOKING ESSENTIALS ---
  {
    id: "ce-sunflower",
    name: "Fortune Sunflower Oil",
    brand: "Fortune",
    category: "grocery",
    type: "cooking-essentials",
    price: 160,
    originalPrice: 190,
    discount: 15,
    rating: 4.6,
    reviewsCount: 290,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK8dao3xYG7Shc2V8BHyTUS6BDVJnf2Zjs8LRs_77ruQ&s",
    description: "Refined sunflower oil. Low-absorb technology, lightweight and rich in vitamins A, D & E.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "ce-groundnut",
    name: "Cold Pressed Groundnut Oil",
    brand: "Puvi",
    category: "grocery",
    type: "cooking-essentials",
    price: 270,
    originalPrice: 320,
    discount: 15,
    rating: 4.7,
    reviewsCount: 140,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw57-B0cqrXFW-o3cNBlO3JdE8KuuWAozdx5ffmALkpA&s=10",
    description: "Pure wood-pressed groundnut oil. Retains natural nutrients, rich aroma, perfect for frying.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "ce-coconutoil",
    name: "Organic Virgin Coconut Oil",
    brand: "Max Care",
    category: "grocery",
    type: "cooking-essentials",
    price: 350,
    originalPrice: 420,
    discount: 16,
    rating: 4.8,
    reviewsCount: 198,
    weight: "500 ml",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOsPk0HordhVcW3wzknKD9-TriwlvEAhos8tJjcb97UA&s=10",
    description: "100% organic cold-pressed coconut oil. Ideal for baking, raw consumption, cooking, and hair care.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "ce-ghee",
    name: "Amul Pure Cow Ghee",
    brand: "Amul",
    category: "grocery",
    type: "cooking-essentials",
    price: 650,
    originalPrice: 720,
    discount: 9,
    rating: 4.9,
    reviewsCount: 420,
    weight: "1 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGKs7DV4FIIzifkmRK0USgcGVG9y-SA33ZX_4E06MMg&s=10",
    description: "Rich, granular cow ghee prepared cleanly from fresh cream. Essential for Indian sweets, rotis, and rice.",
    isOrganic: false,
    isBestSeller: true
  },


  // --- SPICES & MASALA ---
  {
    id: "sp-turmeric",
    name: "Tata Sampann Turmeric Powder",
    brand: "Tata Sampann",
    category: "grocery",
    type: "spices-masala",
    price: 60,
    originalPrice: 75,
    discount: 20,
    rating: 4.7,
    reviewsCount: 154,
    weight: "200 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtmH9OVnC9QW3KLAqhw99cRnFFW6r-foNmIgOtsjQaRA&s=10",
    description: "Rich in curcumin, naturally sourced turmeric powder. Essential spice for flavor and color.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "sp-chilli",
    name: "Everest Tikhalal Chilli Powder",
    brand: "Everest",
    category: "grocery",
    type: "spices-masala",
    price: 70,
    originalPrice: 85,
    discount: 17,
    rating: 4.6,
    reviewsCount: 182,
    weight: "200 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90WI8UYQ9MxDoVnyZ8Ldm-CuOI61jix6fjF7YC4Hj_A&s=10",
    description: "Fine-ground spicy red chilli powder. Gives vibrant red color and hot flavor to dishes.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "sp-coriander",
    name: "Catch Coriander Powder",
    brand: "Catch",
    category: "grocery",
    type: "spices-masala",
    price: 55,
    originalPrice: 70,
    discount: 21,
    rating: 4.4,
    reviewsCount: 88,
    weight: "200 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCjH0fcbzhD6SMYLbUw4ar60_hRNBElgLDE6C1Gt-kaw&s",
    description: "Aromatic coriander powder made from premium roasted coriander seeds.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "sp-garam",
    name: "Everest Garam Masala",
    brand: "Everest",
    category: "grocery",
    type: "spices-masala",
    price: 85,
    originalPrice: 100,
    discount: 15,
    rating: 4.7,
    reviewsCount: 198,
    weight: "100 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAs8hcNzyDlrht55_erSWzXnlOx2W-AnzyO8fqhhcAGQ&s=10",
    description: "A unique blend of 13 spices. Enhances flavor and aroma of vegetables, pulses, and meats.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "sp-pepper",
    name: "Organic Black Pepper Whole",
    brand: "Organic India",
    category: "grocery",
    type: "spices-masala",
    price: 120,
    originalPrice: 145,
    discount: 17,
    rating: 4.6,
    reviewsCount: 82,
    weight: "100 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiORpioxdG2MuaYXoA8eag8QfgyQZFDBpXM5czkzzpJw&s=10",
    description: "Sun-dried whole organic black peppercorns. Sharp, spicy aroma, rich in piperine.",
    isOrganic: true,
    isBestSeller: false
  },

];

// Reusable local product card component for grocery products page
function LocalProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product, qty);
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

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4.5 right-4.5 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors"
        aria-label="Wishlist toggle"
      >
        {wishlisted ? (
          <FaHeart className="w-4 h-4 text-rose-500 fill-current animate-ping-once" />
        ) : (
          <FaRegHeart className="w-4 h-4" />
        )}
      </button>

      {/* Image Area with hover zoom */}
      <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/20 mb-4 flex items-center justify-center relative">
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
          {product.brand} {product.isOrganic && "• Organic"}
        </span>

        {/* Name */}
        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-tight mb-1 truncate">
          {product.name}
        </h3>

        {/* Short Description */}
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
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Grocery() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter labels
  const filterList = [
    { label: 'All', value: 'All' },
    { label: 'Rice & Grains', value: 'rice-grains' },
    { label: 'Dals & Pulses', value: 'dals-pulses' },
    { label: 'Cooking Essentials', value: 'cooking-essentials' },
    { label: 'Spices & Masala', value: 'spices-masala' },
    { label: 'Packaged Food', value: 'packaged-food' },
    { label: 'Best Sellers', value: 'Best Sellers' },
    { label: 'Offers', value: 'Offers' }
  ];

  // Dynamic filter and search logic
  const filteredProducts = productsData.filter(product => {
    // 1. Search Query filter (matches name, description or brand)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const match =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      if (!match) return false;
    }

    // 2. Chip Filter logic
    switch (activeFilter) {
      case 'rice-grains':
        return product.type === 'rice-grains';
      case 'dals-pulses':
        return product.type === 'dals-pulses';
      case 'cooking-essentials':
        return product.type === 'cooking-essentials';
      case 'spices-masala':
        return product.type === 'spices-masala';
      case 'packaged-food':
        return product.type === 'packaged-food';
      case 'Organic':
        return product.isOrganic;
      case 'Best Sellers':
        return product.isBestSeller;
      case 'Offers':
        return product.discount > 0;
      case 'All':
      default:
        return true;
    }
  });

  const riceGrains = filteredProducts.filter(p => p.type === 'rice-grains');
  const dalsPulses = filteredProducts.filter(p => p.type === 'dals-pulses');
  const cookingEssentials = filteredProducts.filter(p => p.type === 'cooking-essentials');
  const spicesMasala = filteredProducts.filter(p => p.type === 'spices-masala');
  const packagedFood = filteredProducts.filter(p => p.type === 'packaged-food');

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
          { name: 'Grocery' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🛒 Grocery Essentials
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Daily food staples, pure pulses, cooking oils, premium spices, and packaged food items.
        </p>
      </div>

      {/* Control panel: Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
        {/* Dynamic Search Bar */}
        <div className="relative flex-grow max-w-md w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <FaSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search grocery products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-11 pr-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-xl outline-none transition-all shadow-inner focus:border-primary-500 dark:focus:border-primary-500"
          />
        </div>

        {/* Filter Chips List */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {filterList.map(chip => (
            <button
              key={chip.value}
              onClick={() => setActiveFilter(chip.value)}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all duration-200 border cursor-pointer focus:outline-none ${activeFilter === chip.value
                ? 'bg-primary-500 border-primary-500 text-white shadow-md shadow-primary-500/10'
                : 'bg-white/50 border-slate-200/60 text-slate-600 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Lists sections wrapper */}
      <div className="flex flex-col gap-10 mt-6">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeFilter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-12"
            >
              {/* Rice & Grains Section */}
              {riceGrains.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🌾 Rice & Grains
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {riceGrains.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {riceGrains.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Dals & Pulses Section */}
              {dalsPulses.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🍲 Dals & Pulses
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {dalsPulses.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {dalsPulses.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Cooking Essentials Section */}
              {cookingEssentials.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🍳 Cooking Essentials
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {cookingEssentials.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cookingEssentials.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Spices & Masala Section */}
              {spicesMasala.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🌶️ Spices & Masalas
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {spicesMasala.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {spicesMasala.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
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
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Grocery Items Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  We couldn't find any grocery products matching "{searchQuery}" under the "{activeFilter}" filter.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
