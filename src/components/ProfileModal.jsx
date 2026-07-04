import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout } = useCart();

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    alert("Logged out successfully.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-stack-lg shadow-2xl z-10 animate-fade-in flex flex-col h-[540px] max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 rounded-full transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* User Card Header */}
        <div className="flex flex-col items-center border-b border-outline-variant/20 pb-4 mb-6">
          <span className="w-16 h-16 rounded-full bg-primary-container text-white flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[32px]">person</span>
          </span>
          <h2 className="font-display-lg text-headline-sm text-on-surface leading-tight">
            {user.name}
          </h2>
          <p className="text-xs text-on-surface-variant mt-1 font-label-caps lowercase">
            {user.email}
          </p>
        </div>

        {/* Order History Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <h3 className="font-headline-sm text-sm font-semibold uppercase tracking-wider mb-3 text-primary flex items-center gap-1 border-b border-outline-variant/10 pb-1">
            <span className="material-symbols-outlined text-[18px]">history</span>
            Order History
          </h3>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {user.orderHistory.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant opacity-60">
                <span className="material-symbols-outlined text-[40px] mb-2 select-none">
                  receipt_long
                </span>
                <p className="text-sm">No purchases recorded yet.</p>
                <p className="text-[11px] mt-0.5">Your completed orders will appear here.</p>
              </div>
            ) : (
              user.orderHistory.map((order, idx) => (
                <div 
                  key={idx} 
                  className="bg-surface-container-low p-3.5 rounded border border-outline-variant/10 space-y-2.5 text-xs text-on-surface-variant"
                >
                  <div className="flex justify-between font-label-caps uppercase tracking-wider pb-1.5 border-b border-outline-variant/10">
                    <span className="text-on-surface font-bold">Ref: {order.orderRef}</span>
                    <span className="text-primary font-bold">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between text-on-surface">
                        <span className="truncate max-w-[280px]">
                          {item.product.name} <span className="text-[10px] text-on-surface-variant">({item.variant.split(' / ')[0]})</span>
                        </span>
                        <span className="text-on-surface-variant whitespace-nowrap">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Log out */}
        <div className="pt-stack-lg border-t border-outline-variant/20 mt-6">
          <button
            onClick={handleLogout}
            className="w-full border border-error text-error hover:bg-error hover:text-white py-3.5 font-button text-button uppercase tracking-widest active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Log Out of Profile
          </button>
        </div>
      </div>
    </div>
  );
}
