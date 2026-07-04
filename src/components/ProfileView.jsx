import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProfileView() {
  const { user, login, logout } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (isSignUp && !form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isSignUp) {
        login(form.email, form.password, form.name);
        alert(`Account created successfully. Welcome, ${form.name}!`);
      } else {
        const loggedUser = login(form.email, form.password);
        alert(`Welcome back, ${loggedUser.name}!`);
      }
      setForm({ name: '', email: '', password: '' });
      setErrors({});
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  const handleLogout = () => {
    logout();
    alert("Logged out successfully.");
  };

  return (
    <div className="max-w-6xl mx-auto py-stack-md transition-all duration-300">
      {user ? (
        /* Authenticated Dashboard */
        <div className="space-y-stack-lg animate-fade-in">
          {/* Editorial Header */}
          <header className="mb-stack-lg border-b border-outline-variant/20 pb-stack-lg">
            <span className="font-label-caps text-xs text-primary block tracking-widest uppercase mb-2">
              Customer Portal
            </span>
            <h1 className="font-display-lg text-display-lg text-primary leading-tight">
              My Profile
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Manage your personal information, view order details, and track your purchase history.
            </p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left Card - User Info */}
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant/10 rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
              <span className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-outline-variant text-white flex items-center justify-center mb-4 shadow-inner">
                <span className="material-symbols-outlined text-[48px]">person</span>
              </span>
              
              <h2 className="font-display-lg text-headline-sm text-on-surface leading-tight font-bold">
                {user.name}
              </h2>
              
              <p className="text-sm text-on-surface-variant mt-1.5 lowercase tracking-wider">
                {user.email}
              </p>

              <div className="w-full border-t border-outline-variant/20 my-6 pt-6 text-left space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Status</span>
                  <span className="text-primary font-bold uppercase tracking-wider">Verified Client</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Joined</span>
                  <span className="text-on-surface font-semibold">July 2026</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Preferred Shop</span>
                  <span className="text-on-surface font-semibold">Lumen Online</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full border border-error text-error hover:bg-error hover:text-white py-3.5 font-button text-button uppercase tracking-widest active:scale-95 transition-all shadow-sm cursor-pointer mt-2"
              >
                Log Out of Profile
              </button>
            </div>

            {/* Right Card - Order History */}
            <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant/10 rounded-xl p-8 shadow-sm h-[580px] flex flex-col">
              <h3 className="font-headline-sm text-headline-sm font-semibold uppercase tracking-wider mb-6 text-primary flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                <span className="material-symbols-outlined text-[24px]">history</span>
                Order History
              </h3>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {user.orderHistory.length === 0 ? (
                  <div className="text-center py-20 text-on-surface-variant opacity-60 flex flex-col items-center justify-center h-full">
                    <span className="material-symbols-outlined text-[64px] mb-3 text-outline select-none">
                      receipt_long
                    </span>
                    <p className="font-display-lg text-headline-sm text-on-surface-variant mb-1">No Purchases Found</p>
                    <p className="text-sm">Your completed transactions will be listed here.</p>
                  </div>
                ) : (
                  user.orderHistory.map((order, idx) => (
                    <div 
                      key={idx} 
                      className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/20 space-y-4 text-sm text-on-surface-variant hover:border-primary/30 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-label-caps uppercase tracking-wider pb-3 border-b border-outline-variant/10 gap-2">
                        <div>
                          <span className="text-on-surface font-bold mr-3">Ref: {order.orderRef}</span>
                          <span className="text-[11px] text-on-surface-variant font-medium normal-case">Lumen Flagship Order</span>
                        </div>
                        <span className="text-primary font-bold text-base">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex justify-between items-center text-on-surface">
                            <span className="font-medium">
                              {item.product.name} 
                              <span className="text-xs text-on-surface-variant/80 ml-2">
                                ({item.variant.split(' / ')[0]})
                              </span>
                            </span>
                            <span className="text-on-surface-variant whitespace-nowrap bg-surface-container-low px-2 py-0.5 rounded text-xs font-semibold">
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
          </div>
        </div>
      ) : (
        /* Guest - Sign In / Sign Up View */
        <div className="max-w-md mx-auto py-12 animate-fade-in">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 md:p-10 shadow-xl">
            {/* Tab Selection */}
            <div className="flex border-b border-outline-variant/20 mb-8 pb-0.5">
              <button
                onClick={() => { setIsSignUp(false); setErrors({}); }}
                className={`flex-1 text-center font-label-caps text-xs pb-3 tracking-widest uppercase cursor-pointer transition-all ${
                  !isSignUp 
                    ? 'text-primary font-bold border-b-2 border-primary' 
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsSignUp(true); setErrors({}); }}
                className={`flex-1 text-center font-label-caps text-xs pb-3 tracking-widest uppercase cursor-pointer transition-all ${
                  isSignUp 
                    ? 'text-primary font-bold border-b-2 border-primary' 
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Title */}
            <span className="font-label-caps text-[10px] text-primary mb-2 block tracking-widest uppercase text-center font-bold">
              {isSignUp ? 'Join Lumen & Co' : 'Welcome Back'}
            </span>
            <h2 className="font-display-lg text-headline-sm text-center text-on-surface mb-8">
              {isSignUp ? 'Create Your Account' : 'Sign In to Your Profile'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`h-12 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                      errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/40 hover:border-outline'
                    }`}
                    placeholder="e.g. Julian Thorne"
                    required={isSignUp}
                  />
                  {errors.name && <span className="text-xs text-error">{errors.name}</span>}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`h-12 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                    errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/40 hover:border-outline'
                  }`}
                  placeholder="julian@example.com"
                  required
                />
                {errors.email && <span className="text-xs text-error">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`h-12 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all ${
                    errors.password ? 'border-error ring-1 ring-error' : 'border-outline-variant/40 hover:border-outline'
                  }`}
                  placeholder="••••••••"
                  required
                />
                {errors.password && <span className="text-xs text-error">{errors.password}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer mt-4"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-on-surface-variant mt-8">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
              <button 
                onClick={toggleMode}
                className="text-primary font-bold hover:underline transition-all"
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
