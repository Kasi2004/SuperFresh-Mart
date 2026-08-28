import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaMapMarkerAlt, FaSun, FaMoon, FaPercent, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';
import PremiumHoverText from './PremiumHoverText';

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const {
    theme,
    toggleTheme,
    location,
    locations,
    updateLocation,
    wishlist,
    getCartCount,
    getCartTotal,
    isLoggedIn,
    logout,
    showToast
  } = useApp();

  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-xs lg:text-sm font-bold transition-colors focus:outline-none ${
      isActive ? 'text-primary-500 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-40 glass-nav w-full transition-all duration-300">
      {/* Top Banner Message */}
      <div className="bg-primary-600 text-white py-1 px-4 text-center text-[10px] md:text-xs font-semibold tracking-wider flex items-center justify-center gap-2">
        <FaPercent className="w-3 h-3 text-secondary-400 animate-bounce" />
        <span>Diwali Super Saver! Get flat ₹200 off above ₹1999. Use Code: <strong>MEGASTOCK</strong></span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center shadow-md shadow-primary-500/10 group-hover:rotate-6 transition-transform duration-300">
              <FaShoppingBag className="text-white w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base md:text-xl font-black tracking-tight text-slate-800 dark:text-white">
                Super<span className="text-secondary-500">Fresh</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                Mart
              </span>
            </div>
          </Link>

          {/* Delivery Location Picker */}
          <div className="relative z-50 hidden md:block">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200/20"
            >
              <FaMapMarkerAlt className="text-primary-500 w-3.5 h-3.5" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Deliver to</span>
                <span className="text-xs font-bold truncate max-w-[110px] leading-tight">{location}</span>
              </div>
            </button>
            {showLocationDropdown && (
              <>
                <div onClick={() => setShowLocationDropdown(false)} className="fixed inset-0" />
                <div className="absolute top-full left-0 mt-2 w-48 glass-card rounded-2xl border border-slate-100 dark:border-slate-800 p-2 shadow-xl">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        updateLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        location === loc
                          ? 'bg-primary-500 text-white'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Autocomplete Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-2">
            <SearchBar />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            <NavLink to="/" className={navLinkClass}>
              {({ isActive }) => <PremiumHoverText active={isActive}>Home</PremiumHoverText>}
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              {({ isActive }) => <PremiumHoverText active={isActive}>Shop</PremiumHoverText>}
            </NavLink>

            <NavLink to="/offers" className={navLinkClass}>
              {({ isActive }) => <PremiumHoverText active={isActive}>Offers</PremiumHoverText>}
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => <PremiumHoverText active={isActive}>About</PremiumHoverText>}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => <PremiumHoverText active={isActive}>Contact</PremiumHoverText>}
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />}
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none"
              aria-label="Wishlist"
            >
              <FaHeart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3.5 py-2 md:py-2.5 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white shadow-md shadow-primary-500/10 focus:outline-none transition-all active:scale-95 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <FaShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 w-4 h-4 rounded-full bg-secondary-500 text-slate-900 font-extrabold text-[9px] flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-black tracking-wide border-l border-white/20 pl-2">
                ₹{cartTotal}
              </span>
            </Link>

            {/* Highlighted Login / Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogoutClick}
                className="login-btn-styled flex items-center gap-1.5 px-3.5 py-2 md:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black text-xs shadow-md shadow-amber-500/20 cursor-pointer group"
                aria-label="Account Logout"
              >
                <span className="transition-transform duration-300 group-hover:scale-115 inline-block">👤</span>
                <span className="font-extrabold tracking-wide uppercase text-[10px] md:text-xs">
                  <PremiumHoverText>Logout</PremiumHoverText>
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="login-btn-styled login-btn-pulse flex items-center gap-1.5 px-3.5 py-2 md:py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-secondary-500 to-orange-500 text-slate-900 font-black text-xs shadow-md shadow-amber-500/20 group"
                aria-label="Account Login"
              >
                <span className="transition-transform duration-300 group-hover:scale-115 inline-block">🔐</span>
                <span className="font-extrabold tracking-wide uppercase text-[10px] md:text-xs">
                  <PremiumHoverText>Login</PremiumHoverText>
                </span>
              </Link>
            )}


            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/10 focus:outline-none flex flex-col justify-center items-center gap-1 w-9 h-9"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-[2px] bg-current rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Row (rendered below Navbar on smaller screens) */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
