/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ArrowLeft, RefreshCw, CheckCircle, Smartphone, MapPin, Receipt } from 'lucide-react';
import { CartItem, ShippingDetails } from '../types';

interface CheckoutPanelProps {
  onBackToCart: () => void;
  cartItems: CartItem[];
  savedAddresses: ShippingDetails[];
  onSetOrderCompleted: (orderId: string, estimatedDelivery: string, finalBillTotal: number, shipping: ShippingDetails, method: 'card' | 'upi' | 'cod') => void;
}

export function CheckoutPanel({
  onBackToCart,
  cartItems,
  savedAddresses,
  onSetOrderCompleted,
}: CheckoutPanelProps) {
  // Input form variables
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  // Validation message
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Active items in the cart
  const activeItems = cartItems.filter(item => !item.savedForLater);

  // Totals calculations
  const itemsSubtotal = activeItems.reduce((acc, current) => acc + (current.product.price * current.quantity), 0);
  const taxAmount = Math.round(itemsSubtotal * 0.18);
  const isFreeShip = itemsSubtotal > 5000;
  const shippingCharge = isFreeShip ? 0 : 99;
  const grandTotal = itemsSubtotal + taxAmount + shippingCharge;

  // Handler for fill in using saved profile addresses directly
  const handleApplySavedAddress = (addr: ShippingDetails) => {
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setEmail(addr.email);
    setAddressLine1(addr.addressLine1);
    setAddressLine2(addr.addressLine2 || '');
    setCity(addr.city);
    setStateName(addr.state);
    setZipCode(addr.zipCode);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic address form valid check
    if (!fullName.trim() || !phone.trim() || !email.trim() || !addressLine1.trim() || !city.trim() || !stateName.trim() || !zipCode.trim()) {
      setValidationError('Please complete all required shipping & contact fields.');
      return;
    }

    // Email validates check
    if (!email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    // Specific payment inputs checking
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setValidationError('Please specify card credentials.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setValidationError('Please enter a valid UPI Virtual ID (e.g. name@upi).');
        return;
      }
    }

    setValidationError('');
    setIsProcessing(true);

    // Simulate merchant bank network delays
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const estimatedDelivery = 'Tuesday, June 9, 2026';

      const shippingDetailsObj: ShippingDetails = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        state: stateName.trim(),
        zipCode: zipCode.trim()
      };

      onSetOrderCompleted(
        generatedOrderId,
        estimatedDelivery,
        grandTotal,
        shippingDetailsObj,
        paymentMethod
      );
    }, 1800);
  };

  return (
    <div id="checkout-panel-root" className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-800">
      
      {/* Back Anchor Control */}
      <div className="flex justify-between items-center border-b border-slate-150 pb-4 mb-6">
        <button
          id="checkout-back-btn"
          type="button"
          onClick={onBackToCart}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Shopping Cart
        </button>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 py-1 px-2.5 rounded">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          SSL Enforced
        </div>
      </div>

      {/* Main Grid: Forms Left, Summary Right */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Column Left (Col Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Saved addresses selector if exists */}
          {savedAddresses.length > 0 && (
            <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-0.5">
                Auto-fill Saved Addresses
              </span>
              <div className="flex gap-2.5 overflow-x-auto pb-1.5">
                {savedAddresses.map((addr, idx) => (
                  <button
                    type="button"
                    key={idx}
                    id={`apply-saved-addr-${idx}`}
                    onClick={() => handleApplySavedAddress(addr)}
                    className="bg-white hover:bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-left cursor-pointer transition shrink-0 min-w-[210px] shadow-2xs"
                  >
                    <span className="font-extrabold text-slate-800 block truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {addr.fullName}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5 pl-4">
                      {addr.addressLine1}, {addr.city}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Block Section 1: Contact Detail Lines */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 mb-4">
              1. Contact Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address <span className="text-red-550 text-red-500 font-extrabold">*</span></label>
                <input
                  type="email"
                  required
                  id="checkout-email-input"
                  placeholder="name@personal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mobile Contact <span className="text-red-555 text-red-500 font-extrabold">*</span></label>
                <input
                  type="tel"
                  required
                  id="checkout-phone-input"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Block Section 2: Shipping Destinations */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 mb-4">
              2. Consignee Delivery Destination
            </h3>
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Recipient Name <span className="text-red-500 font-extrabold">*</span></label>
                <input
                  type="text"
                  required
                  id="checkout-fullname-input"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Street Address 1 <span className="text-red-500 font-extrabold">*</span></label>
                  <input
                    type="text"
                    required
                    id="checkout-address1-input"
                    placeholder="Flat / Floor / Mansion No • Landmark"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Street Address 2 (Optional)</label>
                  <input
                    type="text"
                    id="checkout-address2-input"
                    placeholder="Area, Near Landmark, Sector"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Town/City <span className="text-red-500 font-extrabold">*</span></label>
                  <input
                    type="text"
                    required
                    id="checkout-city-input"
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">State Region <span className="text-red-500 font-extrabold">*</span></label>
                  <input
                    type="text"
                    required
                    id="checkout-state-input"
                    placeholder="Maharashtra"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Postal ZIP Code <span className="text-red-500 font-extrabold">*</span></label>
                  <input
                    type="text"
                    required
                    id="checkout-zip-input"
                    placeholder="400001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Block Section 3: Gateway Settlements */}
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5 mb-4">
              3. Gateway Settlement Selection
            </h3>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                type="button"
                id="pay-card-tab"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 font-extrabold'
                    : 'border-slate-200 text-slate-555 hover:bg-slate-50 text-slate-500'
                }`}
              >
                <CreditCard className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[11px]">Credit Card</span>
              </button>
              
              <button
                type="button"
                id="pay-upi-tab"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 font-extrabold'
                    : 'border-slate-200 text-slate-555 hover:bg-slate-50 text-slate-500'
                }`}
              >
                <Smartphone className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[11px]">UPI App ID</span>
              </button>
              
              <button
                type="button"
                id="pay-cod-tab"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 font-extrabold'
                    : 'border-slate-200 text-slate-555 hover:bg-slate-50 text-slate-500'
                }`}
              >
                <Truck className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[11px]">Pay on Delivery</span>
              </button>
            </div>

            {/* Selection Dynamic Fields */}
            {paymentMethod === 'card' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Credit Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    id="card-number-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-800 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiration MM/YY</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      id="card-expiry-input"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 text-center text-slate-800 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CVV Shield</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      id="card-cvv-input"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 text-center text-slate-800 font-medium font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">UPI Virtual Address (VPA)</label>
                <input
                  type="text"
                  placeholder="e.g. name@oksbi, name@paytm"
                  id="upi-id-input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-800 font-medium"
                />
                <span className="text-[10px] text-slate-500 leading-normal pl-0.5 mt-1 block">
                  * A push transaction request will be dispatched to your registered mobile app ledger for authorization.
                </span>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-slate-800 block">Cash On Delivery Pre-selected</span>
                  <p className="text-[11px] text-slate-505 text-slate-500 mt-1 leading-relaxed">
                    Zero upfront merchant debt risk. Keep the physical currency total ready with your recipient once our transit courier reaches your property.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Column Right (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/50 flex flex-col gap-4 shadow-2xs">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-205 border-slate-200 pb-2.5">
              Payable Invoice Items ({activeItems.reduce((sum, i) => sum + i.quantity, 0)})
            </h4>

            {/* Scroll items */}
            <div className="flex flex-col gap-3 max-h-[170px] overflow-y-auto pr-1">
              {activeItems.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-8 h-8 rounded bg-white border border-slate-200 shrink-0 object-contain p-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate min-w-0">
                      <span className="font-semibold text-slate-800 block truncate leading-snug">{item.product.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 shrink-0 text-right">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <hr className="border-slate-200/60" />

            {/* Calculations and sums */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between text-slate-505 text-slate-500">
                <span>Total Items List Unit Price</span>
                <span className="font-bold text-slate-700">₹{itemsSubtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between text-slate-550 text-slate-500">
                <span>Secured Courier logistics</span>
                {shippingCharge === 0 ? (
                  <span className="text-green-600 font-black uppercase text-[10px]">Free Shipping</span>
                ) : (
                  <span className="font-bold text-slate-700">₹{shippingCharge}</span>
                )}
              </div>

              <div className="flex justify-between text-slate-500">
                <span className="flex items-center gap-1">
                  18% Central consumption tax (GST)
                  <Receipt className="w-3.5 h-3.5 text-slate-400" />
                </span>
                <span className="font-bold text-slate-700">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="h-px bg-slate-200/90 my-1" />

              <div className="flex justify-between items-center text-sm font-black text-slate-950">
                <span>Grand Bill Total</span>
                <span className="text-indigo-600 text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Prompt validation labels alerts */}
            {validationError && (
              <p className="bg-red-50 border border-red-150 text-red-655 text-red-650 font-semibold p-2.5 rounded-lg text-[10px] leading-relaxed">
                {validationError}
              </p>
            )}

            {/* Authorize buttons */}
            <button
              type="submit"
              disabled={isProcessing}
              id="checkout-order-submit"
              className={`w-full py-3.5 rounded-lg font-black text-xs transition duration-200 uppercase tracking-widest cursor-pointer flex justify-center items-center gap-2 ${
                isProcessing
                  ? 'bg-indigo-300 text-indigo-150 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-150'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  Securing Transit Ledger...
                </>
              ) : (
                'Place Order & Authorize'
              )}
            </button>

            {/* Shield and warranty reminders */}
            <hr className="border-slate-100" />
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold">
              <ShieldCheck className="w-4.5 h-4.5 text-green-500 shrink-0" />
              <span>UPI & Card data protected via AES-256</span>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
