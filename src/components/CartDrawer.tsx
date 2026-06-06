/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Heart, ShieldCheck, Ticket, ArrowRight, Save, Receipt, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onToggleSaveForLater: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSaveForLater,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<{ code: string; discountPercent: number; freeShipping: boolean } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Split items into main cart list and "save for later"
  const activeItems = cartItems.filter(item => !item.savedForLater);
  const savedItems = cartItems.filter(item => item.savedForLater);

  // Price Calculation Logic
  const itemsSubtotal = activeItems.reduce((acc, current) => {
    return acc + (current.product.price * current.quantity);
  }, 0);

  // Coupon handling:
  const discountRate = activeCoupon?.code === 'SAVE10' ? 0.1 : 0;
  const discountAmount = itemsSubtotal * discountRate;

  // Standard logistics fees
  const isFreeShipTier = itemsSubtotal > 5000 || activeCoupon?.code === 'FREESHIP';
  const shippingFee = itemsSubtotal === 0 ? 0 : (isFreeShipTier ? 0 : 99);

  // Tax rates (standard 18% GST)
  const taxAmount = Math.round((itemsSubtotal - discountAmount) * 0.18);

  // Total payable value
  const finalTotal = itemsSubtotal - discountAmount + shippingFee + taxAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const codeClean = couponCode.trim().toUpperCase();
    if (codeClean === 'SAVE10') {
      setActiveCoupon({ code: 'SAVE10', discountPercent: 10, freeShipping: false });
      setCouponSuccess('SAVE10 coupon applied! 10% instant discount credited.');
      setCouponError('');
    } else if (codeClean === 'FREESHIP') {
      setActiveCoupon({ code: 'FREESHIP', discountPercent: 0, freeShipping: true });
      setCouponSuccess('FREESHIP coupon applied! Free express delivery active.');
      setCouponError('');
    } else if (codeClean === 'SWIFTCART5K' && itemsSubtotal >= 20000) {
      setActiveCoupon({ code: 'SWIFTCART5K', discountPercent: 20, freeShipping: true });
      setCouponSuccess('SWIFTCART5K coupon applied! ₹5,000 corporate discount matched.');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try using SAVE10 or FREESHIP.');
      setCouponSuccess('');
    }
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-55 flex justify-end">
      {/* Background overlay click-to-close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Cart Slider */}
      <div id="cart-drawer-content" className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left border-l border-slate-100">
        
        {/* Header Block */}
        <div className="p-5 border-b border-slate-150 flex items-center justify-between bg-slate-55 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Your Shopping Bag</span>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              {activeItems.length}
            </span>
          </div>
          <button
            id="close-cart-drawer"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            aria-label="Close Bag Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable contents area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
          {/* Active section cart list */}
          {activeItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center" id="empty-cart-state">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <p className="font-extrabold text-slate-800 text-sm">Your shopping cart is currently empty</p>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[260px] leading-relaxed">
                Unlock recommendations from our AI assistant or browse the store to add merchandise!
              </p>
              <button
                id="cart-continue-buying"
                onClick={onClose}
                className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-6 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-left mb-1">
                Active Selection ({activeItems.length})
              </span>
              
              <div className="flex flex-col gap-3">
                {activeItems.map((item) => {
                  const maxQty = item.product.stock;
                  return (
                    <div
                      key={item.product.id}
                      id={`cart-item-${item.product.id}`}
                      className="flex gap-3.5 p-3 border border-slate-200 rounded-lg relative bg-white transition hover:shadow-xs text-left"
                    >
                      {/* Thumbnail frame with mix-blend */}
                      <div className="w-16 h-16 bg-slate-50 rounded-md overflow-hidden flex items-center justify-center border border-slate-100 shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-14 h-14 object-contain mix-blend-multiply p-0.5"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info Panel */}
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                              {item.product.brand}
                            </span>
                            <button
                              id={`cart-remove-${item.product.id}`}
                              onClick={() => { onRemoveItem(item.product.id); }}
                              className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition cursor-pointer shrink-0"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="text-xs font-semibold text-slate-800 leading-snug line-clamp-1 truncate mr-2 pr-1">{item.product.name}</h4>
                          <span className="text-[12px] font-extrabold text-slate-900 block mt-1">₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Control actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100">
                          {/* Stepper block */}
                          <div className="flex items-center border border-slate-200 rounded bg-white overflow-hidden shadow-xs">
                            <button
                              id={`cart-dec-${item.product.id}`}
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 hover:bg-slate-50 hover:text-slate-900 text-xs font-bold text-slate-400 transition cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-black text-slate-800 select-none">{item.quantity}</span>
                            <button
                              id={`cart-inc-${item.product.id}`}
                              onClick={() => onUpdateQuantity(item.product.id, Math.min(maxQty, item.quantity + 1))}
                              className="px-2 py-0.5 hover:bg-slate-50 hover:text-slate-900 text-xs font-bold text-slate-400 transition cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            id={`cart-save-later-${item.product.id}`}
                            onClick={() => onToggleSaveForLater(item.product.id)}
                            className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                            title="Save this item for a checkout later"
                          >
                            <Save className="w-3 h-3" />
                            Save For Later
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved items partition list if there's any */}
          {savedItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-left">
              <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest block mb-2 px-1">
                Saved For Later Lists ({savedItems.length})
              </span>
              <div className="flex flex-col gap-2.5">
                {savedItems.map((item) => (
                  <div
                    key={item.product.id}
                    id={`saved-item-${item.product.id}`}
                    className="flex gap-3 p-2.5 border border-slate-200 rounded-lg bg-slate-50/50 relative text-left"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-11 h-11 object-contain rounded bg-white border border-slate-150 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{item.product.brand}</span>
                      <h5 className="text-[11px] font-bold text-slate-800 truncate">{item.product.name}</h5>
                      <span className="text-[11px] font-black text-slate-900 block mt-0.5">₹{item.product.price.toLocaleString('en-IN')}</span>

                      <button
                        id={`move-to-cart-${item.product.id}`}
                        onClick={() => onToggleSaveForLater(item.product.id)}
                        className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 hover:underline mt-1 flex items-center gap-1 cursor-pointer"
                      >
                        Restore back to active bag
                      </button>
                    </div>
                    <button
                      id={`saved-remove-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bill checkout summaries */}
        {activeItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 shadow-inner shrink-0 text-left">
            {/* Coupon Code section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-1.5 mb-3.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter coupon (SAVE10, FREESHIP)"
                  id="coupon-input"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none placeholder-slate-400 font-medium"
                />
                <Ticket className="absolute top-2.5 right-3 w-4 h-4 text-slate-300 pointer-events-none" />
              </div>
              <button
                type="submit"
                id="apply-coupon-btn"
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-850 cursor-pointer transition shrink-0 uppercase tracking-wider"
              >
                Apply
              </button>
            </form>

            {couponError && <p className="text-red-600 text-[10px] font-bold mb-3 pl-1">{couponError}</p>}
            {couponSuccess && <p className="text-green-600 text-[10px] font-bold mb-3 pl-1">{couponSuccess}</p>}

            {/* Bill Lines breakdown list */}
            <div className="flex flex-col gap-2 mb-4 text-xs" id="cart-price-breakdown">
              <div className="flex justify-between items-center text-slate-500">
                <span>Basket Items Subtotal</span>
                <span className="font-bold text-slate-800">₹{itemsSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-red-650 text-red-600 font-bold">
                  <span>Coupon Instant Deduction</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-slate-500">
                <span>Transit & Delivery logistics</span>
                {shippingFee === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[10px]">Free Shipping</span>
                ) : (
                  <span className="font-bold text-slate-850 text-slate-800">₹{shippingFee}</span>
                )}
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span className="flex items-center gap-1">
                  18% GST Central tax values
                  <Receipt className="w-3 h-3 text-slate-400" />
                </span>
                <span className="font-bold text-slate-800">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="h-px bg-slate-200/80 my-1" />
              
              <div className="flex justify-between items-center text-slate-900 font-black text-sm">
                <span>Total Payable Invoice</span>
                <span className="text-indigo-600">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Shield Check Indicator */}
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg p-2.5 mb-3">
              <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
              <span className="text-[10px] font-bold text-indigo-850 leading-tight">Secure checkout backed by dynamic SSL and sandboxed UPI token matches.</span>
            </div>

            {/* Primary checkout CTA button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 border border-indigo-600 rounded-lg font-black text-xs hover:scale-101 transform transition active:scale-99 cursor-pointer flex justify-center items-center gap-1.5 uppercase tracking-widest shadow-sm shadow-indigo-150"
            >
              Proceed to Secure Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
