import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card-hover group cursor-pointer flex flex-col h-full bg-surface-container-lowest/20 rounded-md overflow-hidden border border-transparent hover:border-outline-variant/10 hover:shadow-sm p-2 transition-all duration-300">
      {/* Product Image and Hover Overlay */}
      <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden rounded-sm mb-4">
        <img 
          src={product.image} 
          alt={product.alt || product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Quick Add Button Overlay */}
        <div className="add-to-cart-overlay absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-on-surface text-surface py-3 font-button text-button uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300 shadow-md active:scale-95 transform cursor-pointer"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
            {product.category}
          </p>
          <div className="flex flex-col mb-1">
            <h3 className="font-headline-sm text-[16px] md:text-[18px] text-on-surface leading-snug font-medium">
              {product.name}
            </h3>
            <span className="font-body-md text-sm md:text-body-md text-primary font-bold mt-1">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest mt-1 opacity-80">
          {product.options && product.options[0] ? product.options[0].split(' / ')[0] : 'Standard'} / {product.description.slice(0, 30)}...
        </p>
      </div>
    </div>
  );
}
