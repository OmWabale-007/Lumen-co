import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('terra_thread_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'menswear' | 'skincare' | 'accessories' | 'checkout'
  const [activeCategory, setActiveCategory] = useState('All Objects');
  const [searchTerm, setSearchTerm] = useState('');

  // Auth & Profile state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('terra_thread_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist cart items to localStorage on change
  useEffect(() => {
    localStorage.setItem('terra_thread_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedVariant = null) => {
    const variant = selectedVariant || product.options[0] || "One Size";
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.variant === variant
      );
      
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { product, variant, quantity: 1 }];
      }
    });
    
    // Automatically open cart drawer for feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, variant) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.product.id === productId && item.variant === variant))
    );
  };

  const updateQuantity = (productId, variant, delta) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId && item.variant === variant) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Auth Operations
  const login = (email, password, name = null) => {
    let userData;
    if (name) {
      // Sign Up flow
      userData = { 
        name, 
        email, 
        orderHistory: [] 
      };
      localStorage.setItem(`orders_${email}`, JSON.stringify([]));
    } else {
      // Login flow
      const savedOrders = localStorage.getItem(`orders_${email}`);
      const history = savedOrders ? JSON.parse(savedOrders) : [];
      
      // Attempt to construct user name from email if not already registered
      let defaultName = 'Julian Thorne';
      if (email.includes('@')) {
        const part = email.split('@')[0];
        defaultName = part.charAt(0).toUpperCase() + part.slice(1);
      }

      userData = { 
        name: defaultName, 
        email, 
        orderHistory: history 
      };
    }
    
    setUser(userData);
    localStorage.setItem('terra_thread_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('terra_thread_user');
  };

  const addOrderToHistory = (order) => {
    if (!user) return;
    
    const updatedHistory = [order, ...user.orderHistory];
    const updatedUser = { ...user, orderHistory: updatedHistory };
    
    setUser(updatedUser);
    localStorage.setItem('terra_thread_user', JSON.stringify(updatedUser));
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedHistory));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      currentView,
      setCurrentView,
      activeCategory,
      setActiveCategory,
      searchTerm,
      setSearchTerm,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal,
      getCartCount,
      // Auth exports
      user,
      login,
      logout,
      addOrderToHistory
    }}>
      {children}
    </CartContext.Provider>
  );
};
