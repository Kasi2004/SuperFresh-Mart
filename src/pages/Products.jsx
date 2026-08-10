import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSortAmountDown, FaFolderOpen, FaTimes } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SkeletonLoader from '../components/SkeletonLoader';
import Pagination from '../components/Pagination';
import { useApp } from '../context/AppContext';

import products from '../data/products.json';
import categories from '../data/categories.json';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Max price helper
  const maxPriceLimit = Math.max(...products.map(p => p.price), 1000);
  
  // Available brands helper
  const availableBrands = [...new Set(products.map(p => p.brand))];

  // Filters state
  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    brands: [],
    price: maxPriceLimit,
    rating: null,
    discount: null
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('best-selling');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Loading skeleton toggle
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { quickViewProduct, setQuickViewProduct } = useApp();

  // Sync category param from URL to state
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        categories: []
      }));
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Sync search param
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParam]);

  // Trigger brief loader skeleton on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    setCurrentPage(1);
    return () => clearTimeout(timer);
  }, [filters, sortBy, searchParam]);

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    // 1. Category check
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    // 2. Brand check
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    // 3. Price check
    if (product.price > filters.price) {
      return false;
    }
    // 4. Rating check
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    // 5. Discount check
    if (filters.discount && product.discount < filters.discount) {
      return false;
    }
    // 6. Search parameter check
    if (searchParam) {
      const q = searchParam.toLowerCase();
      const matches =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'highest-rated':
        return b.rating - a.rating;
      case 'best-selling':
      default:
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    }
  });

  // Calculate Pagination slices
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const getBreadcrumbName = () => {
    if (searchParam) return `Search results for "${searchParam}"`;
    if (categoryParam) {
      const match = categories.find(c => c.slug === categoryParam);
      return match ? match.name : 'Products';
    }
    return 'All Products';
  };

  const handleRemoveCategoryFilter = () => {
    setSearchParams(params => {
      params.delete('category');
      return params;
    });
    setFilters(prev => ({ ...prev, categories: [] }));
  };

  const handleRemoveSearchFilter = () => {
    setSearchParams(params => {
      params.delete('search');
      return params;
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Breadcrumbs */}
      <Breadcrumb paths={[{ name: 'Products', link: '/products' }, { name: getBreadcrumbName() }]} />

      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
            {getBreadcrumbName()}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 uppercase tracking-wide">
            Showing {sortedProducts.length} items found
          </p>
        </div>

        {/* Sort and mobile filter controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <FaFilter className="w-3.5 h-3.5" />
            Filters
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
            <FaSortAmountDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none border-none cursor-pointer pr-1"
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applied filter chips */}
      {(filters.categories.length > 0 || searchParam) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Active:</span>
          {filters.categories.map(slug => (
            <div key={slug} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/20 border border-primary-500/10 text-xs font-bold text-primary-600 dark:text-primary-400">
              <span>Category: {categories.find(c => c.slug === slug)?.name || slug}</span>
              <button onClick={handleRemoveCategoryFilter} className="hover:text-primary-800 p-0.5"><FaTimes className="w-2.5 h-2.5" /></button>
            </div>
          ))}
          {searchParam && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/20 border border-secondary-500/10 text-xs font-bold text-secondary-600 dark:text-secondary-400">
              <span>Search: "{searchParam}"</span>
              <button onClick={handleRemoveSearchFilter} className="hover:text-secondary-800 p-0.5"><FaTimes className="w-2.5 h-2.5" /></button>
            </div>
          )}
        </div>
      )}

      {/* Content layout */}
      <div className="flex gap-8">
        {/* Filter Sidebar (Desktop/Mobile drawer wrapping) */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          brands={availableBrands}
          maxPrice={maxPriceLimit}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Product Grid section */}
        <div className="flex-grow flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader type="product" count={itemsPerPage} />
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </motion.div>

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 my-6 gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <FaFolderOpen className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                    No products matched
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
                    Try adjusting your filters, clearing active tags, or widening your search query.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
