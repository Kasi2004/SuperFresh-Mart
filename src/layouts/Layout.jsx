import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Toast from '../components/Toast';
import QuickViewModal from '../components/QuickViewModal';

const getCategoryGradients = (category, isDark) => {
  if (!category) {
    return isDark
      ? { start: '#020617', end: '#0f172a' }
      : { start: '#f8fafc', end: '#f1f5f9' };
  }
  const cat = category.toLowerCase();
  if (cat.includes('fruit') || cat.includes('veg')) {
    return isDark
      ? { start: '#0b2619', end: '#1c4530' }
      : { start: '#E8F5E9', end: '#C8E6C9' };
  }
  if (cat.includes('dairy') || cat.includes('bakery')) {
    return isDark
      ? { start: '#0c223a', end: '#1b3654' }
      : { start: '#E3F2FD', end: '#BBDEFB' };
  }
  if (cat.includes('snack')) {
    return isDark
      ? { start: '#30180a', end: '#472614' }
      : { start: '#FFF3E0', end: '#FFE0B2' };
  }
  if (cat.includes('beverage')) {
    return isDark
      ? { start: '#1d0c29', end: '#331749' }
      : { start: '#F3E5F5', end: '#E1BEE7' };
  }
  if (cat.includes('clean')) {
    return isDark
      ? { start: '#171b21', end: '#272d36' }
      : { start: '#ECEFF1', end: '#CFD8DC' };
  }
  return isDark
    ? { start: '#0f141c', end: '#202835' }
    : { start: '#f1f5f9', end: '#e2e8f0' };
};

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, quickViewProduct, setQuickViewProduct } = useApp();
  const routerLocation = useLocation();

  const isDark = theme === 'dark';
  const gradients = getCategoryGradients(quickViewProduct?.category, isDark);

  return (
    <motion.div
      style={{
        '--bg-start': gradients.start,
        '--bg-end': gradients.end,
        background: `linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%)`,
      }}
      animate={{
        '--bg-start': gradients.start,
        '--bg-end': gradients.end,
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300"
    >
      
      {/* Header & Navigation */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      {/* Mobile Sidebar Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Location Section */}
      {!['/cart', '/checkout'].includes(routerLocation.pathname) && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <LocationSection />
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Helpers */}
      <ScrollToTop />
      <Toast />

      {/* Global Quick View Modal Overlay */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
