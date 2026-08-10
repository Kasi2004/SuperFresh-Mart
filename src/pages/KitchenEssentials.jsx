import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Dynamic database of 42 real kitchen products split into sub-categories
const productsData = [
  // --- COOKWARE ---
  {
    id: "kt-pan",
    name: "Non-Stick Frying Pan",
    brand: "Prestige",
    category: "kitchen-essentials",
    type: "cookware",
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.5,
    reviewsCount: 142,
    weight: "28 cm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkCvzUWhNhYnKAe5x6ccm-WrogKyCKsQlWi7qSstwBRw&s",
    description: "Durable non-stick frying pan with ergonomic cool-touch handle. Perfect for sautéing and shallow frying.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "kt-kadai",
    name: "Non-Stick Kadai with Lid",
    brand: "Pigeon",
    category: "kitchen-essentials",
    type: "cookware",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.4,
    reviewsCount: 96,
    weight: "2.5 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuCoVa4f0Xfjbsnauot7yFeMWpqghR8gZY2bAHQVyZgw&s=10",
    description: "Deep non-stick kadai with glass lid. Ideal for preparing traditional curries and deep frying.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "kt-cooker",
    name: "Classic Pressure Cooker",
    brand: "Hawkins",
    category: "kitchen-essentials",
    type: "cookware",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.7,
    reviewsCount: 220,
    weight: "3 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvoLDwK4QOrldfsGajEuF75gHdBN0zVShI-JEXrl-c-Q&s=10",
    description: "Classic inner-lid aluminium pressure cooker. Fast and fuel-efficient cooking for pulses and rice.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "kt-saucepan",
    name: "Stainless Steel Sauce Pan",
    brand: "Prestige",
    category: "kitchen-essentials",
    type: "cookware",
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.3,
    reviewsCount: 68,
    weight: "1.5 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqwp_2FUSa5ZIrETMWOUCHpFZPzKbcNuT5FZ54tEgGg&s=10",
    description: "Induction-compatible stainless steel sauce pan. Ideal for boiling milk, making tea, or cooking sauces.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "kt-tawa",
    name: "Non-Stick Flat Tawa",
    brand: "Pigeon",
    category: "kitchen-essentials",
    type: "cookware",
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.4,
    reviewsCount: 110,
    weight: "25 cm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvdwWatf1mdvTwmGo2bq8nEwfvnWeIiE6OEow8PyOIg&s",
    description: "Heavy gauge flat tawa with scratch-resistant coating. Perfect for making crispy dosas and rotis.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "kt-pot",
    name: "Stainless Steel Cooking Pot",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "cookware",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.5,
    reviewsCount: 88,
    weight: "4 L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1PtpA0vrk8YyscGTrb8e7Ix6M5i2GwKK5eUwZhNy-w&s=10",
    description: "Premium heavy-bottom cooking pot with stainless steel lid. Uniform heat distribution.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "kt-sspan",
    name: "Stainless Steel Fry Pan",
    brand: "Vinod",
    category: "kitchen-essentials",
    type: "cookware",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.6,
    reviewsCount: 54,
    weight: "22 cm",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzmEbphxeBhcLh-rDEE4HAeghaKjNUeDbCXlo7mlU5NA&s=10",
    description: "Tri-ply stainless steel fry pan. High durability, handles high temperature cooking easily.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "kt-idli",
    name: "Stainless Steel Idli Cooker",
    brand: "Pigeon",
    category: "kitchen-essentials",
    type: "cookware",
    price: 999,
    originalPrice: 1399,
    discount: 28,
    rating: 4.4,
    reviewsCount: 76,
    weight: "4 Plates",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGAO7kG3DHO0IRQW7JOgwUe5yLtNstnVMFMjSeHqWAQ&s=10",
    description: "Makes up to 16 soft idlis. Sturdy handles, whistles when steam is fully generated.",
    isOrganic: false,
    isBestSeller: false
  },

  // --- KITCHEN TOOLS ---
  {
    id: "tl-knives",
    name: "Professional Knife Set",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.5,
    reviewsCount: 165,
    weight: "3 Pieces",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN24yVyJ4Px--KdftPMpFz7vihV2_z_0BKow1HiqyiwQ&s=10",
    description: "Includes Chef's knife, utility knife, and paring knife. Sharp stainless steel blades.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "tl-peeler",
    name: "Ergonomic Vegetable Peeler",
    brand: "Pigeon",
    category: "kitchen-essentials",
    type: "tools",
    price: 99,
    originalPrice: 149,
    discount: 33,
    rating: 4.2,
    reviewsCount: 112,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3IhZ5_7q0OHa5w0jp7CGq2qM1Ve43VBnHgIOCbx85g&s",
    description: "Dual action rotating blade peeler. Easily peels potatoes, cucumbers, and apples.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "tl-grater",
    name: "Multi-purpose 4-in-1 Grater",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.3,
    reviewsCount: 84,
    weight: "4-in-1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1iHANlFP35zeX9QGdvrUefBLCOaaFJ0dl6Ed1yQNYA&s=10",
    description: "Four sides for fine, medium, coarse grating, and slicing. Non-slip rubber base.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "tl-board",
    name: "Wooden Chopping Board",
    brand: "Milton",
    category: "kitchen-essentials",
    type: "tools",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    reviewsCount: 190,
    weight: "Wooden",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQeUHgbZ0SmQZSS8juAz87nDFKeVRVRTvWaB9QC0a6A&s=10",
    description: "Premium eco-friendly acacia wood cutting board. Heavy duty and gentle on knives.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "tl-scissors",
    name: "Multi-functional Scissors",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 149,
    originalPrice: 249,
    discount: 40,
    rating: 4.4,
    reviewsCount: 78,
    weight: "Stainless Steel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDf1NRykfgMGqTxjyIx7h_B0yGxA_m9YFyPy-lqOysUA&s=10",
    description: "Sharp utility shears. Cuts packets, herbs, and cardboard easily. Features integrated bottle opener.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "tl-lemon",
    name: "Heavy Duty Lemon Squeezer",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 129,
    originalPrice: 199,
    discount: 35,
    rating: 4.3,
    reviewsCount: 65,
    weight: "Heavy Duty",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwF5gNMv9GZcTzEUgNeDmzf4XOFGypmdlMYXsaOAVM4w&s",
    description: "Sturdy stainless steel lemon squeezer. Extracts maximum juice while separating seeds.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "tl-cups",
    name: "Baking Measuring Cups",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.5,
    reviewsCount: 128,
    weight: "4 Cups Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OuhKgVcK6M7QJWJIMRZP0vvGdwFiyWCdBDyKqi_cfQ&s=10",
    description: "Plastic food-grade measuring cups (1, 1/2, 1/3, 1/4 Cup). Essential tool for precise baking.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "tl-spoons",
    name: "Measuring Spoons Set",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "tools",
    price: 99,
    originalPrice: 149,
    discount: 33,
    rating: 4.4,
    reviewsCount: 74,
    weight: "5 Spoons Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVRhyKAC2y-83LwpqegHqT_D-jrUeysXMpyCzQyKZDDg&s=10",
    description: "Includes sizes from 1/4 tsp up to 1 tbsp. Interlocked loop for neat kitchen organization.",
    isOrganic: false,
    isBestSeller: false
  },

  // --- STORAGE ---
  {
    id: "st-boxes",
    name: "Food Storage Container Set",
    brand: "Cello",
    category: "kitchen-essentials",
    type: "storage",
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.5,
    reviewsCount: 184,
    weight: "6 Pieces Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrOIdczW_Nd-P70pIEg70VinL1oIcXJo9gxA1Pb1cZA&s=10",
    description: "BPA-free microwave-safe storage containers. Ideal for carrying lunch or refrigerating leftovers.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "st-spicejar",
    name: "Spice Dispenser Jar Set",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "storage",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.4,
    reviewsCount: 95,
    weight: "12 Jars Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp12tYUH990I6lRmwH9LZJShULO50fyN6JFj1Lo-Sucg&s",
    description: "Sleek rotatable spice jars. Keep spices dry and easily accessible on kitchen counters.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "st-ricebox",
    name: "Rice & Grain Storage Box",
    brand: "Cello",
    category: "kitchen-essentials",
    type: "storage",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.3,
    reviewsCount: 65,
    weight: "10 kg Capacity",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRhd1a8gSOcPQVHk_o24lxx5SieS3uzufAe8k2BDZNA&s=10",
    description: "Heavy-duty plastic grain storage box. Dust-proof, moisture-proof, with measurement cup.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "st-lunch",
    name: "Stainless Steel Lunch Box",
    brand: "Milton",
    category: "kitchen-essentials",
    type: "storage",
    price: 450,
    originalPrice: 550,
    discount: 18,
    rating: 4.6,
    reviewsCount: 130,
    weight: "3 Steel Tiffins",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0ZupIwKj0T2KIFpC5Nru11Rbx9JUZHqV-tVxSk4Glg&s=10",
    description: "Insulated carry bag with three leak-proof stainless steel bowls. Keeps office lunch warm.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "st-bottle",
    name: "Pet Water Bottles",
    brand: "Cello",
    category: "kitchen-essentials",
    type: "storage",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.4,
    reviewsCount: 88,
    weight: "3 Pieces Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBA4ShUO1DLkiS6MB6k9U5O5u4iYWXEJl-eahjNtZ6g&s=10",
    description: "Leak-proof BPA-free water bottles. Sleek and fits inside standard refrigerator door racks.",
    isOrganic: false,
    isBestSeller: false
  },

  // --- CLEANING ---
  {
    id: "cl-sponge",
    name: "Cellulose Scrub Sponge",
    brand: "Scotch-Brite",
    category: "kitchen-essentials",
    type: "cleaning",
    price: 60,
    originalPrice: 75,
    discount: 20,
    rating: 4.7,
    reviewsCount: 290,
    weight: "3 Pieces Pack",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSaHVBcKS_sqPTZScB9QXgYK6fwpa_2cGGT0X6JoFcyQ&s=10",
    description: "Absorbent scrub sponge. Heavy-duty scrub side, soft cellulose side for delicate plates.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "cl-brush",
    name: "Kitchen Bottle Brush",
    brand: "Scotch-Brite",
    category: "kitchen-essentials",
    type: "cleaning",
    price: 99,
    originalPrice: 125,
    discount: 20,
    rating: 4.5,
    reviewsCount: 94,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjhoSefqXWwmKuWN7TzWQjDJs5CYilgHeGMm_GuUy6A&s",
    description: "Long handle flexible bottle cleaning brush. Reaches deep corners of flasks and narrow bottles.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "cl-cloth",
    name: "Microfiber Cleaning Cloth",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "cleaning",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.6,
    reviewsCount: 140,
    weight: "5 Microfiber Cloths",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSszmG0p83GMqoVVQovSreV1rN3RIAaAPCOl8chMwIo3w&s=10",
    description: "Highly absorbent dusters. Leaves kitchen platform, glass, and stove clean without scratches.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "cl-gloves",
    name: "Silicone Kitchen Gloves",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "cleaning",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.3,
    reviewsCount: 68,
    weight: "Silicone Pair",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTiafjaQ8P3vwVlMuomngcp2J-4o8LHIBEn3o6a5hQg&s",
    description: "Heat-resistant gloves with scrub bristles on palms. Multi-purpose kitchen cleaning.",
    isOrganic: false,
    isBestSeller: false
  },

  // --- ACCESSORIES ---
  {
    id: "ac-rack",
    name: "Stainless Steel Spice Rack",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "accessories",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.5,
    reviewsCount: 115,
    weight: "2-Tier Stand",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcxGNPb8ebNvCh3Z6PufaT8mgVL1ly3mBq8KpYrb-nQ&s=10",
    description: "Anti-rust chrome coated kitchen organizer shelf. Neatly holds jars and canisters.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "ac-cutlery",
    name: "Stainless Steel Cutlery Set",
    brand: "Cello",
    category: "kitchen-essentials",
    type: "accessories",
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.6,
    reviewsCount: 96,
    weight: "24 Pieces Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbZ58PXixMTVDrvThfHR0WTWPTPc6bcKpJJ20eOm9Ugg&s",
    description: "Includes spoons, forks, butter knives, and tea spoons with a modern dining stand.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "ac-plates",
    name: "La Opala Dinner Plates Set",
    brand: "La Opala",
    category: "kitchen-essentials",
    type: "accessories",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.7,
    reviewsCount: 164,
    weight: "6 Dinner Plates",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsfN32rK4Vm8h93VSq-D-MBQWWeBgKxTkWluLHL28OcQ&s=10",
    description: "Premium opal glass dinner plates. Break-resistant, microwave-safe, scratch-resistant elegant design.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "ac-bowls",
    name: "La Opala Serving Bowls",
    brand: "La Opala",
    category: "kitchen-essentials",
    type: "accessories",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.6,
    reviewsCount: 84,
    weight: "6 Veg Bowls",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkDTSQqZ6vU_DVBN22bilFuJQ2AX-qTDc6XAVuxKArrw&s=10",
    description: "Elegant white opal glass bowls. Perfect for serving soups, vegetables, and desserts.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "ac-glasses",
    name: "Glass Tumbler Set",
    brand: "Cello",
    category: "kitchen-essentials",
    type: "accessories",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.5,
    reviewsCount: 110,
    weight: "6 Tumblers Set",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdf--9PYDwyO0fl6kp1txY6GjMl6eYDrf-Wqu6lOJOw&s",
    description: "Thick glass water tumblers. Dishwasher-safe, transparent, classic design for home hospitality.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "ac-forks",
    name: "Stainless Steel Dinner Forks",
    brand: "Solimo",
    category: "kitchen-essentials",
    type: "accessories",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.5,
    reviewsCount: 88,
    weight: "6 Dessert Forks",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GtHl_1Uemo1Yk7836xgt3oX_Zvzbmo4VyboJugLA3g&s=10",
    description: "Highly durable stainless steel dinner forks. Matches standard cutlery perfectly.",
    isOrganic: false,
    isBestSeller: false
  },
];

