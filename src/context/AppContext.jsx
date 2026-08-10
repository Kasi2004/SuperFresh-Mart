import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Location state
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('location');
    return saved || 'Bengaluru Central';
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupon state
  const [coupon, setCoupon] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Quick View Product modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };



  // Available locations
  const locations = [
    'Bengaluru Central',
    'Whitefield',
    'Indiranagar',
    'Koramangala',
    'Jayanagar',
    'Yelahanka',
    'Malleshwaram',
    'HSR Layout'
  ];

  // Sync theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync wishlist to Local Storage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync cart to Local Storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // Toast Notification Trigger
  const showToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Location selector
  const updateLocation = (newLoc) => {
    setLocation(newLoc);
    localStorage.setItem('location', newLoc);
    showToast(`Delivery location updated to ${newLoc}`, 'info');
  };

  // Wishlist Actions
  const addToWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      showToast('Product already in wishlist', 'info');
      return;
    }
    setWishlist(prev => [...prev, product]);
    showToast(`${product.name} added to Wishlist!`, 'success');
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showToast('Removed from Wishlist', 'info');
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${quantity} x ${product.name} added to Cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name} from Cart`, 'info');
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    showToast('Cart cleared', 'info');
  };

  // Cart helper selectors
  const getCartSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getCartSavings = () => {
    return cart.reduce((acc, item) => {
      const discountAmount = (item.product.originalPrice - item.product.price) * item.quantity;
      return acc + discountAmount;
    }, 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    if (!coupon) return 0;
    if (coupon.type === 'percent') {
      return Math.round((subtotal * coupon.value) / 100);
    }
    if (coupon.type === 'flat') {
      return coupon.value;
    }
    return 0;
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const delivery = subtotal > 499 || subtotal === 0 ? 0 : 49;
    return Math.max(0, subtotal - discount + delivery);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Coupon application logic
  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    const subtotal = getCartSubtotal();

    if (subtotal === 0) {
      return { success: false, message: 'Cart is empty' };
    }

    if (upperCode === 'WELCOME10' || upperCode === 'DIWALI10') {
      setCoupon({ code: upperCode, type: 'percent', value: 10 });
      showToast(`${upperCode} coupon applied!`, 'success');
      return { success: true, message: '10% discount applied!' };
    }

    if (upperCode === 'FRESH50') {
      if (subtotal < 499) {
        return { success: false, message: 'Minimum order of ₹499 required for FRESH50' };
      }
      setCoupon({ code: upperCode, type: 'flat', value: 50 });
      showToast('FRESH50 coupon applied!', 'success');
      return { success: true, message: '₹50 flat discount applied!' };
    }

    if (upperCode === 'MEGASTOCK') {
      if (subtotal < 1999) {
        return { success: false, message: 'Minimum order of ₹1999 required for MEGASTOCK' };
      }
      setCoupon({ code: upperCode, type: 'flat', value: 200 });
      showToast('MEGASTOCK coupon applied!', 'success');
      return { success: true, message: '₹200 flat discount applied!' };
    }

    if (upperCode === 'BCOMBO30') {
      if (subtotal < 299) {
        return { success: false, message: 'Minimum order of ₹299 required for BCOMBO30' };
      }
      setCoupon({ code: upperCode, type: 'flat', value: 30 });
      showToast('BCOMBO30 coupon applied!', 'success');
      return { success: true, message: '₹30 flat combo discount applied!' };
    }

    if (upperCode === 'BOGOBEV') {
      // Find beverages in cart to see if eligible
      const beverageItems = cart.filter(item => item.product.category === 'beverages');
      if (beverageItems.length === 0) {
        return { success: false, message: 'Add beverages to apply BOGOBEV' };
      }
      // Calculate BOGO: free item of lowest price among beverages
      const lowestBeverage = beverageItems.reduce((min, item) => 
        item.product.price < min ? item.product.price : min, Infinity);

      setCoupon({ code: upperCode, type: 'flat', value: lowestBeverage });
      showToast('BOGOBEV coupon applied!', 'success');
      return { success: true, message: `BOGO applied! Free beverage worth ₹${lowestBeverage}` };
    }

    return { success: false, message: 'Invalid Coupon Code' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        location,
        locations,
        updateLocation,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartSubtotal,
        getCartSavings,
        getCartDiscount,
        getCartTotal,
        getCartCount,
        coupon,
        applyCoupon,
        removeCoupon,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
