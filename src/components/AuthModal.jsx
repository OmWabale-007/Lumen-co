import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

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
      onClose();
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-stack-lg shadow-2xl z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 rounded-full transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Tab Selection */}
        <div className="flex border-b border-outline-variant/20 mb-6 pb-0.5">
          <button
            onClick={() => { setIsSignUp(false); setErrors({}); }}
            className={`flex-1 text-center font-label-caps text-xs pb-3 tracking-widest uppercase cursor-pointer ${
              !isSignUp 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant font-medium hover:text-primary'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsSignUp(true); setErrors({}); }}
            className={`flex-1 text-center font-label-caps text-xs pb-3 tracking-widest uppercase cursor-pointer ${
              isSignUp 
                ? 'text-primary font-bold border-b-2 border-primary' 
                : 'text-on-surface-variant font-medium hover:text-primary'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Forms */}
        <span className="font-label-caps text-[10px] text-primary mb-2 block tracking-widest uppercase text-center">
          {isSignUp ? 'Join Lumen & Co' : 'Welcome Back'}
        </span>
        <h2 className="font-display-lg text-headline-sm text-center text-on-surface mb-6">
          {isSignUp ? 'Create Your Account' : 'Sign In to Your Profile'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[11px] text-on-surface-variant">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`h-11 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary ${
                  errors.name ? 'border-error ring-1 ring-error' : 'border-outline/40'
                }`}
                placeholder="e.g. Julian Thorne"
                required={isSignUp}
              />
              {errors.name && <span className="text-xs text-error">{errors.name}</span>}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-label-caps text-[11px] text-on-surface-variant">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`h-11 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary ${
                errors.email ? 'border-error ring-1 ring-error' : 'border-outline/40'
              }`}
              placeholder="julian@example.com"
              required
            />
            {errors.email && <span className="text-xs text-error">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-caps text-[11px] text-on-surface-variant">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`h-11 px-4 rounded border bg-surface-bright font-body-md text-sm focus:ring-1 focus:ring-primary ${
                errors.password ? 'border-error ring-1 ring-error' : 'border-outline/40'
              }`}
              placeholder="••••••••"
              required
            />
            {errors.password && <span className="text-xs text-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3.5 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer mt-4"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-on-surface-variant mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button 
            onClick={toggleMode}
            className="text-primary font-bold hover:underline"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
