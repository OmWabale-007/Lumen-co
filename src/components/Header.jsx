import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import ProfileModal from './ProfileModal';

export default function Header() {
  const { 
    getCartCount, 
    setIsCartOpen, 
    currentView,
    setCurrentView, 
    activeCategory, 
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    user
  } = useCart();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavClick = (view, category) => {
    setActiveCategory(category);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renamed "Curated" to "Accessories"
  const navItems = [
    { label: 'Shop All', view: 'shop', category: 'All Objects' },
    { label: 'Menswear', view: 'menswear', category: 'Menswear' },
    { label: 'Profile', view: 'profile', category: 'Profile' },
    { label: 'Skincare', view: 'skincare', category: 'Skincare' },
    { label: 'Accessories', view: 'accessories', category: 'Accessories' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md shadow-sm border-b border-outline-variant/10 h-20 transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-full w-full max-w-container-max mx-auto">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-stack-lg">
          <h1 
            onClick={handleLogoClick}
            className="font-display-lg text-headline-md md:text-display-lg text-primary tracking-tighter cursor-pointer select-none active:opacity-75 transition-opacity"
          >
            LUMEN & CO
          </h1>
          <nav className="hidden md:flex items-center gap-stack-md ml-stack-lg">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view, item.category)}
                className={`font-label-caps text-label-caps pb-1 transition-all cursor-pointer ${
                  currentView === item.view 
                    ? 'text-primary font-bold border-b-2 border-primary' 
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search & Action Icons */}
        <div className="flex items-center gap-stack-md">
          {/* Search bar */}
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none select-none">
              search
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search curated goods..." 
              className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-md font-body-md focus:ring-1 focus:ring-primary w-48 md:w-64 transition-all duration-300 placeholder:text-on-surface-variant/50"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary text-sm font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search icon for mobile */}
          <button 
            onClick={() => {
              const query = prompt("Search curated goods:") || "";
              setSearchTerm(query);
            }}
            className="sm:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-75"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Profile Icon button */}
          <button 
            onClick={() => handleNavClick('profile', 'Profile')}
            className={`p-2 relative cursor-pointer active:scale-95 text-primary hover:bg-surface-container-low rounded-full transition-all ${
              currentView === 'profile' ? 'bg-surface-container-low' : ''
            }`}
            aria-label="User Profile"
          >
            <span className="material-symbols-outlined text-[26px]">person</span>
            {user && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full shadow-sm"></span>
            )}
          </button>

          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 relative cursor-pointer active:scale-95 text-primary hover:bg-surface-container-low rounded-full transition-all"
            id="openCart"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[26px]">shopping_bag</span>
            {getCartCount() > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse shadow-md">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Auth Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
}
