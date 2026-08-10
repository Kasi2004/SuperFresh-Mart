import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck, FaSearch, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

// Dynamic database of 26 real products (12 fruits, 14 vegetables)
const productsData = [
  // --- FRUITS ---
  {
    id: "fv-apple",
    name: "Shimla Red Apples",
    brand: "Fresh Farms",
    category: "fruits-vegetables",
    type: "fruit",
    price: 160,
    originalPrice: 200,
    discount: 20,
    rating: 4.7,
    reviewsCount: 128,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    description: "Crisp, sweet Shimla red apples sourced fresh from Himachal orchards. Rich in dietary fiber and antioxidants.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-banana",
    name: "Robusta Bananas",
    brand: "Local Growers",
    category: "fruits-vegetables",
    type: "fruit",
    price: 50,
    originalPrice: 60,
    discount: 16,
    rating: 4.5,
    reviewsCount: 245,
    weight: "1 Dozen",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    description: "Naturally ripened Robusta bananas. Excellent energy booster, rich in potassium and Vitamin B6.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "fv-orange",
    name: "Nagpur Oranges",
    brand: "Citrus Hub",
    category: "fruits-vegetables",
    type: "fruit",
    price: 120,
    originalPrice: 150,
    discount: 20,
    rating: 4.4,
    reviewsCount: 89,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
    description: "Juicy, sweet Nagpur oranges. A great daily source of Vitamin C and hydration.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-mango",
    name: "Alphonso Mangoes",
    brand: "Ratnagiri Farms",
    category: "fruits-vegetables",
    type: "fruit",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.9,
    reviewsCount: 312,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    description: "Premium Ratnagiri Alphonso mangoes. Luscious, sweet, and incredibly rich in flavor.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-grapes",
    name: "Seedless Black Grapes",
    brand: "Grapes Valley",
    category: "fruits-vegetables",
    type: "fruit",
    price: 140,
    originalPrice: 160,
    discount: 12,
    rating: 4.6,
    reviewsCount: 95,
    weight: "500 g",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
    description: "Sweet, juicy, seedless black grapes. Perfect for refreshments, fruit salads, and desserts.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-watermelon",
    name: "Kiran Watermelon",
    brand: "Earth Sourced",
    category: "fruits-vegetables",
    type: "fruit",
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 4.3,
    reviewsCount: 156,
    weight: "1 Piece",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "Fresh Kirans are dark green with smooth skin, juicy red flesh, and sweet flavor. Keeps you cool and refreshed.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-pomegranate",
    name: "Premium Pomegranates",
    brand: "Fresh Farms",
    category: "fruits-vegetables",
    type: "fruit",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.8,
    reviewsCount: 142,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBfu5OynHqhhyjRF_CdYe3uvjol4_medWxTAEcfyrN6Q&s=10",
    description: "Deep red arils packed with nutrients. Rich in antioxidants and heart-healthy compounds.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-papaya",
    name: "Organic Papaya",
    brand: "Green Valley",
    category: "fruits-vegetables",
    type: "fruit",
    price: 70,
    originalPrice: 90,
    discount: 22,
    rating: 4.2,
    reviewsCount: 76,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhPTAkzn3wQU75I0DonjcS40wB-3UCYE_O7MNswEscg&s=10",
    description: "Sweet, pulpy organic papaya. Sourced from organic farms, rich in papain and vitamin A.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-pineapple",
    name: "Queen Pineapple",
    brand: "Tropical Hub",
    category: "fruits-vegetables",
    type: "fruit",
    price: 90,
    originalPrice: 120,
    discount: 25,
    rating: 4.5,
    reviewsCount: 68,
    weight: "1 Piece",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
    description: "Sweet and tangy queen pineapple. Hand-picked at peak ripeness.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-guava",
    name: "Fresh Pink Guava",
    brand: "Fresh Farms",
    category: "fruits-vegetables",
    type: "fruit",
    price: 110,
    originalPrice: 130,
    discount: 15,
    rating: 4.4,
    reviewsCount: 54,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNRNljYSIgAE1GCP-kJxh_2V84fWP800IBG0JYHLg7oA&s=10",
    description: "Fragrant and delicious pink guavas. Excellent high-fiber fruit with vitamin C.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-strawberry",
    name: "Mahabaleshwar Strawberries",
    brand: "Berry Farms",
    category: "fruits-vegetables",
    type: "fruit",
    price: 150,
    originalPrice: 180,
    discount: 16,
    rating: 4.7,
    reviewsCount: 165,
    weight: "200 g",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    description: "Luscious Mahabaleshwar strawberries. Perfect for immediate snacking or adding to milkshakes.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-kiwi",
    name: "Zespri Green Kiwi",
    brand: "Zespri",
    category: "fruits-vegetables",
    type: "fruit",
    price: 120,
    originalPrice: 150,
    discount: 20,
    rating: 4.6,
    reviewsCount: 114,
    weight: "3 Pieces",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNz4CUHLW3U-vK-aNxkVMxfgFvSudryE9MTvG2mtjBqw&s=10",
    description: "Imported fresh Zespri green kiwis. Packed with dietary fiber, vitamin K, and potassium.",
    isOrganic: false,
    isBestSeller: false
  },

  // --- VEGETABLES ---
  {
    id: "fv-tomato",
    name: "Local Hybrid Tomatoes",
    brand: "Local Farms",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 40,
    originalPrice: 50,
    discount: 20,
    rating: 4.5,
    reviewsCount: 220,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ePI6e3Z-ME6OcWMLLTnh6klR02qVKSYQvLbtn3ytpg&s=10",
    description: "Glossy red, firm hybrid tomatoes. Ideal for curries, sauces, salads, and soups.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "fv-potato",
    name: "Fresh Potatoes",
    brand: "Earth Sourced",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 35,
    originalPrice: 45,
    discount: 22,
    rating: 4.4,
    reviewsCount: 340,
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    description: "Versatile starchy potatoes, perfect for frying, baking, boiling, or making curries.",
    isOrganic: false,
    isBestSeller: true
  },
  {
    id: "fv-onion",
    name: "Nasik Red Onions",
    brand: "Indian Agro",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 50,
    originalPrice: 65,
    discount: 23,
    rating: 4.6,
    reviewsCount: 290,
    weight: "1 kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgbJzNcsFhjnw_INNwT4f1_26JNchQLWmRq2yX6WKOA&s=10",
    description: "Crisp and flavorful red onions sourced from Nasik farms. A kitchen essential for global cuisines.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-carrot",
    name: "Ooty Red Carrots",
    brand: "Ooty Organics",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 60,
    originalPrice: 80,
    discount: 25,
    rating: 4.6,
    reviewsCount: 112,
    weight: "500 g",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    description: "Sweet and crunchy carrots sourced fresh from Ooty hills. Ideal for salads, juices, or cooking.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-beans",
    name: "Fresh French Beans",
    brand: "Fresh Farms",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 4.3,
    reviewsCount: 84,
    weight: "500 g",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=80",
    description: "Tender and snap-fresh green French beans, rich in fiber and vitamins.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-cabbage",
    name: "Green Cabbage",
    brand: "Local Farms",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 30,
    originalPrice: 40,
    discount: 25,
    rating: 4.2,
    reviewsCount: 78,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVJqriNdHlw4EAQby_8LOzjEIvUkCRAwv7RDYacF40A&s=10",
    description: "Fresh, compact green cabbages. Great for salads, stir-fries, and coleslaws.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-cauliflower",
    name: "Fresh Cauliflower",
    brand: "Earth Sourced",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 50,
    originalPrice: 60,
    discount: 16,
    rating: 4.4,
    reviewsCount: 135,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixhNS5J1kxhq-GytrqOhZztb-HR-qTMFrr5WLTIuF7A&s=10",
    description: "Tight, clean cauliflower curds. Rich in fiber and highly versatile for vegetarian dishes.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-brinjal",
    name: "Bharta Brinjal",
    brand: "Organic Greens",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 45,
    originalPrice: 55,
    discount: 18,
    rating: 4.1,
    reviewsCount: 62,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBLSpktTjNpsd3tevvZEMZ2GXxV8CGwBP14fwWiGts-Q&s=10",
    description: "Large, glossy purple eggplants. Perfect for roasting and preparing traditional Bharta dishes.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-ladiesfinger",
    name: "Fresh Okra (Bhindi)",
    brand: "Local Farms",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 55,
    originalPrice: 70,
    discount: 21,
    rating: 4.5,
    reviewsCount: 194,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOC6AVN2mHtr332CDbgKSZ70j7Eic3u9fvZuJNASSW4A&s=10",
    description: "Fresh, green bhindi (okra) pods. Highly nutritious, rich in soluble fiber and vitamins.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-capsicum",
    name: "Green Capsicum",
    brand: "Greenhouse Tech",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 70,
    originalPrice: 90,
    discount: 22,
    rating: 4.4,
    reviewsCount: 118,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BhDXvMq8zZ34UuvYkpXU6_TE4g2H5RqccClrAeUFvg&s=10",
    description: "Crisp, thick-walled green bell peppers. Add a fresh crunch to stir-fries, pizzas, and pastas.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-beetroot",
    name: "Organic Beetroot",
    brand: "Ooty Organics",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 40,
    originalPrice: 50,
    discount: 20,
    rating: 4.3,
    reviewsCount: 92,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPDZeaCHqKeo0INgFKPFPMz2fO2H2VlpqZu4IwmQ-_4Q&s=10",
    description: "Deep red, sweet organic beetroots. Highly nutritious root vegetable great for salads and juice.",
    isOrganic: true,
    isBestSeller: false
  },
  {
    id: "fv-spinach",
    name: "Organic Spinach (Palak)",
    brand: "Green Leaf",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 30,
    originalPrice: 40,
    discount: 25,
    rating: 4.8,
    reviewsCount: 215,
    weight: "250 g",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    description: "Freshly harvested organic spinach leaves. Rich in iron, folic acid, and calcium.",
    isOrganic: true,
    isBestSeller: true
  },
  {
    id: "fv-greenpeas",
    name: "Fresh Green Peas",
    brand: "Local Farms",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 90,
    originalPrice: 120,
    discount: 25,
    rating: 4.6,
    reviewsCount: 130,
    weight: "500 g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPnHdSo55QO9k8Y674AxSQTIUJrRfRlPtUjs8AtO8Vw&s=10",
    description: "Freshly podded sweet green peas. Highly nutritious addition to various Indian curries.",
    isOrganic: false,
    isBestSeller: false
  },
  {
    id: "fv-broccoli",
    name: "Green Broccoli",
    brand: "Ooty Organics",
    category: "fruits-vegetables",
    type: "vegetable",
    price: 120,
    originalPrice: 160,
    discount: 25,
    rating: 4.7,
    reviewsCount: 162,
    weight: "1 Piece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTS4TmYSYAaXS50RDx4nWN0AdjmMpWbqaWHOGqtvlsg&s=10",
    description: "Premium green broccoli crowns. Loaded with vitamin C, antioxidants, and dietary fiber.",
    isOrganic: true,
    isBestSeller: true
  }
];

