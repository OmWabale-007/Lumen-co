import React from 'react';
import { useCart } from '../context/CartContext';

export default function SuccessModal({ isOpen, onClose, orderDetails }) {
  const { setCurrentView } = useCart();
  if (!isOpen || !orderDetails) return null;

  const handleReturn = () => {
    onClose();
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={handleReturn}
        className="absolute inset-0 bg-on-surface/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Content Card */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-stack-lg shadow-2xl z-10 transform scale-100 transition-all duration-300 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <span className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px] font-bold">verified</span>
          </span>
        </div>

        <span className="font-label-caps text-xs text-primary mb-2 block tracking-widest uppercase">
          Order Confirmed
        </span>
        <h2 className="font-display-lg text-headline-md text-on-surface mb-2">
          Thank you for your purchase
        </h2>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mx-auto mb-6">
          Your order has been received and is being prepared with absolute care. An email confirmation has been sent to <span className="font-semibold text-on-surface">{orderDetails.email}</span>.
        </p>

        {/* Order Details Card */}
        <div className="bg-surface-container-low text-left p-4 rounded-md border border-outline-variant/10 mb-6 space-y-3">
          <div className="flex justify-between text-xs font-label-caps text-on-surface-variant uppercase tracking-wider pb-2 border-b border-outline-variant/20">
            <span>Order Reference</span>
            <span className="text-on-surface font-bold">{orderDetails.orderRef}</span>
          </div>
          
          <div className="max-h-36 overflow-y-auto space-y-2 custom-scrollbar">
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-on-surface truncate max-w-[220px]">
                  {item.product.name} <span className="text-xs text-on-surface-variant font-semibold">({item.variant.split(' / ')[0]})</span>
                  <span className="text-on-surface-variant ml-1 font-normal">x{item.quantity}</span>
                </span>
                <span className="text-primary font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-outline-variant/20">
            <span>Total ({orderDetails.paymentMethod})</span>
            <span>₹{orderDetails.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button 
          onClick={handleReturn}
          className="w-full bg-primary text-on-primary py-4 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
}
