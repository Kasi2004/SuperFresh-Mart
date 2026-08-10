import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaHeart, FaFolderOpen } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import Rating from '../components/Rating';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, setQuickViewProduct } = useApp();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb paths={[{ name: 'Wishlist' }]} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
          My Wishlist
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Saved grocery list items. Move them to your cart to checkout.
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 p-4 flex flex-col h-full relative overflow-hidden group text-left"
            >
              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 border border-slate-100 dark:border-slate-800 transition-colors shadow-sm focus:outline-none"
                aria-label="Remove item"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>

              {/* Product Image */}
              <div
                onClick={() => setQuickViewProduct(product)}
                className="block relative aspect-square rounded-2xl overflow-hidden bg-slate-100/50 dark:bg-slate-800/30 mb-4 pt-1 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
                  {product.brand}
                </span>
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-2 min-h-[40px] md:min-h-[48px] leading-snug mb-1 cursor-pointer"
                >
                  {product.name}
                </div>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <Rating value={product.rating} text={`${product.rating}`} size="xs" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                    {product.weight}
                  </span>
                </div>

                {/* Price and move-to-cart controls */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-100/50 dark:border-slate-800/40">
                  <div className="flex flex-col">
                    {product.originalPrice > product.price && (
                      <span className="text-[10px] text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    <span className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-colors focus:outline-none"
                  >
                    <FaShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 glass-card rounded-[32px] border border-slate-100 dark:border-slate-800/40 my-6 gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
            <FaHeart className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
              Explore our fresh organic collection and tap the heart icon on cards to save your favorites.
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            Explore Store
          </Link>
        </div>
      )}

    </div>
  );
}
