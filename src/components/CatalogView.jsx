import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function CatalogView() {
  const { activeCategory, setActiveCategory, searchTerm } = useCart();

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All Objects' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All Objects', 'Menswear', 'Skincare', 'Accessories'];

  return (
    <div className="space-y-section-gap pb-section-gap">
      {/* Hero Section */}
      <section className="relative h-[480px] md:h-[640px] flex items-center justify-center overflow-hidden bg-surface-container-low rounded-lg shadow-sm">
        {/* Background Image with Zoom Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] hover:scale-105" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoGZmap7d2KUXnuCjJqs9oJ6y5KPWL4PcRHxMXhZVwj7iC8M7EuJBqfL7FLSWGpnNCO_DdNtagPLmp97DPcoGbS7Cf5CjzXbtP0tXB2s4gqBUQWT2cNPs7ZWmV-qTp6PMnXO1VmGDau6pkeIwNFJR_R9KFjJsvzwZ2OX7rhu6gHqGbsdAlucV2-43mXtK6b9skzwhHzIcySqNi86VdnMiTlxMZAx9FnW7B6aCFBbQAEWczo31u47jV')` 
            }}
            aria-label="Terra & Thread interior flagship showroom"
          />
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl px-margin-mobile">
          <span className="font-label-caps text-xs text-primary mb-3 block tracking-widest uppercase">
            The Autumn / Winter Collection
          </span>
          <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-surface mb-stack-md leading-tight">
            Quiet Luxury for the Modern Individual
          </h2>
          <p className="font-body-lg text-sm md:text-body-lg text-on-surface-variant mb-stack-lg max-w-xl mx-auto leading-relaxed">
            Explore our meticulously curated selection of sustainably sourced menswear, tailored knitwear, and organic skincare essentials.
          </p>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog-grid" className="scroll-mt-24">
        {/* Section Title and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-stack-lg gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-headline-md text-headline-md text-on-surface">New Arrivals</h3>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">Handpicked essentials for your daily ritual.</p>
          </div>
          
          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-stack-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-secondary-container text-on-secondary-container hover:bg-primary-fixed hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low/30 rounded-lg border border-outline-variant/10">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-40 mb-2 select-none">
              search_off
            </span>
            <p className="font-headline-sm text-primary mb-1">No matches found</p>
            <p className="text-sm text-on-surface-variant">Try refining your keyword search or checking another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-gutter gap-y-stack-lg">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
