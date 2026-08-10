import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import CategoryCard from '../components/CategoryCard';
import categories from '../data/categories.json';

export default function Categories() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Breadcrumb navigation */}
      <Breadcrumb paths={[{ name: 'All Categories' }]} />

      {/* Header section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          Supermarket Categories
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
          Choose from our vast collection of organic produce, fresh dairy, household items, grocery essentials, and personal care.
        </p>
      </div>

      {/* Categories Grid layout */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-4"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </motion.section>
    </div>
  );
}