// Reusable local product card component for kitchen essentials category page
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
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-tight mb-1 truncate">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-grow">
          {product.description}
        </p>

        {/* Rating and Weight/Capacity row */}
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

export default function KitchenEssentials() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter labels
  const filterList = [
    { label: 'All', value: 'All' },
    { label: 'Cookware', value: 'cookware' },
    { label: 'Kitchen Tools', value: 'tools' },
    { label: 'Storage', value: 'storage' },
    { label: 'Cleaning', value: 'cleaning' },
    { label: 'Kitchen Accessories', value: 'accessories' },
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
      case 'cookware':
        return product.type === 'cookware';
      case 'tools':
        return product.type === 'tools';
      case 'storage':
        return product.type === 'storage';
      case 'cleaning':
        return product.type === 'cleaning';
      case 'accessories':
        return product.type === 'accessories';
      case 'Best Sellers':
        return product.isBestSeller;
      case 'Offers':
        return product.discount > 0;
      case 'All':
      default:
        return true;
    }
  });

  const cookware = filteredProducts.filter(p => p.type === 'cookware');
  const tools = filteredProducts.filter(p => p.type === 'tools');
  const storage = filteredProducts.filter(p => p.type === 'storage');
  const cleaning = filteredProducts.filter(p => p.type === 'cleaning');
  const accessories = filteredProducts.filter(p => p.type === 'accessories');

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
          { name: 'Kitchen Essentials' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🍳 Kitchen Essentials
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Premium cookware, kitchen tools, food storage organizers, kitchen cleaning aids, and dining accessories.
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
            placeholder="Search kitchen essentials..."
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
              {/* Cookware Section */}
              {cookware.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🍳 Cookware
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {cookware.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cookware.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Kitchen Tools Section */}
              {tools.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🔪 Kitchen Tools
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {tools.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tools.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Storage Section */}
              {storage.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🥣 Kitchen Storage
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {storage.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {storage.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Cleaning Section */}
              {cleaning.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🧹 Kitchen Cleaning
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {cleaning.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cleaning.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Accessories Section */}
              {accessories.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🫙 Kitchen Accessories
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {accessories.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {accessories.map(product => (
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
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Kitchen Essentials Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  We couldn't find any products matching "{searchQuery}" under the "{activeFilter}" filter.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
