import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import OfferCard from '../components/OfferCard';
import offers from '../data/offers.json';

export default function Offers() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Festival Offers', 'Combo Deals', 'Buy One Get One', 'Mega Discounts'];

  const filteredOffers = activeTab === 'All'
    ? offers
    : offers.filter(o => o.type === activeTab);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb paths={[{ name: 'Promotional Offers & Deals' }]} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          Super Saver Offers
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Copy coupon codes and apply them in the shopping bag for flat rates and combo price savings.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex overflow-x-auto gap-2 pb-2 mt-4 scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all outline-none ${
              activeTab === tab
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/10'
                : 'border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Offers List */}
      <div className="flex flex-col gap-6 mt-4">
        <AnimatePresence mode="wait">
          {filteredOffers.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 text-center">
              <span className="text-sm font-bold text-slate-500">No active offers under this section.</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
