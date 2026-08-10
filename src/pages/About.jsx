import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaChevronRight, FaStore, FaClock, FaCheckCircle } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumb';

// Custom Count Up component using requestAnimationFrame
const Counter = ({ target, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const endVal = parseInt(target, 10);
    if (isNaN(endVal)) return;

    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endVal));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

export default function About() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Breadcrumb paths={[{ name: 'About Us' }]} />

      {/* Hero storytelling banner */}
      <section className="text-center md:text-left grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-10 glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 shadow-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20 px-3.5 py-1 rounded-full w-max mx-auto md:mx-0 border border-primary-500/10">
            Our Story
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            Redefining Grocery Shopping in Bangalore
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Superfresh Mart was started with a simple vision: to bridge the gap between fresh farm harvests and city households. Inspired by the low-pricing model of giant Indian supermarkets, we built a digital grocery experience that operates purely on the values of absolute quality, fresh supplies, and savings.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Over the years, we have expanded to serve multiple residential layout clusters in Bangalore including Whitefield, HSR Layout, Koramangala, and Jayanagar. Today, we handle over 5,000 orders daily.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/20 aspect-video md:aspect-[4/3] w-full">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
            alt="Grocery warehouse team"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Animated Counter Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {[
          { label: "Happy Shoppers", value: "50000", suffix: "+", desc: "Families served monthly" },
          { label: "Partner Farms", value: "150", suffix: "+", desc: "Local growers in Karnataka" },
          { label: "FMCG Staples", value: "2500", suffix: "+", desc: "Unique inventory items" },
          { label: "Rider Fleets", value: "120", suffix: "+", desc: "Riders delivering daily" }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-slate-100/40 dark:border-slate-800/40 flex flex-col gap-1 shadow-sm"
          >
            <span className="text-3xl md:text-4xl font-black text-primary-500">
              <Counter target={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">{stat.label}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium leading-none">{stat.desc}</span>
          </div>
        ))}
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="glass-card p-8 rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold">
            M
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">Our Mission</h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            To make organic and fresh groceries accessible to every middle-class household at wholesale supermarket rates, ensuring nutritious produce reaches dining tables within hours of harvesting.
          </p>
        </div>

        <div className="glass-card p-8 rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-100 dark:bg-secondary-950/40 text-secondary-600 dark:text-secondary-400 flex items-center justify-center font-bold">
            V
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">Our Vision</h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            To become Bangalore's most trusted digital supermarket partner by setting global standards for inventory safety, logistics reliability, farm-to-fork tracing, and eco-friendly packaging.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">
          Why Families Shop With Us
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
          The principles that place us ahead of local sub-retailers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { title: "Direct Farm Procurement", desc: "We purchase green vegetables and pulpy fruits directly from farmers near Bengaluru, bypassing middle agents to pass savings on to you." },
            { title: "Cold Storage Freshness", desc: "Temperature regulated holding zones keep dairy products, paneer, and frozen items in pristine cooling parameters prior to shipping." },
            { title: "Eco-Friendly Bags", desc: "We deliver in reusable cloth bags and minimize plastic wrapping, supporting Bangalore's green environment efforts." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border border-slate-100/50 dark:border-slate-800/40 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-primary-500 w-5 h-5 flex-shrink-0" />
                <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100">{item.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
