import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPlus, FaMinus, FaShoppingBag, FaStar, FaChevronRight } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/Breadcrumb';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, quickViewProduct, setQuickViewProduct } = useApp();
  
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const matched = products.find(p => p.id === id);
    if (matched) {
      setProduct(matched);
      setActiveImage(matched.image);
      setQty(1);

      // Create a mock image gallery using the primary image and Unsplash variations
      setGallery([
        matched.image,
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80"
      ]);
    } else {
      setProduct(null);
    }
    // Scroll page to top on product change
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Product Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-bold">
          Back to Store
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  // Filter 4 related products in the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8 pb-12">
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

      {/* Breadcrumbs */}
      <Breadcrumb
        paths={[
          { name: 'Products', link: '/products' },
          { name: product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' '), link: `/products?category=${product.category}` },
          { name: product.name }
        ]}
      />

      {/* Main product display grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8 glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40">
        
        {/* Left: Gallery Panel */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-md">
                {product.discount}% OFF
              </span>
            )}
          </div>
          {/* Thumbnails grid */}
          <div className="grid grid-cols-4 gap-4">
            {gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(imgUrl)}
                className={`aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 dark:bg-slate-950/40 transition-all ${
                  activeImage === imgUrl ? 'border-primary-500 shadow-md' : 'border-slate-200/50 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details info */}
        <div className="flex flex-col text-left justify-between py-2">
          <div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2 block">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-5 border-b border-slate-100 dark:border-slate-800 pb-5">
              <Rating value={product.rating} text={`${product.rating} (${product.reviewsCount} customer reviews)`} size="sm" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-0.5 rounded-lg border border-slate-200/20">
                {product.weight}
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-6 bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-800/40">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md ml-2 border border-emerald-500/10">
                    Save ₹{product.originalPrice - product.price} flat!
                  </span>
                </>
              )}
            </div>

            {/* Quantity counters and buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/40">
                <button
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FaMinus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(prev => prev + 1)}
                  className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FaPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 py-3 px-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-colors focus:outline-none"
              >
                <FaShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 py-3 px-8 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-bold shadow-md shadow-primary-500/10 transition-colors focus:outline-none"
              >
                <span>Buy Now</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  wishlisted
                    ? 'border-rose-500 bg-rose-500/5 text-rose-500'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:text-rose-500'
                }`}
                aria-label="Wishlist toggle"
              >
                {wishlisted ? <FaHeart className="w-4.5 h-4.5" /> : <FaRegHeart className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Quick delivery promise */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5 text-xs font-semibold text-slate-500 dark:text-slate-400 flex flex-col gap-2">
            <div>🚀 Delivery Location: <strong className="text-slate-700 dark:text-slate-200">Express delivery within 4 hours in Bangalore.</strong></div>
            <div>🛡️ Quality Promise: <strong className="text-slate-700 dark:text-slate-200">100% replacement guarantee if items are damaged or stale.</strong></div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="glass-card rounded-[32px] border border-slate-100/60 dark:border-slate-800/40 overflow-hidden shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          {[
            { id: 'description', label: 'Product Description' },
            { id: 'specifications', label: 'Specifications' },
            { id: 'ingredients', label: 'Ingredients & Nutrition' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-xs md:text-sm font-bold border-b-2 transition-all outline-none ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 md:p-8 text-left text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {activeTab === 'description' && (
            <div className="flex flex-col gap-4">
              <p>{product.description}</p>
              <p>Standard grocery products sourced and selected meticulously to ensure that families in Bangalore get fresh, daily supplies. Quality checked prior to shipping.</p>
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div className="max-w-md flex flex-col gap-3">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-400 font-medium">{key}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">List of Ingredients:</h4>
              <ul className="list-disc list-inside flex flex-col gap-1.5 pl-2 font-medium">
                {product.ingredients?.map((ing, i) => (
                  <li key={i}>{ing}</li>
                )) || <li>100% natural, fresh and single-ingredient product.</li>}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
              Related Products
            </h2>
            <Link
              to={`/products?category=${product.category}`}
              className="flex items-center gap-1 text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
            >
              View More <FaChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
