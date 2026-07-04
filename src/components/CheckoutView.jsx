import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import SuccessModal from './SuccessModal';

export default function CheckoutView() {
  const { cartItems, getSubtotal, clearCart, setCurrentView, addOrderToHistory, user } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cod' | 'card'
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: user ? user.email : '',
    address: '',
    city: '',
    zip: '',
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= 25000 ? 0 : 150; // Free above ₹25,000, else ₹150
  const gstRate = 0.18; // 18% GST in India
  const tax = subtotal * gstRate;
  const total = subtotal + shippingFee + tax;

  const handleInputChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.address.trim()) newErrors.address = 'Required';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.zip.trim() || !/^\d{6}$/.test(form.zip.trim())) newErrors.zip = 'Valid 6-digit Pincode required';

    if (paymentMethod === 'upi') {
      if (!form.upiId.trim() || !form.upiId.includes('@')) {
        newErrors.upiId = 'Valid UPI ID required (e.g. username@upi)';
      }
    } else if (paymentMethod === 'card') {
      if (!form.cardNumber.replace(/\s+/g, '').match(/^\d{16}$/)) newErrors.cardNumber = '16-digit card required';
      if (!form.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) newErrors.expiry = 'MM/YY required';
      if (!form.cvv.match(/^\d{3}$/)) newErrors.cvv = '3-digit CVV required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompletePurchase = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }
    
    if (validateForm()) {
      const orderRef = "LMN" + Math.floor(100000 + Math.random() * 900000);
      const order = {
        orderRef,
        email: form.email,
        items: [...cartItems],
        total,
        paymentMethod: paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('en-IN')
      };
      
      setOrderDetails(order);
      
      // Save order to history if user logged in
      if (user) {
        addOrderToHistory(order);
      }
      
      setIsSuccessOpen(true);
    } else {
      // Find and scroll to the first error input
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const errorElement = document.getElementById(firstErrorKey);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    clearCart();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* Success Modal */}
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={handleCloseSuccess} 
        orderDetails={orderDetails} 
      />

      {/* Left Column: Checkout Forms */}
      <div className="flex-1 space-y-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-display-lg text-headline-md md:text-display-lg text-primary mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-caps text-[10px] md:text-label-caps tracking-widest uppercase">
            <span className="text-primary font-bold">Shipping</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Payment</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="opacity-50">Review</span>
          </div>
        </div>

        {/* Section 1: Shipping Details */}
        <section className="bg-surface-container-lowest p-stack-lg rounded-lg border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-stack-md mb-stack-lg border-b border-outline-variant/20 pb-stack-sm">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</span>
            <h2 className="font-headline-sm text-headline-sm">Shipping Address</h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">First Name</label>
              <input 
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.firstName ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="e.g. Julian"
              />
              {errors.firstName && <span className="text-xs text-error">{errors.firstName}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Last Name</label>
              <input 
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.lastName ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="e.g. Thorne"
              />
              {errors.lastName && <span className="text-xs text-error">{errors.lastName}</span>}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Email Address</label>
              <input 
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="julian@example.com"
              />
              {errors.email && <span className="text-xs text-error">{errors.email}</span>}
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Shipping Address</label>
              <input 
                id="address"
                type="text"
                value={form.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.address ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="Flat/House no., Street and Area details"
              />
              {errors.address && <span className="text-xs text-error">{errors.address}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">City / Town</label>
              <input 
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.city ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="New Delhi"
              />
              {errors.city && <span className="text-xs text-error">{errors.city}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Pincode (6 digits)</label>
              <input 
                id="zip"
                type="text"
                maxLength="6"
                value={form.zip}
                onChange={(e) => handleInputChange('zip', e.target.value.replace(/[^0-9]/g, ''))}
                className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                  errors.zip ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                }`}
                placeholder="110001"
              />
              {errors.zip && <span className="text-xs text-error">{errors.zip}</span>}
            </div>
          </form>
        </section>

        {/* Section 2: Payment Method */}
        <section className="bg-surface-container-lowest p-stack-lg rounded-lg border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-stack-md mb-stack-lg border-b border-outline-variant/20 pb-stack-sm">
            <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold">2</span>
            <h2 className="font-headline-sm text-headline-sm">Payment Method</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
            {/* UPI Option */}
            <label 
              onClick={() => setPaymentMethod('upi')}
              className={`relative flex items-center p-stack-md border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                paymentMethod === 'upi' 
                  ? 'border-primary bg-surface-container-low/30' 
                  : 'border-outline-variant/20 hover:bg-surface-container-low/10'
              }`}
            >
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'upi'} 
                onChange={() => {}}
                className="hidden" 
              />
              <span className={`material-symbols-outlined mr-3 ${paymentMethod === 'upi' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: paymentMethod === 'upi' ? "'FILL' 1" : "'FILL' 0" }}>
                qr_code_2
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface text-sm">UPI Payment</span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">Instant Transfer</span>
              </div>
              <div className={`ml-auto w-4 h-4 rounded-full flex items-center justify-center border ${
                paymentMethod === 'upi' ? 'border-primary' : 'border-outline-variant'
              }`}>
                {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
            </label>

            {/* COD Option */}
            <label 
              onClick={() => setPaymentMethod('cod')}
              className={`relative flex items-center p-stack-md border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                paymentMethod === 'cod' 
                  ? 'border-primary bg-surface-container-low/30' 
                  : 'border-outline-variant/20 hover:bg-surface-container-low/10'
              }`}
            >
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'cod'} 
                onChange={() => {}}
                className="hidden" 
              />
              <span className={`material-symbols-outlined mr-3 ${paymentMethod === 'cod' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: paymentMethod === 'cod' ? "'FILL' 1" : "'FILL' 0" }}>
                local_shipping
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface text-sm">Cash on Delivery</span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">Pay at Doorstep</span>
              </div>
              <div className={`ml-auto w-4 h-4 rounded-full flex items-center justify-center border ${
                paymentMethod === 'cod' ? 'border-primary' : 'border-outline-variant'
              }`}>
                {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
            </label>

            {/* Credit Card Option */}
            <label 
              onClick={() => setPaymentMethod('card')}
              className={`relative flex items-center p-stack-md border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                paymentMethod === 'card' 
                  ? 'border-primary bg-surface-container-low/30' 
                  : 'border-outline-variant/20 hover:bg-surface-container-low/10'
              }`}
            >
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'card'} 
                onChange={() => {}}
                className="hidden" 
              />
              <span className={`material-symbols-outlined mr-3 ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: paymentMethod === 'card' ? "'FILL' 1" : "'FILL' 0" }}>
                credit_card
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface text-sm">Cards</span>
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wider">Credit / Debit</span>
              </div>
              <div className={`ml-auto w-4 h-4 rounded-full flex items-center justify-center border ${
                paymentMethod === 'card' ? 'border-primary' : 'border-outline-variant'
              }`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
            </label>
          </div>

          {/* Conditional Input Fields */}
          {paymentMethod === 'upi' && (
            <div className="mt-stack-lg space-y-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Enter UPI ID</label>
                <div className="relative">
                  <input 
                    id="upiId"
                    type="text"
                    value={form.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                    className={`h-12 w-full px-4 pr-12 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                      errors.upiId ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                    }`}
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">qr_code</span>
                </div>
                {errors.upiId && <span className="text-xs text-error">{errors.upiId}</span>}
              </div>

              {/* UPI Apps Icons for Realism */}
              <div className="flex gap-4 items-center justify-center pt-2 opacity-75">
                <span className="text-[10px] font-label-caps text-on-surface-variant tracking-wider uppercase">Supported Apps:</span>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-surface-container rounded font-bold text-xs text-on-surface font-sans">GPay</span>
                  <span className="px-2.5 py-1 bg-surface-container rounded font-bold text-xs text-on-surface font-sans">PhonePe</span>
                  <span className="px-2.5 py-1 bg-surface-container rounded font-bold text-xs text-on-surface font-sans">Paytm</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="mt-stack-lg p-6 bg-surface-container-low/50 border border-outline-variant/10 rounded-lg text-center space-y-2">
              <span className="material-symbols-outlined text-[48px] text-primary select-none animate-bounce">
                local_shipping
              </span>
              <h4 className="font-headline-sm text-sm font-semibold">Cash on Delivery Confirmed</h4>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                You can pay with cash or any UPI app (by scanning the delivery agent's QR code) at the time of delivery. Safe and contactless.
              </p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="mt-stack-lg space-y-stack-md">
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">Card Number</label>
                <div className="relative">
                  <input 
                    id="cardNumber"
                    type="text"
                    maxLength="19"
                    value={form.cardNumber}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
                      handleInputChange('cardNumber', formatted);
                    }}
                    className={`h-12 w-full px-4 pr-12 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                      errors.cardNumber ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                    }`}
                    placeholder="0000 0000 0000 0000"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">lock</span>
                </div>
                {errors.cardNumber && <span className="text-xs text-error">{errors.cardNumber}</span>}
              </div>

              <div className="grid grid-cols-2 gap-stack-md">
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">Expiry Date</label>
                  <input 
                    id="expiry"
                    type="text"
                    maxLength="5"
                    value={form.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9]/g, '');
                      if (val.length > 2) {
                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                      }
                      handleInputChange('expiry', val);
                    }}
                    className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                      errors.expiry ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                    }`}
                    placeholder="MM / YY"
                  />
                  {errors.expiry && <span className="text-xs text-error">{errors.expiry}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">CVV</label>
                  <input 
                    id="cvv"
                    type="password"
                    maxLength="3"
                    value={form.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                    className={`h-12 px-4 rounded border bg-surface-bright font-body-md focus:ring-1 focus:ring-primary ${
                      errors.cvv ? 'border-error ring-1 ring-error' : 'border-outline-variant/30'
                    }`}
                    placeholder="***"
                  />
                  {errors.cvv && <span className="text-xs text-error">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Right Column: Order Summary */}
      <aside className="w-full lg:w-[400px]">
        <div className="bg-surface-container-low p-stack-lg rounded-lg lg:sticky lg:top-24 border border-outline-variant/10 shadow-sm">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-lg border-b border-outline-variant/20 pb-stack-sm">
            Order Summary
          </h3>
          
          <div className="space-y-stack-md mb-stack-lg max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
            {cartItems.length === 0 ? (
              <p className="text-sm text-on-surface-variant text-center py-4">No items in your cart.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-20 bg-surface-container-high rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.alt} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <p className="font-headline-sm text-[14px] leading-tight font-semibold">{item.product.name}</p>
                      <p className="font-label-caps text-[10px] text-on-surface-variant mt-0.5">
                        {item.variant.split(' / ')[0]} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-xs text-primary">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-stack-sm border-t border-outline-variant/20 pt-stack-lg text-xs md:text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span className="font-body-md">Subtotal</span>
              <span className="font-body-md">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span className="font-body-md">Delivery Charges</span>
              <span className="font-body-md">
                {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee.toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span className="font-body-md">GST (18%)</span>
              <span className="font-body-md">₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-primary font-bold text-base md:text-lg pt-stack-sm border-t border-outline-variant/10 mt-2">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-stack-lg space-y-stack-md">
            <button 
              onClick={handleCompletePurchase}
              className="w-full h-14 bg-primary text-on-primary font-button text-button rounded uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Complete Purchase
            </button>
            <p className="text-center text-[10px] text-on-surface-variant font-label-caps flex items-center justify-center gap-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              Secure Indian Checkout
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
