import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaShoppingBag, FaCheck } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!fullName.trim()) {
      tempErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Name must be at least 3 characters.';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password is required.';
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate successful registration
    showToast('🎉 Account created successfully. Please login to continue.', 'success');
    
    // Navigate to login, keeping the redirect state (from e.g. /checkout)
    navigate('/login', {
      state: {
        from: location.state?.from || '/',
        message: 'Account created successfully. Please login to continue.'
      },
      replace: true
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50 dark:bg-slate-950/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card bg-white dark:bg-slate-900/80 p-6 sm:p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl text-left"
      >
        {/* Brand Logo header */}
        <div className="flex items-center gap-2.5 justify-center mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center shadow-md">
            <FaShoppingBag className="text-white w-4.5 h-4.5" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-800 dark:text-white">
            Super<span className="text-secondary-500">Fresh</span>
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Create Account 🚀
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Join us to start shopping freshest groceries
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pl-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FaUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full glass-input pl-11 pr-4 py-3 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${
                  errors.fullName
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500'
                }`}
              />
            </div>
            {errors.fullName && (
              <span className="text-[11px] font-bold text-rose-500 pl-1">{errors.fullName}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pl-1">
              Email ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FaEnvelope className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full glass-input pl-11 pr-4 py-3 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${
                  errors.email
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-[11px] font-bold text-rose-500 pl-1">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pl-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FaLock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full glass-input pl-11 pr-4 py-3 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${
                  errors.password
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500'
                }`}
              />
            </div>
            {errors.password && (
              <span className="text-[11px] font-bold text-rose-500 pl-1">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FaLock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full glass-input pl-11 pr-4 py-3 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${
                  errors.confirmPassword
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-[11px] font-bold text-rose-500 pl-1">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Register Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-primary-500/10 transition-all text-xs tracking-wider uppercase focus:outline-none cursor-pointer text-center"
          >
            Create Account
          </motion.button>
        </form>

        {/* Login Link Footer */}
        <div className="text-center mt-6 pt-6 border-t border-slate-100/60 dark:border-slate-850">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-450">
            Already have an account?{' '}
          </span>
          <Link
            to="/login"
            state={location.state}
            className="text-xs font-extrabold text-primary-500 hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
