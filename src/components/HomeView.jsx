import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function HomeView() {
  const { setCurrentView, setActiveCategory } = useCart();

  const handleNavClick = (view, category) => {
    setActiveCategory(category);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get featured products for display
  const featuredIds = ['cashmere-overcoat', 'botanical-serum', 'heritage-weekender', 'nadir-wristwatch'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  return (
    <div className="space-y-section-gap pb-section-gap">
      {/* Editorial Hero Banner */}
      <section className="relative h-[560px] md:h-[700px] flex items-center justify-center overflow-hidden bg-surface-container-low rounded-lg shadow-sm">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] scale-100 hover:scale-105"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoGZmap7d2KUXnuCjJqs9oJ6y5KPWL4PcRHxMXhZVwj7iC8M7EuJBqfL7FLSWGpnNCO_DdNtagPLmp97DPcoGbS7Cf5CjzXbtP0tXB2s4gqBUQWT2cNPs7ZWmV-qTp6PMnXO1VmGDau6pkeIwNFJR_R9KFjJsvzwZ2OX7rhu6gHqGbsdAlucV2-43mXtK6b9skzwhHzIcySqNi86VdnMiTlxMZAx9FnW7B6aCFBbQAEWczo31u47jV')` 
            }}
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl px-margin-mobile text-white">
          <span className="font-label-caps text-xs text-primary-fixed block tracking-widest uppercase mb-4">
            Curated Essentials
          </span>
          <h2 className="font-display-lg text-headline-md md:text-display-lg mb-stack-md leading-tight text-background">
            Quiet Luxury for the Modern Individual
          </h2>
          <p className="font-body-lg text-sm md:text-body-lg text-surface-container-low mb-stack-lg max-w-xl mx-auto leading-relaxed opacity-90">
            A serene digital shopping environment. Explore our collection of premium, sustainably sourced menswear and botanical skincare rituals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleNavClick('menswear', 'Menswear')}
              className="bg-primary-fixed text-on-primary-fixed px-8 py-4 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Shop Menswear
            </button>
            <button 
              onClick={() => handleNavClick('skincare', 'Skincare')}
              className="border border-background text-background hover:bg-background hover:text-primary px-8 py-4 font-button text-button uppercase tracking-widest active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Shop Skincare
            </button>
          </div>
        </div>
      </section>

      {/* Collection Categories Teasers */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-label-caps text-xs text-primary block tracking-widest uppercase mb-2">
            The Collections
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            A Study in Texture and Formulation
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Menswear Teaser */}
          <div 
            onClick={() => handleNavClick('menswear', 'Menswear')}
            className="group cursor-pointer relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shadow-sm"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNEi5NBVPnkTPaMkWHzdOsU2V2uftuGX3V1D8HBPqHleH7K8kdeyf38cXfIfn5O7eXW3AUdmysG9jVfoKdY74IzShV-V9uu4FBJ8uA0w89Ki8l_yeKWy7gEV07B-AZWxSw1-PLAQyMQ8HYMJBMhCD-mbjXTdM2MxIExKFUzcU2k-risY97m0XSSwIf4IwPkjoER-T3OOAC6Rn9cudTEV12JKH-uKnFwYI9PZ9PJfmdGIKRkbe1_AUn"
              alt="Menswear linen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-label-caps text-[10px] text-primary-fixed uppercase tracking-wider mb-1">
                Proportion & Form
              </span>
              <h4 className="font-headline-sm text-white mb-3">Menswear Edition</h4>
              <span className="text-xs text-white underline underline-offset-4 font-semibold group-hover:text-primary-fixed transition-colors">
                Discover The Wardrobe →
              </span>
            </div>
          </div>

          {/* Skincare Teaser */}
          <div 
            onClick={() => handleNavClick('skincare', 'Skincare')}
            className="group cursor-pointer relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shadow-sm"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUXqstD2IigoOFaBMbsMPZnf_D0vGlIioSDUfCLJyx96H4WP7wpmBXYFSCM1pLXFwiHD7m_4V9ZNgjLmBR01uNQoEYymvmjNBSvAfukD18JFP2nBY3tHV1KVuewkaQQ6er6u89JJhPvyF2jlezHtckXXUezlU4zhysQ_KFjNIbDYG_N_Lv232zgxrLyYTwe5HEtx438-6FvKZyclwEtLJRtIN08sCb4lgOHyqhSZb2cHNX34mg-Asg"
              alt="Skincare amber bottle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-label-caps text-[10px] text-primary-fixed uppercase tracking-wider mb-1">
                Botanical Extracts
              </span>
              <h4 className="font-headline-sm text-white mb-3">Skincare Rituals</h4>
              <span className="text-xs text-white underline underline-offset-4 font-semibold group-hover:text-primary-fixed transition-colors">
                Discover The Rituals →
              </span>
            </div>
          </div>

          {/* Accessories Teaser (Renamed from Curated Accessories to Accessories) */}
          <div 
            onClick={() => handleNavClick('accessories', 'Accessories')}
            className="group cursor-pointer relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shadow-sm"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzAzNdPaU1tBQzBqAouv48yc3Ets4EbTmYEGxuqBEUH0b0mfYmut6KmaeBbFvCazPbsFUsEuuIKw7NQOWq64-bUAVPXTJZSvvMy4OCpvKjkDSRaxFSdkGjbBJ7aJz4sZQ66RYtOJ7AuUjWiDzlVIRPR0zGslGuKVGq5id2krSXyHhWffmc3QmYBvUurL_m3sxlbYv05mdeLbOaotD-dmQW6dLLzqlx8cFtbE9KKVd4EMkNaGDJt27s"
              alt="Watch accessory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-label-caps text-[10px] text-primary-fixed uppercase tracking-wider mb-1">
                Crafted Details
              </span>
              <h4 className="font-headline-sm text-white mb-3">Accessories</h4>
              <span className="text-xs text-white underline underline-offset-4 font-semibold group-hover:text-primary-fixed transition-colors">
                Discover The Artifacts →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Narrative (Premium Editorial) */}
      <section className="bg-surface-container-low rounded-lg p-8 md:p-12 border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="font-label-caps text-xs text-primary block tracking-widest uppercase">
            The Philosophy
          </span>
          <h3 className="font-display-lg text-headline-md md:text-headline-md text-on-surface leading-tight">
            Designed for stillness, made for longevity.
          </h3>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
            Our brand is built like a physical flagship store: quiet, spacious, and meticulously organized. We reject unnecessary decorative clutter to ensure the focus remains on the tactile quality of the merchandise. 
          </p>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
            Every garment uses sustainably sourced organic fibers, and each skincare bottle holds cold-pressed botanical oils selected for maximum bio-active purity. We believe in curated essentials that honor both the body and the environment.
          </p>
        </div>
        <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-surface-container-high shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop"
            alt="Organic linen details"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Featured Objects Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-label-caps text-xs text-primary block tracking-widest uppercase mb-1">
              Curated Selection
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Featured Objects</h3>
          </div>
          <button 
            onClick={() => handleNavClick('shop', 'All Objects')}
            className="font-label-caps text-xs text-primary border-b border-primary pb-1 uppercase tracking-wider hover:opacity-75 transition-all cursor-pointer"
          >
            View All Objects →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
