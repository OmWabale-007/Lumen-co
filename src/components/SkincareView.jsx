import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function SkincareView() {
  // Filter only Skincare category items
  const skincareItems = products.filter(p => p.category === 'Skincare');

  return (
    <div className="space-y-stack-lg pb-section-gap">
      {/* Editorial Title Banner */}
      <header className="mb-stack-lg max-w-3xl border-b border-outline-variant/20 pb-stack-lg">
        <span className="font-label-caps text-xs text-primary block tracking-widest uppercase mb-2">
          Botanical Science
        </span>
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-sm leading-tight">
          Skincare / Apothecary
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Formulated to restore natural cellular balance. Crafted with active organic lipids, cold-pressed fruit acids, and soothing kaolin minerals. Clean formulas for daily self-restoration.
        </p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-gutter gap-y-stack-lg">
        {skincareItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
