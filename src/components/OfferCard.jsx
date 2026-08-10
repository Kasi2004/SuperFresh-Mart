import React from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function OfferCard({ offer }) {
  const { showToast } = useApp();
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Coupon code ${offer.code} copied to clipboard!`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 overflow-hidden shadow-sm flex flex-col md:flex-row items-center gap-6 p-6 md:p-8"
    >
      {/* Visual illustration (Image) */}
      <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/40 flex-shrink-0">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info details */}
      <div className="flex flex-col flex-grow text-center md:text-left">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full w-max mx-auto md:mx-0 mb-3 border border-primary-500/10">
          {offer.type}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-2">
          {offer.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          {offer.description}
        </p>

        {/* Action coupon row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto">
          <div className="bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 px-4 py-2.5 rounded-xl font-mono font-bold text-sm md:text-base text-slate-700 dark:text-slate-200 tracking-wider">
            {offer.code}
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-secondary-500 hover:bg-secondary-600 text-slate-900 transition-colors shadow-sm focus:outline-none"
          >
            {copied ? (
              <>
                <FaCheck className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <FaCopy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
