import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaCreditCard, FaRegCheckCircle, FaShoppingBag, FaArrowLeft, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    location,
    getCartSubtotal,
    getCartSavings,
    getCartDiscount,
    getCartTotal,
    coupon,
    showToast,
    isLoggedIn
  } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', {
        state: {
          from: '/checkout',
          message: 'Please login first to continue your order.'
        }
      });
    }
  }, [isLoggedIn, navigate]);

  // Guest details form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Checkout system states
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliverySlot, setDeliverySlot] = useState('express'); // 'express' or 'standard'
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = getCartSubtotal();
  const savings = getCartSavings();
  const discount = getCartDiscount();
  const total = getCartTotal();

  const deliveryLimit = 499;
  const deliveryFee = subtotal > deliveryLimit || subtotal === 0 ? 0 : 49;

  const validateForm = () => {
    const tempErrors = {};

    if (!fullName.trim()) {
      tempErrors.fullName = 'Please enter your name.';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Name must contain at least 3 characters.';
    }

    if (!emailAddress.trim()) {
      tempErrors.emailAddress = 'Please enter a valid email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress.trim())) {
        tempErrors.emailAddress = 'Please enter a valid email address.';
      }
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!mobileNumber.trim()) {
      tempErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    } else if (cleanMobile.length !== 10) {
      tempErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!streetAddress.trim()) {
      tempErrors.streetAddress = 'Please enter your delivery street address.';
    }

    if (!city.trim()) {
      tempErrors.city = 'Please enter your city.';
    }

    if (!stateName.trim()) {
      tempErrors.stateName = 'Please enter your state.';
    }

    if (!zipCode.trim()) {
      tempErrors.zipCode = 'Please enter a valid 6-digit pincode.';
    } else if (!/^\d{6}$/.test(zipCode.trim())) {
      tempErrors.zipCode = 'Please enter a valid 6-digit pincode.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please check the highlighted errors in the form.', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      // Generate ORD-YYYYMMDD-XXXX format
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const dateStr = `${year}${month}${day}`;
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `ORD-${dateStr}-${randomNum}`;
      
      setOrderId(generatedId);
      setOrderConfirmed(true);
      setIsProcessing(false);
      showToast('🎉 Order Placed Successfully!', 'success');
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setOrderConfirmed(false);
    setViewOrderDetails(false);
    clearCart();
    navigate('/', { replace: true });
  };

  // Estimate delivery text logic
  const getEstimatedDateText = () => {
    if (deliverySlot === 'express') {
      return 'Today, within 4 hours';
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.toDateString()} (9:00 AM - 1:00 PM)`;
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Back Button */}
      <div className="flex justify-start mb-2">
        <motion.button
          whileHover={{ scale: 1.03, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm cursor-pointer"
        >
          <span>← Back to Cart</span>
        </motion.button>
      </div>

      <Breadcrumb paths={[{ name: 'Checkout' }]} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          Direct Checkout
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Enter your delivery details, select payment, and place your guest order directly.
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 text-left">
          {/* Left Columns - Delivery Address & Payment */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Delivery Details Card */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-150/40 dark:border-slate-800/80">
                <FaMapMarkerAlt className="text-primary-500" />
                1. Delivery & Buyer Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={emailAddress}
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                      if (errors.emailAddress) setErrors(prev => ({ ...prev, emailAddress: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.emailAddress ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.emailAddress && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.emailAddress}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (errors.mobileNumber) setErrors(prev => ({ ...prev, mobileNumber: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.mobileNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.mobileNumber && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.mobileNumber}
                    </span>
                  )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Street Address (Delivery Destination) *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter house no, flat, building name, street and landmark"
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                      if (errors.streetAddress) setErrors(prev => ({ ...prev, streetAddress: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.streetAddress ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.streetAddress && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.streetAddress}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors(prev => ({ ...prev, city: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.city ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.city && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.city}
                    </span>
                  )}
                </div>

                {/* State */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    State *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karnataka"
                    value={stateName}
                    onChange={(e) => {
                      setStateName(e.target.value);
                      if (errors.stateName) setErrors(prev => ({ ...prev, stateName: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.stateName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.stateName && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.stateName}
                    </span>
                  )}
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Pincode / ZIP Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 560001"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value.replace(/\D/g, ''));
                      if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: null }));
                    }}
                    className={`glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border ${
                      errors.zipCode ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.zipCode && (
                    <span className="text-[10px] font-semibold text-rose-500 px-1 mt-0.5">
                      {errors.zipCode}
                    </span>
                  )}
                </div>

                {/* Delivery Instructions */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leave with security guard, call before delivery"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="glass-input w-full px-4 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Slot Selector */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-150/40 dark:border-slate-800/80">
                <FaTruck className="text-primary-500" />
                2. Select Timings Slot
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliverySlot('express')}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    deliverySlot === 'express'
                      ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Express Delivery</span>
                    {deliverySlot === 'express' && <FaCheck className="text-primary-500 w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs text-slate-400">Arrives in 2 - 4 Hours</span>
                  <span className="text-xs font-black text-primary-500 mt-2">Free Delivery Included</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySlot('standard')}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    deliverySlot === 'standard'
                      ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Next-Day Scheduled</span>
                    {deliverySlot === 'standard' && <FaCheck className="text-primary-500 w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs text-slate-400">Tomorrow morning delivery</span>
                  <span className="text-xs font-black text-emerald-500 mt-2">Zero Carbon Delivery</span>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass-card rounded-[32px] p-6 md:p-8 border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-150/40 dark:border-slate-800/80">
                <FaCreditCard className="text-primary-500" />
                3. Choose Payment Method
              </h2>
              
              <div className="flex flex-col gap-3">
                <label className={`p-4 rounded-2xl border flex items-center gap-4 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-primary-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Cash on Delivery (COD)</span>
                    <span className="text-xs text-slate-400">Pay on receipt of items with cash or UPI QR scan.</span>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl border flex items-center gap-4 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-primary-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">UPI / QR Code Scan</span>
                    <span className="text-xs text-slate-400">Pay using Google Pay, PhonePe, Paytm, or BHIM.</span>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl border flex items-center gap-4 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-primary-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Credit / Debit Card</span>
                    <span className="text-xs text-slate-400">Supports Mastercard, Visa, RuPay, and Diners.</span>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Right Column - Summary & Calculations */}
          <div className="flex flex-col gap-6">
            {/* Basket items summary list */}
            <div className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 border-b border-slate-150/40 dark:border-slate-800/80 pb-3">
                <FaShoppingBag className="text-primary-500" />
                Items In Order ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h3>
              
              <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-550 dark:bg-slate-800"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-slate-700 dark:text-slate-200 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-slate-450 mt-0.5">
                        {item.quantity} x ₹{item.product.price}
                      </p>
                    </div>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing breakdown */}
            <div className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 border-b border-slate-150/40 dark:border-slate-800/80 pb-3">
                Price Breakdown
              </h3>
              
              <div className="flex flex-col gap-3 pb-3 border-b border-slate-150/40 dark:border-slate-800/80 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-slate-700 dark:text-slate-200">₹{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Retail Savings</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Coupon Applied ({coupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-slate-700 dark:text-slate-200">
                    {deliveryFee > 0 ? `₹${deliveryFee}` : <span className="text-emerald-500">FREE</span>}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline font-black text-slate-800 dark:text-slate-100 my-1">
                <span className="text-sm uppercase tracking-wider">Grand Total</span>
                <span className="text-2xl text-slate-850 dark:text-slate-100">₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white rounded-2xl text-sm font-black tracking-wider uppercase shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 active:scale-95 transition-all focus:outline-none cursor-pointer mt-2"
              >
                Place Order (₹{total})
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 my-6 gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
            <FaShoppingBag className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
              Checkout is unavailable
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
              You do not have any groceries in your cart to checkout. Let's find some delicious deals!
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Go Shop Groceries
          </Link>
        </div>
      )}

      {/* Checkout Processing Overlay / Order Success Modal */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl flex flex-col items-center gap-4 shadow-xl border border-slate-200/20 max-w-xs text-center">
              <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-850 border-t-primary-500 animate-spin rounded-full" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Processing Payment...</span>
            </div>
          </div>
        )}

        {orderConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={handleCloseSuccess} className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-2xl p-6 md:p-8 rounded-[32px] max-w-md w-full text-center relative z-10 flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/10">
                <FaRegCheckCircle className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-850 dark:text-slate-100 mb-2">
                🎉 Order Placed Successfully!
              </h2>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mb-4">
                Thank you for shopping with us! Your mock transaction has completed.
              </p>
              
              <div className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl mb-6 text-left flex flex-col gap-2.5 text-xs font-semibold text-slate-650 dark:text-slate-400 animate-fade-in">
                <div className="flex justify-between">
                  <span>Order ID Reference</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-black">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Name</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile Number</span>
                  <span className="text-slate-800 dark:text-slate-200">{mobileNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address</span>
                  <span className="text-slate-850 dark:text-slate-200 text-right max-w-[200px] truncate" title={`${streetAddress}, ${city}, ${stateName} - ${zipCode}`}>
                    {streetAddress}, {city}, {stateName} - {zipCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-primary-500 font-extrabold uppercase text-[10px]">
                    {getEstimatedDateText()}
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-t border-slate-200/50 dark:border-slate-800 pt-2.5 mt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Ordered Products</span>
                  <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto mt-1 pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-[11px] text-slate-600 dark:text-slate-350">
                        <span>{item.product.name} (x{item.quantity})</span>
                        <span className="font-bold">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between border-t border-slate-200/50 dark:border-slate-800 pt-2.5 text-[10px] uppercase font-bold text-slate-400">
                  <span>Total Amount</span>
                  <span className="text-slate-800 dark:text-slate-200 font-black text-sm">₹{total}</span>
                </div>
              </div>

              {/* View Order Tracker details box */}
              {viewOrderDetails && (
                <div className="w-full mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/10 rounded-2xl text-xs font-bold text-emerald-700 dark:text-emerald-400 text-left animate-fade-in flex flex-col gap-1.5">
                  <p className="uppercase text-[9px] font-black tracking-widest text-slate-400">Order Tracking Status</p>
                  <p>🚚 Status: Packed & Dispatching</p>
                  <p>🕒 Estimated Timings: {deliverySlot === 'express' ? 'Express (Today)' : 'Scheduled Slot (Tomorrow)'}</p>
                  <p>📞 Helpline Support: 1800-FRESH-MART</p>
                </div>
              )}

              <div className="flex gap-4 w-full">
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Mock tracking details loaded successfully.', 'info');
                    setViewOrderDetails(true);
                  }}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
                >
                  View Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
