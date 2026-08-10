import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronRight, FaRegCheckCircle, FaTruck, FaAward, FaHeadset } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Rating from '../components/Rating';

import banners from '../data/banners.json';
import categories from '../data/categories.json';
import products from '../data/products.json';
import reviews from '../data/reviews.json';

export default function Home() {
  const { showToast, setQuickViewProduct } = useApp();

  // Filter products for different sections
  const todayDeals = products.filter(p => p.discount >= 20).slice(0, 4);
  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const seasonal = products.filter(p => p.seasonal && p.seasonal !== 'All-Year').slice(0, 4);

  // Brand partners list
  const brands = [
    { name: 'Amul', logoText: 'A' },
    { name: 'Fortune', logoText: 'F' },
    { name: 'Aashirvaad', logoText: 'As' },
    { name: 'Himalaya', logoText: 'H' },
    { name: 'Epigamia', logoText: 'E' },
    { name: 'Nescafe', logoText: 'N' },
    { name: 'Tata', logoText: 'T' },
    { name: 'Milton', logoText: 'M' }
  ];

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-12">
      {/* Hero Banner Slider */}
      <section>
        <HeroSlider banners={banners} />
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-8 glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40">
        {[
          { icon: <FaTruck className="w-6 h-6 text-primary-500" />, title: "Free & Fast Shipping", desc: "For all orders above ₹499 in Bangalore" },
          { icon: <FaAward className="w-6 h-6 text-secondary-500" />, title: "100% Organic & Fresh", desc: "Sourced directly from local farming hubs" },
          { icon: <FaRegCheckCircle className="w-6 h-6 text-primary-500" />, title: "Unmatched Lowest Prices", desc: "Beat supermarket rates daily" },
          { icon: <FaHeadset className="w-6 h-6 text-secondary-500" />, title: "24/7 Helpline Support", desc: "Instant answers and quick refunds" }
        ].map((badge, idx) => (
          <div key={idx} className="flex items-center gap-4 text-left">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-shrink-0 border border-slate-200/20">
              {badge.icon}
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{badge.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{badge.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
              Shop by Category
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
              Explore our wide variety of daily staples and organic farm produce.
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1 text-xs md:text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors"
          >
            See All <FaChevronRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Today's Deals (High discounts) */}
      {todayDeals.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
              Today's Super Deals
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
              Save big with our highest discounted daily deals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {todayDeals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
            Featured Products
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Hand-picked products recommended by our store experts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
            Best Sellers
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            The most popular choices among families in Bangalore.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Promo banner split */}
      <section className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex-1 text-center md:text-left z-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full w-max mx-auto md:mx-0 mb-3 border border-white/10">
            Combo Offer
          </span>
          <h2 className="text-2xl md:text-4xl font-black mb-3">Fresh Morning Breakfast Deal</h2>
          <p className="text-xs md:text-sm text-white/95 font-medium leading-relaxed max-w-lg mb-6">
            Get Milk 1L, Butter 500g, and Wheat Sliced Bread 400g at flat ₹30 discount. Add them together and use code BCOMBO30.
          </p>
          <Link
            to="/offers"
            className="px-6 py-2.5 bg-secondary-500 hover:bg-secondary-600 active:scale-95 text-slate-900 font-extrabold rounded-xl shadow-lg transition-all text-xs md:text-sm tracking-wider uppercase inline-block"
          >
            Claim Combo
          </Link>
        </div>
        <div className="flex-shrink-0 w-44 md:w-56 aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80"
            alt="Breakfast combo pack"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* New Arrivals & Seasonal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        <section>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              New Arrivals
            </h2>
            <Link to="/products?sort=newest" className="text-xs font-bold text-primary-500 hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newArrivals.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              Seasonal Specials
            </h2>
            <Link to="/products" className="text-xs font-bold text-primary-500 hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seasonal.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Popular Brands scroll */}
      <section className="text-center">
        <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
          Popular Brands Partnered
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          Lowest pricing on top FMCG staples and hygiene supplies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl glass-card border border-slate-200/20 text-slate-700 dark:text-slate-300 font-black text-sm md:text-base tracking-wider hover:scale-105 transition-transform"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
                {brand.logoText}
              </div>
              {brand.name}
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
            What Customers Are Saying
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Read stories from verified shoppers in Bengaluru.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 rounded-3xl border border-slate-100/50 dark:border-slate-800/40 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover bg-slate-100 border border-slate-200"
                />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-tight">
                    {rev.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    {rev.date}
                  </span>
                </div>
              </div>
              <Rating value={rev.rating} size="xs" />
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
