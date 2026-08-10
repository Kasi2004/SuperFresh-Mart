import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaDirections, FaStore } from 'react-icons/fa';
import mapImage from '../assets/store_location_map.png';

export default function LocationSection() {
  const storeName = "Superfresh Bangalore Corporate Hub";
  const address = "27th Main Road, HSR Layout Sector 1, Bangalore, Karnataka, India - 560102";
  const phoneNumber = "+91 80 4912 3456";
  const timings = "6:00 AM – 10:00 PM";

  const handleGetDirections = () => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(storeName + ", " + address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full py-10">
      <div className="glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 p-6 md:p-10 shadow-2xl relative overflow-hidden text-left">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Store Information (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6 relative z-10"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-primary-500/10 dark:bg-primary-500/20 text-primary-650 dark:text-primary-400 rounded-2xl">
                <FaStore className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Visit Our Store
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Store Name & Address */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-850 rounded-2xl text-primary-500 border border-slate-200/20 shadow-xs mt-1">
                  <FaMapMarkerAlt className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider mb-1">
                    Store Location
                  </h4>
                  <p className="text-base font-black text-slate-800 dark:text-slate-100">
                    {storeName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-relaxed max-w-sm">
                    {address}
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-850 rounded-2xl text-secondary-500 border border-slate-200/20 shadow-xs mt-1">
                  <FaClock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider mb-1">
                    Opening Hours
                  </h4>
                  <p className="text-base font-black text-slate-800 dark:text-slate-100">
                    {timings}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                    Open All 7 Days
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-100 dark:bg-slate-850 rounded-2xl text-primary-500 border border-slate-200/20 shadow-xs mt-1">
                  <FaPhoneAlt className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider mb-1">
                    Phone Helpline
                  </h4>
                  <p className="text-base font-black text-slate-800 dark:text-slate-100">
                    {phoneNumber}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                    Get in touch with customer desk
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGetDirections}
              className="w-max mt-4 flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white font-extrabold text-xs shadow-md shadow-primary-500/10 cursor-pointer transition-all"
            >
              <FaDirections className="w-4.5 h-4.5" />
              <span>Get Directions</span>
            </motion.button>
          </motion.div>

          {/* Map Illustration / Image (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-855 bg-slate-50 dark:bg-slate-950/40 p-2 group"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square max-h-[380px] w-full mx-auto">
              <img
                src={mapImage}
                alt="Superfresh Store Map Location Pin"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />

              {/* Pulsing Pin Overlay decoration representing location pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-12 h-12 bg-primary-500/30 rounded-full animate-ping pointer-events-none" />
                  <div className="absolute w-6 h-6 bg-primary-500/50 rounded-full animate-pulse pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
