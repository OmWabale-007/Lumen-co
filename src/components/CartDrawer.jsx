import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    setCurrentView,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    addToCart
  } = useCart();

  // Find a recommended product that is not currently in the cart
  const cartProductIds = cartItems.map(item => item.product.id);
  const recommendedProduct = products.find(p => !cartProductIds.includes(p.id)) || products[0];

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subtotal = getSubtotal();
  const freeShippingLimit = 25000; // ₹25,000 free shipping limit in India
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingLimit) * 100);

  return (
    <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible pointer-events-none'}`}>
      {/* Backdrop overlay */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className={`absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer content panel */}
      <div 
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-surface-container-lowest border-l border-outline-variant/10 shadow-2xl flex flex-col h-full transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col p-stack-lg border-b border-surface-container-highest">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">Shopping Bag</h2>
              <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase mt-1">
                Exquisite choices await
              </p>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-surface-container-low transition-all rounded-full active:scale-95 cursor-pointer text-primary"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Bar (Premium Touch) */}
          {subtotal > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-on-surface-variant font-label-caps uppercase tracking-wider mb-1">
                <span>
                  {subtotal >= freeShippingLimit 
                    ? "You've unlocked complimentary shipping!" 
                    : `Add ₹${(freeShippingLimit - subtotal).toLocaleString('en-IN')} more for free shipping`}
                </span>
              </div>
              <div className="w-full bg-surface-container h-[4px] rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500" 
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-stack-lg flex flex-col gap-stack-lg custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-[60px] opacity-40 mb-4 select-none">
                shopping_bag
              </span>
              <p className="font-headline-sm text-headline-sm text-primary mb-2">Your Bag is Empty</p>
              <p className="text-body-md max-w-[250px] mx-auto text-sm">
                Explore our collections to add premium menswear or skincare items to your ritual.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 bg-primary text-on-primary px-6 py-3 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div 
                key={`${item.product.id}-${item.variant}-${index}`} 
                className="flex gap-4 pb-4 border-b border-surface-container-high last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="w-20 h-28 md:w-24 md:h-32 flex-shrink-0 bg-surface-container-low overflow-hidden rounded-sm">
                  <img 
                    src={item.product.image} 
                    alt={item.product.alt} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="font-headline-sm text-[16px] md:text-[18px] leading-tight text-on-surface font-semibold truncate max-w-[160px]">
                        {item.product.name}
                      </h5>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.variant)}
                        className="text-on-surface-variant hover:text-error transition-colors cursor-pointer active:scale-90"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                    {/* Variant details / Selector */}
                    {item.product.options && item.product.options.length > 1 ? (
                      <select 
                        value={item.variant}
                        onChange={(e) => {
                          removeFromCart(item.product.id, item.variant);
                          addToCart(item.product, e.target.value);
                        }}
                        className="font-label-caps text-[11px] text-on-surface-variant border-none bg-transparent p-0 mt-1 focus:ring-0 cursor-pointer hover:text-primary transition-colors"
                      >
                        {item.product.options.map(opt => (
                          <option key={opt} value={opt} className="bg-background text-on-surface">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="font-label-caps text-[11px] text-on-surface-variant mt-1">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  
                  {/* Quantity and Price */}
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-outline-variant/30 rounded-sm bg-surface-bright shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant, -1)}
                        className="px-2 py-1 hover:bg-surface-container-low transition-all cursor-pointer text-primary active:scale-75"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-[16px] font-bold">remove</span>
                      </button>
                      <span className="px-3 font-body-md text-on-surface text-sm">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant, 1)}
                        className="px-2 py-1 hover:bg-surface-container-low transition-all cursor-pointer text-primary active:scale-75"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-[16px] font-bold">add</span>
                      </button>
                    </div>
                    <p className="font-body-md font-bold text-primary text-sm md:text-base">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Upsell / Recommended Section (Premium feature matching Screen 2) */}
          {cartItems.length > 0 && recommendedProduct && (
            <div className="mt-4 border-t border-surface-container-highest pt-4 bg-surface-container-low/20 p-3 rounded-lg">
              <h6 className="font-label-caps text-[10px] text-on-surface-variant mb-3 uppercase tracking-widest">
                Recommended for You
              </h6>
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-surface-container-low rounded-sm overflow-hidden flex-shrink-0">
                  <img 
                    src={recommendedProduct.image} 
                    alt={recommendedProduct.alt} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-headline-sm text-xs font-semibold text-on-surface truncate max-w-[160px]">
                    {recommendedProduct.name}
                  </span>
                  <span className="text-primary text-[12px] font-bold mt-0.5">
                    ₹{recommendedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <button 
                  onClick={() => addToCart(recommendedProduct)}
                  className="flex items-center justify-center p-2 bg-primary text-on-primary hover:opacity-90 rounded-full transition-all active:scale-90"
                  title="Add recommendation to cart"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        {cartItems.length > 0 && (
          <div className="p-stack-lg bg-surface-container-lowest border-t border-surface-container-highest shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-3 mb-stack-lg">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-on-surface-variant text-sm">Subtotal</span>
                <span className="font-headline-sm text-lg font-bold text-primary">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-body-md text-on-surface-variant">Shipping</span>
                <span className="font-body-md text-on-surface uppercase tracking-wider font-semibold">
                  {subtotal >= freeShippingLimit ? "Complimentary" : "Calculated at checkout"}
                </span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary text-on-primary py-4 md:py-5 font-button text-button uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <div className="mt-4 flex justify-center items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">
                Complimentary shipping on orders over ₹{freeShippingLimit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