// Local reusable ProductCard component to satisfy exact UI and layout needs of this page
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

export default function FruitsVegetables() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter labels
  const filterList = [
    { label: 'All', value: 'All' },
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Organic', value: 'Organic' },
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
      case 'Fruits':
        return product.type === 'fruit';
      case 'Vegetables':
        return product.type === 'vegetable';
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

  const fruits = filteredProducts.filter(p => p.type === 'fruit');
  const vegetables = filteredProducts.filter(p => p.type === 'vegetable');

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
          { name: 'Fruits & Vegetables' }
        ]}
      />

      {/* Header Banner Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
          🍎 Fruits & Vegetables 🥕
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Fresh, hand-picked produce delivered daily. Sourced directly from local organic farm clusters.
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
            placeholder="Search fruits and vegetables..."
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
              {/* Fruits Section */}
              {fruits.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🍎 Fresh Fruits
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {fruits.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {fruits.map(product => (
                      <LocalProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}

              {/* Vegetables Section */}
              {vegetables.length > 0 && (
                <section className="flex flex-col gap-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      🥕 Fresh Vegetables
                    </h2>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {vegetables.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vegetables.map(product => (
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
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg">No Fresh Produce Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  We couldn't find any fruits or vegetables matching "{searchQuery}" under the "{activeFilter}" filter.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
