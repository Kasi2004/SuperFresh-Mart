import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import products from '../data/products.json';

const placeholders = [
  "Search for fresh apples...",
  "Search for milk & butter...",
  "Search for crunchy snacks...",
  "Search for cold beverages...",
  "Search for cleaning sprays...",
  "Search for organic spinach...",
  "Search for kitchen staples..."
];

export default function SearchBar() {
  const { setSearchQuery, setQuickViewProduct } = useApp();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Cycle placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const query = input.toLowerCase().trim();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    ).slice(0, 5); // Max 5 recommendations

    setSuggestions(filtered);
  }, [input]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setSearchQuery(input);
    setShowDropdown(false);
    navigate(`/products?search=${encodeURIComponent(input.trim())}`);
  };

  const handleSuggestionClick = (product) => {
    setInput('');
    setShowDropdown(false);
    setQuickViewProduct(product);
  };

  const handleClear = () => {
    setInput('');
    setSuggestions([]);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          aria-label="Search for products"
          className="w-full glass-input pl-12 pr-24 py-2.5 md:py-3 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 shadow-inner"
        />

        {/* Animated scrolling placeholder */}
        {!input && (
          <div className="absolute left-12 right-14 top-1/2 -translate-y-1/2 h-5 overflow-hidden pointer-events-none text-xs md:text-sm font-medium text-slate-400 dark:text-slate-500">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 top-0 block w-full text-left whitespace-nowrap"
              >
                {placeholders[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        
        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 md:py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-bold transition-all focus:outline-none"
        >
          Go
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 glass-card rounded-2xl border border-slate-100/80 dark:border-slate-800/80 shadow-xl overflow-hidden py-2 max-h-[360px] overflow-y-auto">
          <div className="px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Suggested Products
          </div>
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className="w-full px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-3 text-left transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-800"
              />
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200">
                  {product.name}
                </span>
                <span className="text-[10px] text-primary-600 dark:text-primary-400 font-semibold uppercase">
                  {product.brand} • {product.weight}
                </span>
              </div>
              <span className="ml-auto font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-100">
                ₹{product.price}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
