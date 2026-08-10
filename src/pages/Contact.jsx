import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaChevronDown, FaStore } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';

export default function Contact() {
  const { showToast } = useApp();

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ state: track active index
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What are your delivery hours in Bangalore?", a: "We deliver from 6:00 AM to 10:00 PM, all seven days a week. Orders placed before 6:00 PM qualify for express 4-hour delivery." },
    { q: "Is there a minimum order amount for free delivery?", a: "Yes. All shopping baskets above ₹499 qualify for flat Free Delivery. A nominal delivery fee of ₹49 is charged for orders below ₹499." },
    { q: "What is your refund and return policy?", a: "We offer a 100% no-questions-asked refund policy. If any fruit, leafy vegetable, or dairy item arrives stale or damaged, just report it within 24 hours via contact and we will credit the refund to your mock wallet." },
    { q: "Do you supply organic-only produce?", a: "We have both organic and standard farm produce. All organic fruits and veggies are clearly marked with an 'Organic' label badge and certified by local agricultural authorities." },
    { q: "How do I apply coupon codes?", a: "Copy coupon codes from our 'Offers' page. In the shopping cart bag, paste the code into the voucher input field and press 'Apply'. The discount will adjust in the bill breakdown immediately." }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the validation errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showToast(`Thank you, ${form.name}! Your message has been sent successfully.`, 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      <Breadcrumb paths={[{ name: 'Contact & Support' }]} />

      {/* Main title */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          Contact Support
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Have queries about orders, returns, or locations? Contact our team or search our FAQ bank.
        </p>
      </div>

      {/* Contact Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {[
          { icon: <FaPhoneAlt className="text-primary-500 w-5 h-5" />, title: "Call Support", detail: "+91 80 4912 3456", subtitle: "Mon-Sun, 6 AM - 10 PM" },
          { icon: <FaEnvelope className="text-secondary-500 w-5 h-5" />, title: "Email Queries", detail: "support@superfresh.in", subtitle: "Replied within 2 hours" },
          { icon: <FaMapMarkerAlt className="text-primary-500 w-5 h-5" />, title: "HSR Layout Hub", detail: "27th Main Road, Sector 1", subtitle: "HSR Layout, Bengaluru" },
          { icon: <FaClock className="text-secondary-500 w-5 h-5" />, title: "Delivery Hours", detail: "6:00 AM - 10:00 PM", subtitle: "All 7 Days a week" }
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-slate-100/50 dark:border-slate-800/40 flex flex-col gap-3 shadow-sm"
          >
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex-shrink-0 w-max border border-slate-200/20">
              {item.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider mb-1">{item.title}</h3>
              <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">{item.detail}</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Form and FAQ layout split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 p-6 md:p-8 text-left shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2.5">
            <FaEnvelope className="text-primary-500" />
            Send a Message
          </h2>
          
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Rahul Kumar"
                  className="glass-input px-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                {errors.name && <span className="text-[10px] text-rose-500 font-bold">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="rahul@example.com"
                  className="glass-input px-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                {errors.email && <span className="text-[10px] text-rose-500 font-bold">{errors.email}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Subject (Optional)</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleInputChange}
                placeholder="Delivery issue / Partnership"
                className="glass-input px-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write your query details here..."
                className="glass-input px-4 py-2.5 text-xs md:text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              {errors.message && <span className="text-[10px] text-rose-500 font-bold">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs md:text-sm font-bold shadow-md transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* FAQs Accordion */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 pl-2">
            Frequently Asked Questions
          </h2>
          
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl border border-slate-100/50 dark:border-slate-800/40 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Google Maps Placeholder */}
      <section className="text-left flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 pl-2">
          Store Locator Map
        </h2>
        <div className="relative h-80 rounded-[32px] overflow-hidden glass-card border border-slate-100 dark:border-slate-800/40 p-4 shadow-sm bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center text-center gap-4">
          {/* Mock Map Background SVG decoration */}
          <div className="absolute inset-0 opacity-15 dark:opacity-5 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0,20 L 100,50 M 0,80 L 100,80 M 30,0 L 30,100 M 80,0 L 80,100" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
              <circle cx="30" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/40 text-primary-500 flex items-center justify-center shadow-md z-10 border border-primary-500/10">
            <FaStore className="w-5 h-5" />
          </div>
          <div className="z-10">
            <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100">Superfresh Bangalore Corporate Hub</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-sm">
              27th Main Road, HSR Layout Sector 1, Bangalore (Bengaluru) - 560102.<br />
              Latitude: 12.9105 | Longitude: 77.6432
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all z-10"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
