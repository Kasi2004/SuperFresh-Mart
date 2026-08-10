import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaShoppingBag } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Message passed from protected routes
  const redirectMessage = location.state?.message;
  const redirectFrom = location.state?.from || '/';

  const validate = () => {
    const tempErrors = {};
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
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate login success
    login();
    showToast('👋 Welcome back! Login successful.', 'success');

    // Redirect back to original route or homepage
    navigate(redirectFrom, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50 dark:bg-slate-950/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card bg-white dark:bg-slate-900/80 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl text-left"
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
            Welcome Back 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Login to continue shopping
          </p>
        </div>

        {/* Warning notification banner from protected routes */}
        {redirectMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold leading-relaxed"
          >
            {redirectMessage}
          </motion.div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pl-1">
              Email ID
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 z-10 text-slate-400 dark:text-slate-500 w-5 h-5 pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full glass-input pl-12 pr-4 py-3.5 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${errors.email
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
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Password reset link sent to your email address (Mock).', 'info');
                }}
                className="text-[11px] font-bold text-primary-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 z-10 text-slate-400 dark:text-slate-500 w-5 h-5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full glass-input pl-12 pr-12 py-3.5 text-xs md:text-sm font-semibold border rounded-2xl outline-none transition-all ${errors.password
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 z-10 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-[11px] font-bold text-rose-500 pl-1">{errors.password}</span>
            )}
          </div>

          {/* Login Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-primary-500/10 transition-all text-xs tracking-wider uppercase focus:outline-none cursor-pointer text-center"
          >
            Login
          </motion.button>
        </form>

        {/* Create Account Link Footer */}
        <div className="text-center mt-6 pt-6 border-t border-slate-100/60 dark:border-slate-850">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-450">
            Don't have an account?{' '}
          </span>
          <Link
            to="/register"
            state={location.state}
            className="text-xs font-extrabold text-primary-500 hover:underline"
          >
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
