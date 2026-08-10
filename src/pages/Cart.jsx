import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTicketAlt, FaTruck, FaRegCheckCircle, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    location,
    getCartSubtotal,
    getCartSavings,
    getCartDiscount,
    getCartTotal,
    coupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = getCartSubtotal();
  const savings = getCartSavings();
  const discount = getCartDiscount();
  const total = getCartTotal();

  const deliveryLimit = 499;
  const deliveryFee = subtotal > deliveryLimit || subtotal === 0 ? 0 : 49;
  const remainingForFreeDelivery = deliveryLimit - subtotal;

  const couponsList = [
    { code: 'WELCOME10', desc: '10% off for new shoppers' },
    { code: 'FRESH50', desc: '₹50 off on orders above ₹499' },
    { code: 'MEGASTOCK', desc: '₹200 off on orders above ₹1999' }
  ];

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleApplyCouponChip = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      setCouponError('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckoutDemo = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setOrderConfirmed(true);
      setIsCheckingOut(false);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setOrderConfirmed(false);
    clearCart();
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Back Button */}
      <div className="flex justify-start mb-2">
        <motion.button
          whileHover={{ 
            scale: 1.03, 
            x: -2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm focus:outline-none group cursor-pointer"
        >
          <span className="transform transition-transform duration-300 group-hover:-translate-x-1 inline-block">
            ←
          </span>
          <span>Back</span>
        </motion.button>
      </div>

      <Breadcrumb paths={[{ name: 'Shopping Cart' }]} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          Shopping Cart
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Review your items, apply vouchers, and proceed to mock secure checkout.
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          
          {/* Left: Items list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Free Delivery Banner */}
            {subtotal < deliveryLimit ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-500/10 p-4 rounded-2xl text-left flex flex-col gap-2 shadow-inner">
                <div className="flex justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                  <span>Add ₹{remainingForFreeDelivery} more for FREE Delivery!</span>
                  <span>{Math.round((subtotal / deliveryLimit) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${(subtotal / deliveryLimit) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-2xl text-left text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 shadow-inner">
                🎉 Congratulations! Your order qualifies for <strong>FREE Delivery</strong> across Bangalore.
              </div>
            )}

            {/* Cart Items list */}
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="glass-card rounded-3xl p-4 md:p-6 border border-slate-100 dark:border-slate-800/40 flex items-center gap-4 md:gap-6 text-left"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl bg-slate-100 dark:bg-slate-850 flex-shrink-0"
                  />
                  
                  <div className="flex-grow flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                      {item.product.brand}
                    </span>
                    <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 truncate">
                      {item.product.name}
                    </h3>
                    <span className="text-xs text-slate-400 mt-0.5">{item.product.weight}</span>
                    
                    <div className="flex items-center gap-3 mt-2 sm:hidden">
                      <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                        ₹{item.product.price}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{item.product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity counters */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/40 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Decrease"
                    >
                      <FaMinus className="w-2.5 h-2.5" />
                    </button>
                    <span className="w-8 text-center font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Increase"
                    >
                      <FaPlus className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Price display Desktop */}
                  <div className="hidden sm:flex flex-col text-right w-20 shrink-0">
                    {item.product.originalPrice > item.product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.product.originalPrice * item.quantity}
                      </span>
                    )}
                    <span className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>

                  {/* Delete Item Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart control */}
            <div className="flex justify-between items-center mt-2 px-2">
              <Link to="/products" className="text-xs font-bold text-primary-500 hover:underline">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right: Summary Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Promo Voucher input box */}
            <div className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 p-6 flex flex-col gap-4 text-left shadow-sm">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FaTicketAlt className="text-primary-500" />
                Apply Coupon Code
              </h3>
              
              {coupon ? (
                <div className="flex items-center justify-between bg-primary-50 dark:bg-primary-950/20 border border-primary-500/10 p-3 rounded-2xl text-xs font-bold text-primary-600 dark:text-primary-400">
                  <div className="flex flex-col">
                    <span>Coupon Applied: {coupon.code}</span>
                    <span className="text-[10px] text-slate-400 font-normal mt-0.5">Extra discount loaded in bill.</span>
                  </div>
                  <button onClick={removeCoupon} className="p-1 rounded-full hover:bg-primary-100 text-slate-400 hover:text-slate-600">
                    <FaTimes className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Voucher code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow glass-input px-3.5 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-4.5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] font-semibold text-rose-500">{couponError}</p>}

              {/* Suggestions chips */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Available Coupons</span>
                <div className="flex flex-col gap-2">
                  {couponsList.map(c => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCouponChip(c.code)}
                      disabled={coupon && coupon.code === c.code}
                      className="w-full text-left p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 transition-colors"
                    >
                      <div className="flex flex-col">
                        <strong className="text-slate-700 dark:text-slate-200 font-mono tracking-wide">{c.code}</strong>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-normal">{c.desc}</span>
                      </div>
                      <span className="text-[10px] text-primary-500 font-bold">Apply</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Calculations Bill */}
            <div className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 p-6 flex flex-col gap-4 text-left shadow-sm">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100">
                Order Summary
              </h3>

              <div className="flex flex-col gap-3.5 border-b border-slate-100 dark:border-slate-850 pb-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-200">₹{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Retail Savings</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Coupon Discount ({coupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {deliveryFee > 0 ? `₹${deliveryFee}` : <span className="text-emerald-600 font-bold">FREE</span>}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline font-black text-lg text-slate-800 dark:text-slate-100">
                <span>Grand Total</span>
                <span className="text-2xl">₹{total}</span>
              </div>

              <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-150/10 flex items-center gap-2">
                <FaTruck className="text-primary-500 shrink-0 w-3.5 h-3.5" />
                <span>Shipping to: <strong>{location} (Express 4-hour Window)</strong></span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white rounded-2xl text-sm font-bold shadow-md shadow-primary-500/10 transition-all focus:outline-none cursor-pointer"
              >
                Proceed to Checkout
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
              Your shopping bag is empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
              Looks like you haven't added any fresh groceries to your cart yet. Let's find some deals!
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
