import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // clear msg after 5s
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="w-full py-section-gap bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant/10">
      <div className="flex flex-col items-center gap-stack-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto text-center">
        {/* Brand Name */}
        <span className="font-display-lg text-headline-sm md:text-headline-md text-primary tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
          LUMEN & CO
        </span>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {['Sustainability', 'Contact', 'Shipping', 'Returns'].map(link => (
            <a 
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                alert(`This is a demo link for the ${link} policy.`);
              }}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Newsletter Signup Form */}
        <div className="w-full max-w-md mt-4">
          <p className="font-label-caps text-xs text-on-surface-variant mb-4 uppercase tracking-widest">
            Join our Newsletter
          </p>
          {subscribed ? (
            <div className="text-primary text-sm font-semibold py-2 animate-fade-in">
              ✓ Thank you for subscribing to our curated editions.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-on-surface-variant/30 pb-2">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-transparent border-none w-full text-body-md font-body-md focus:ring-0 placeholder:text-on-surface-variant/40 text-on-surface"
                required
              />
              <button 
                type="submit"
                className="material-symbols-outlined text-primary hover:scale-110 active:scale-95 transition-transform"
                aria-label="Subscribe"
              >
                arrow_forward
              </button>
            </form>
          )}
        </div>

        {/* Copyright */}
        <p className="font-body-md text-xs text-on-surface-variant opacity-60 mt-stack-lg">
          © {new Date().getFullYear()} LUMEN & CO. All rights reserved. Built with Vite, React, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
