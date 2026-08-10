import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaAppleAlt,
  FaShoppingBasket,
  FaCheese,
  FaCookie,
  FaCoffee,
  FaSnowflake,
  FaBreadSlice,
  FaPumpSoap,
  FaBroom,
  FaBaby,
  FaDog,
  FaUtensils
} from 'react-icons/fa';

const iconMap = {
  FaAppleAlt,
  FaShoppingBasket,
  FaCheese,
  FaCookie,
  FaCoffee,
  FaSnowflake,
  FaBreadSlice,
  FaPumpSoap,
  FaBroom,
  FaBaby,
  FaDog,
  FaUtensils
};

export default function CategoryCard({ category }) {
  const IconComponent = iconMap[category.icon] || FaShoppingBasket;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="h-full"
    >
      <Link
        to={
          category.slug === 'fruits-vegetables' ? '/fruits-vegetables' :
          category.slug === 'grocery' ? '/grocery' :
          category.slug === 'kitchen-essentials' ? '/kitchen-essentials' :
          category.slug === 'dairy' ? '/dairy' :
          category.slug === 'snacks' ? '/snacks' :
          category.slug === 'beverages' ? '/beverages' :
          category.slug === 'frozen-foods' ? '/frozen-foods' :
          category.slug === 'bakery' ? '/bakery' :
          category.slug === 'personal-care' ? '/personal-care' :
          category.slug === 'home-cleaning' ? '/home-cleaning' :
          category.slug === 'baby-care' ? '/baby-care' :
          category.slug === 'pet-care' ? '/pet-care' :
          `/products?category=${category.slug}`
        }
        className="flex flex-col h-full items-center text-center p-6 rounded-3xl glass-card border border-slate-100/50 dark:border-slate-800/40 relative overflow-hidden group"
      >
        {/* Glow decoration */}
        <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${category.bgColor} opacity-30 blur-2xl group-hover:scale-150 transition-all duration-500`} />

        {/* Circular Icon Wrapper */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${category.bgColor} mb-4 border border-white/50 dark:border-slate-800 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
          <IconComponent className={`w-6 h-6 ${category.textColor} transition-transform duration-300 group-hover:rotate-12`} />
        </div>

        {/* Text Details */}
        <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-base md:text-lg mb-2">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>

        {/* Subtle arrow indicator */}
        <span className="text-[10px] uppercase font-bold tracking-wider text-primary-500 dark:text-primary-400 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Browse items →
        </span>
      </Link>
    </motion.div>
  );
}
export { iconMap };
