import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    showToast(`Thank you! ${email} has been subscribed to our newsletter.`, 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-base">SF</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-white">
                Super<span className="text-secondary-500">Fresh</span>
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                Mart
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Inspired by the local D Mart shopping experience, Superfresh Mart delivers high-quality daily staples, organic produce, dairy, and household cleaning supplies at the lowest rates.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3.5 mt-2">
            {[
              { icon: <FaFacebookF className="w-4 h-4" />, name: 'Facebook' },
              { icon: <FaTwitter className="w-4 h-4" />, name: 'Twitter' },
              { icon: <FaInstagram className="w-4 h-4" />, name: 'Instagram' },
              { icon: <FaYoutube className="w-4 h-4" />, name: 'YouTube' }
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-all"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories Link Columns */}
        <div>
          <h3 className="text-white font-bold text-base tracking-wide mb-5">Shop Categories</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { name: 'Fruits & Vegetables', slug: 'fruits-vegetables' },
              { name: 'Dairy & Eggs', slug: 'dairy' },
              { name: 'Grocery & Staples', slug: 'grocery' },
              { name: 'Snacks & Cookies', slug: 'snacks' },
              { name: 'Beverages', slug: 'beverages' },
              { name: 'Frozen Food items', slug: 'frozen-foods' }
            ].map((cat, idx) => (
              <li key={idx}>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="text-slate-400 hover:text-primary-400 hover:translate-x-1 transition-all inline-block"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base tracking-wide mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              { name: 'About Company Story', path: '/about' },
              { name: 'Offers & Festival Deals', path: '/offers' },
              { name: 'Store Locator & FAQ', path: '/contact' },
              { name: 'My Shopping Cart', path: '/cart' },
              { name: 'My Wishlist Board', path: '/wishlist' },
              { name: 'Store Contact Info', path: '/contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="text-slate-400 hover:text-primary-400 hover:translate-x-1 transition-all inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-base tracking-wide">Stay Updated</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Subscribe to our weekly newsletter to receive exclusive festival codes, combo deals, and organic health tips.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-slate-800 text-slate-200 border border-slate-700/60 rounded-xl px-4 py-2.5 pr-12 text-xs md:text-sm outline-none focus:border-primary-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
              aria-label="Subscribe"
            >
              <FaPaperPlane className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Superfresh Mart Bangalore. All rights reserved.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 font-semibold">
          <span className="text-slate-600">Educational Portfolio Project</span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
