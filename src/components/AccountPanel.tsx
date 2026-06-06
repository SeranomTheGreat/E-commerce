/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, LogIn, ClipboardList, MapPin, Heart, History, Key, Check, ShieldAlert, LogOut, Mail, Phone } from 'lucide-react';
import { Product, Order, UserProfile } from '../types';

interface AccountPanelProps {
  user: UserProfile | null;
  onLogin: (email: string, role: 'user' | 'admin') => void;
  onLogout: () => void;
  orders: Order[];
  wishlist: Product[];
  onRemoveFromWishlist: (p: Product) => void;
  onMoveWishlistItemToCart: (p: Product) => void;
  recentlyViewed: Product[];
  onViewProduct: (product: Product) => void;
}

export function AccountPanel({
  user,
  onLogin,
  onLogout,
  orders,
  wishlist,
  onRemoveFromWishlist,
  onMoveWishlistItemToCart,
  recentlyViewed,
  onViewProduct,
}: AccountPanelProps) {
  // Login form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active sub-page tabs
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'recent'>('profile');

  // Submit standard validation
  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emClean = email.trim().toLowerCase();
    const passClean = password.trim();

    if (emClean === 'admin@swiftcart.com' && passClean === 'admin123') {
      onLogin(emClean, 'admin');
    } else if (emClean === 'user@swiftcart.com' && passClean === 'user123') {
      onLogin(emClean, 'user');
    } else {
      setLoginError('Invalid credentials. Double check sandbox keys or use instant demo tags.');
    }
  };

  const handleDemoFill = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@swiftcart.com');
      setPassword('admin123');
    } else {
      setEmail('user@swiftcart.com');
      setPassword('user123');
    }
    setLoginError('');
  };

  // Switch display layout if user/admin is not logged in:
  if (!user) {
    return (
      <div id="account-auth-gate" className="w-full max-w-md mx-auto p-6 md:p-7 bg-white rounded-xl border border-slate-205 border-slate-200 shadow-sm text-slate-800 text-left my-8">
        
        {/* Auth Icon Header */}
        <div className="flex flex-col mb-6">
          <div className="w-11 h-11 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-3">
            <LogIn className="w-5 h-5" />
          </div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">Secure Client Sign In</h2>
          <p className="text-xs text-slate-505 text-slate-500 mt-1 leading-normal">
            Authenticate sandbox profiles to review purchase pipelines, delivery addresses, and saved wishlists.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleFormLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              id="auth-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@swiftcart.com"
              className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white text-slate-800 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security Password / PIN</label>
            <input
              type="password"
              required
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-50 border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none focus:bg-white text-slate-800 font-mono"
            />
          </div>

          {loginError && <p className="text-red-655 text-red-600 text-[10px] font-bold leading-relaxed">{loginError}</p>}

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 rounded-lg text-xs transition uppercase tracking-wider cursor-pointer shadow-xs shadow-indigo-150"
          >
            Authenticate Credentials
          </button>
        </form>

        {/* Demo Fast Login Dividers */}
        <div className="my-5 flex items-center gap-2">
          <div className="h-px bg-slate-205 bg-slate-200 flex-1" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Sandbox Credentials</span>
          <div className="h-px bg-slate-205 bg-slate-200 flex-1" />
        </div>

        {/* Quick Click credentials selectors */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            id="demo-user-trigger"
            type="button"
            onClick={() => handleDemoFill('user')}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-left cursor-pointer transition"
          >
            <span className="font-extrabold text-slate-800 text-[11px] block">Jane Doe</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">user123</span>
          </button>
          <button
            id="demo-admin-trigger"
            type="button"
            onClick={() => handleDemoFill('admin')}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-left cursor-pointer transition"
          >
            <span className="font-extrabold text-slate-800 text-[11px] block">Administrator</span>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">admin123</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="account-dashboard-root" className="w-full max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row text-slate-800">
      
      {/* Sidebar profile display cards */}
      <div className="w-full md:w-[230px] bg-slate-50 p-5 border-b md:border-b-0 md:border-r border-slate-200 text-left flex flex-col gap-5 shrink-0">
        
        {/* User Badge Info Card */}
        <div className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-2xs">
          <div className="w-9 h-9 bg-slate-900 text-white rounded-md flex items-center justify-center font-black text-xs">
            {user.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-extrabold text-xs block text-slate-800 truncate">{user.fullName}</span>
            <span className="text-[10px] text-slate-400 block truncate" title={user.email}>{user.email}</span>
          </div>
        </div>

        {/* Menu selections tab rails */}
        <div className="flex flex-col gap-1 text-xs">
          <button
            id="account-tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-left cursor-pointer font-bold ${
              activeTab === 'profile' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            Profile Coordinates
          </button>
          
          <button
            id="account-tab-orders"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-left cursor-pointer font-bold ${
              activeTab === 'orders' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            Order Histories ({orders.length})
          </button>
          
          <button
            id="account-tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-left cursor-pointer font-bold ${
              activeTab === 'wishlist' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 shrink-0" />
            My Wishlist ({wishlist.length})
          </button>
          
          <button
            id="account-tab-products"
            onClick={() => setActiveTab('recent')}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all text-left cursor-pointer font-bold ${
              activeTab === 'recent' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4 shrink-0" />
            Recently Browsed
          </button>
        </div>

        {/* Base Action logs panel */}
        <div className="mt-auto pt-4 border-t border-slate-205 border-slate-200">
          <button
            id="auth-logout-btn"
            onClick={onLogout}
            className="w-full bg-slate-200/90 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold py-2 px-4 rounded-lg text-xs transition flex justify-center items-center gap-1.5 cursor-pointer border border-transparent hover:border-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out Securely
          </button>
        </div>

      </div>

      {/* Main details body panels */}
      <div className="flex-1 p-5 md:p-7 min-w-0">
        
        {/* Profile Details Tab */}
        {activeTab === 'profile' && (
          <div className="text-left flex flex-col gap-6" id="account-tab-content-profile">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Registered Account Coordinates</h2>
              <p className="text-xs text-slate-500">Credential profile keys and shipping destination cards list.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/85 p-3.5 rounded-xl text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Recipient Name</span>
                <span className="font-extrabold text-slate-700 text-sm">{user.fullName}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Communication Mail</span>
                <span className="font-semibold text-slate-700 text-sm">{user.email}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Contact Number</span>
                <span className="font-semibold text-slate-705 text-slate-700 text-sm">{user.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Account Classification</span>
                <span className="font-black text-indigo-650 text-indigo-600 text-sm uppercase">Sandboxed Client</span>
              </div>
            </div>

            {/* Saved Addresses grid */}
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Stored Delivery Locations</span>
              {user.savedAddresses.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-lg border border-dashed text-left">
                  No active addresses stored. Place a virtual order checkout to sync addresses to this list automatically.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.savedAddresses.map((addr, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="text-xs leading-relaxed">
                        <span className="font-bold text-slate-800 block mb-0.5">{addr.fullName}</span>
                        <p className="text-slate-500 font-normal leading-normal">{addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}{addr.city}, {addr.state} - {addr.zipCode}</p>
                        <span className="text-[10px] text-slate-405 text-slate-400 block mt-2 font-mono">Mobile: {addr.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <div className="text-left flex flex-col gap-6" id="account-tab-content-orders">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Historical Purchases</h2>
              <p className="text-xs text-slate-500">Index ledger of your completed virtual transactions logs.</p>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-200 rounded-xl text-center">
                <span className="text-4xl mb-3">📦</span>
                <span className="font-extrabold text-slate-700 text-xs">No transaction records matching this profile</span>
                <p className="text-[11px] text-slate-400 max-w-xs mt-1">Complete your shopping cart checkout to log active items list into order registers.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3.5">
                    {/* Header values */}
                    <div className="flex flex-wrap justify-between items-center bg-white border border-slate-200/70 p-3 rounded-lg text-[11px] gap-2">
                      <div>
                        <span className="font-mono font-black text-slate-900 uppercase">INVOICE #{order.id}</span>
                        <span className="text-slate-300 mx-1.5">|</span>
                        <span className="text-slate-500 font-semibold">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                        <span className={`font-black uppercase px-2 py-0.5 rounded text-[9px] ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-150'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-600 border border-rose-150'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Items row logs */}
                    <div className="flex flex-col gap-3 pl-1 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-8 h-8 object-contain rounded bg-white border border-slate-100 shrink-0" referrerPolicy="no-referrer" />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-850 inline-block truncate max-w-[210px] sm:max-w-md leading-snug">{item.name}</span>
                              <span className="font-mono text-[10px] text-slate-400 block">Unit Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-extrabold text-slate-900 shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <hr className="border-slate-200/60" />

                    {/* Invoice Footer summary values */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-slate-404 text-slate-500 leading-normal">
                        <span>Paid Settlement: <strong className="uppercase text-slate-700">{order.paymentMethod}</strong></span>
                        <p className="text-[10px]">Courier Transit: <strong>{order.estimatedDelivery}</strong></p>
                      </div>
                      <div className="text-right border-l border-slate-205 border-slate-200 pl-4 py-0.5">
                        <span className="text-[10px] text-slate-400 uppercase font-black block">Grand Invoice Total</span>
                        <strong className="text-indigo-600 text-sm font-black">₹{order.total.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="text-left flex flex-col gap-6" id="account-tab-content-wishlist">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Personal Wishlist Items</h2>
              <p className="text-xs text-slate-500">Quickly restore saved devices and fashion to active bag checkout pipelines.</p>
            </div>

            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border border-dashed border-slate-200 rounded-xl text-center">
                <span className="text-4xl mb-3">❤️</span>
                <span className="font-extrabold text-slate-700 text-xs">Wishlist is empty</span>
                <p className="text-[11px] text-slate-500 max-w-xs mt-1">Tag the heart badges on items to build options registers in this tab!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {wishlist.map((product) => (
                  <div key={product.id} id={`wishlist-item-${product.id}`} className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 relative text-left hover:shadow-2xs transition-all">
                    <div className="w-12 h-12 bg-slate-50 rounded overflow-hidden flex items-center justify-center border border-slate-100 shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 object-contain mix-blend-multiply cursor-pointer p-0.5"
                        onClick={() => onViewProduct(product)}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <h4
                          onClick={() => onViewProduct(product)}
                          className="text-xs font-bold text-slate-800 hover:text-indigo-600 truncate cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h4>
                        <span className="text-xs font-black text-slate-900 block mt-0.5">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex gap-3.5 mt-2 text-[10px] font-black uppercase tracking-wider">
                        <button
                          id={`wishlist-move-cart-${product.id}`}
                          onClick={() => onMoveWishlistItemToCart(product)}
                          className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          id={`wishlist-delete-${product.id}`}
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recently Viewed Tab */}
        {activeTab === 'recent' && (
          <div className="text-left flex flex-col gap-6" id="account-tab-content-recent">
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">Recently Browsed</h2>
              <p className="text-xs text-slate-500">History coordinates of products viewed within this session.</p>
            </div>

            {recentlyViewed.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 border rounded-lg p-4 text-center">No products viewed in this current session yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {recentlyViewed.map((rp) => (
                  <div
                    key={rp.id}
                    id={`account-recent-${rp.id}`}
                    onClick={() => onViewProduct(rp)}
                    className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 transition cursor-pointer flex gap-3 items-center group shadow-2xs"
                  >
                    <div className="w-10 h-10 bg-slate-50/50 border border-slate-100 rounded flex items-center justify-center shrink-0">
                      <img
                        src={rp.images[0]}
                        alt={rp.name}
                        className="w-8 h-8 object-contain mix-blend-multiply p-0.5"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-800 block truncate leading-tight group-hover:text-indigo-600">{rp.name}</span>
                      <span className="text-[10.5px] font-extrabold text-slate-900 block mt-0.5">₹{rp.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
