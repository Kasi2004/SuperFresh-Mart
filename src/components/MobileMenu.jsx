import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHome, FaList, FaPercent, FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt, FaCaretDown, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { location, locations, updateLocation, isLoggedIn, logout } = useApp();
  const navigate = useNavigate();
  const [showLocationList, setShowLocationList] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logout();
    onClose();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all ${
      isActive
        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/10'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:text-slate-800 dark:hover:text-slate-200'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          />

          {/* Drawer menu panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] glass-card bg-white dark:bg-slate-950 shadow-2xl lg:hidden flex flex-col p-6 h-full border-l border-slate-100 dark:border-slate-900"
          >
            {/* Header section */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-900 mb-6">
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-800 dark:text-white">
                  Super<span className="text-secondary-500">Fresh</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                  Mart Navigation
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-905 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <FaTimes className="w-4.5 h-4.5" />
              </button>
            </div>


            {/* Content body */}
            <div className="flex flex-col gap-6 flex-grow overflow-y-auto pr-1">
              
              {/* Delivery location selector for mobile */}
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-900 p-4 rounded-2xl">
                <button
                  onClick={() => setShowLocationList(!showLocationList)}
                  className="flex items-center justify-between w-full text-slate-700 dark:text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary-500 w-4 h-4" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deliver to</span>
                      <span className="text-xs font-bold">{location}</span>
                    </div>
                  </div>
                  <FaCaretDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showLocationList ? 'rotate-180' : ''}`} />
                </button>

                {showLocationList && (
                  <div className="mt-3 flex flex-col gap-1 border-t border-slate-200/50 dark:border-slate-800 pt-3">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          updateLocation(loc);
                          setShowLocationList(false);
                          onClose();
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          location === loc
                            ? 'bg-primary-500 text-white'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col gap-2">
                <NavLink to="/" onClick={onClose} className={linkClass}>
                  <FaHome className="w-4 h-4" />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/categories" onClick={onClose} className={linkClass}>
                  <FaList className="w-4 h-4" />
                  <span>All Categories</span>
                </NavLink>
                <NavLink to="/offers" onClick={onClose} className={linkClass}>
                  <FaPercent className="w-4 h-4" />
                  <span>Offers & Deals</span>
                </NavLink>
                <NavLink to="/about" onClick={onClose} className={linkClass}>
                  <FaInfoCircle className="w-4 h-4" />
                  <span>About Us</span>
                </NavLink>
                <NavLink to="/contact" onClick={onClose} className={linkClass}>
                  <FaPhoneAlt className="w-4 h-4" />
                  <span>Contact</span>
                </NavLink>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold tracking-wide text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all w-full text-left cursor-pointer"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <NavLink to="/login" onClick={onClose} className={linkClass}>
                    <FaSignInAlt className="w-4 h-4" />
                    <span>Login</span>
                  </NavLink>
                )}
              </nav>

            </div>

            {/* Footer / App Details */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-900 mt-auto text-center text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
              Superfresh Mart Bangalore<br />
              Portfolio Edition v1.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
