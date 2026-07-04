import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import MenswearView from './components/MenswearView';
import SkincareView from './components/SkincareView';
import AccessoriesView from './components/AccessoriesView';
import CheckoutView from './components/CheckoutView';
import ProfileView from './components/ProfileView';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

function AppContent() {
  const { currentView, isCartOpen } = useCart();

  // Control overflow-hidden on body when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-open');
    } else {
      document.body.classList.remove('cart-open');
    }
  }, [isCartOpen]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <CatalogView />;
      case 'menswear':
        return <MenswearView />;
      case 'skincare':
        return <SkincareView />;
      case 'accessories':
        return <AccessoriesView />;
      case 'checkout':
        return <CheckoutView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Header bar */}
      <Header />

      {/* Main Container */}
      <main className="flex-grow pt-28 pb-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full transition-opacity duration-300">
        {renderView()}
      </main>

      {/* Shopping Bag Sliding Drawer */}
      <CartDrawer />

      {/* Page Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
