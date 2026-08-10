import React from 'react';
import { FaTimes, FaStar, FaUndo } from 'react-icons/fa';

export default function FilterSidebar({
  filters,
  setFilters,
  categories = [],
  brands = [],
  maxPrice = 1000,
  isOpen = false,
  onClose
}) {
  const handleCategoryToggle = (categorySlug) => {
    setFilters(prev => {
      const active = prev.categories.includes(categorySlug)
        ? prev.categories.filter(c => c !== categorySlug)
        : [...prev.categories, categorySlug];
      return { ...prev, categories: active };
    });
  };

  const handleBrandToggle = (brandName) => {
    setFilters(prev => {
      const active = prev.brands.includes(brandName)
        ? prev.brands.filter(b => b !== brandName)
        : [...prev.brands, brandName];
      return { ...prev, brands: active };
    });
  };

  const handlePriceChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setFilters(prev => ({ ...prev, price: val }));
  };

  const handleRatingSelect = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const handleDiscountSelect = (discount) => {
    setFilters(prev => ({
      ...prev,
      discount: prev.discount === discount ? null : discount
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      price: maxPrice,
      rating: null,
      discount: null
    });
  };

  const sidebarContent = (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
          Filters
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
            title="Reset Filters"
          >
            <FaUndo className="w-2.5 h-2.5" />
            Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Accordion */}
      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Categories
        </h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => handleCategoryToggle(cat.slug)}
                className="w-4.5 h-4.5 rounded text-primary-500 border-slate-300 focus:ring-primary-500 dark:bg-slate-900 dark:border-slate-800"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands Accordion */}
      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Brands
        </h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4.5 h-4.5 rounded text-primary-500 border-slate-300 focus:ring-primary-500 dark:bg-slate-900 dark:border-slate-800"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Max Price (₹{filters.price})
        </h4>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.price}
            onChange={handlePriceChange}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Rating Selection */}
      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Customer Rating
        </h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((num) => (
            <button
              key={num}
              onClick={() => handleRatingSelect(num)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left border text-sm font-semibold transition-all ${
                filters.rating === num
                  ? 'border-primary-500 bg-primary-500/5 text-primary-600 dark:text-primary-400'
                  : 'border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center text-amber-400">
                <FaStar className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>{num} Star & Above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Discount Selection */}
      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Discount Percentage
        </h4>
        <div className="flex flex-col gap-2">
          {[20, 15, 10, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleDiscountSelect(num)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-left border text-sm font-semibold transition-all ${
                filters.discount === num
                  ? 'border-primary-500 bg-primary-500/5 text-primary-600 dark:text-primary-400'
                  : 'border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>{num}% Off or More</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 h-fit sticky top-24 shrink-0 shadow-sm">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Mobile drawer slide-in */}
      <div
        className={`md:hidden fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-slate-950 z-50 transition-transform duration-300 shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
