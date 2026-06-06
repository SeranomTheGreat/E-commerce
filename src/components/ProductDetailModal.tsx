/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Send, Tag, AlertCircle } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onSelectProduct: (p: Product) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  relatedProducts,
  onSelectProduct,
  onAddReview,
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Use product level reviews or empty array
  const reviewsList = product.reviews || [];

  // Delivery estimation (3 days from 2026-06-06 is Tuesday, June 9, 2026)
  const deliveryEstimate = 'Tuesday, June 9';

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewComment.trim()) {
      setReviewError('Please specify reviewer name and feedback details.');
      return;
    }
    const createdReview: Review = {
      id: `rev-custom-${Date.now()}`,
      userName: newReviewerName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      createdAt: '2026-06-06'
    };
    onAddReview(product.id, createdReview);
    setNewReviewerName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewError('');
  };

  return (
    <div id="product-detail-modal-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div id="product-detail-modal-content" className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl relative max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Modal Close Button */}
        <button
          id="close-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 z-15 transition cursor-pointer"
          aria-label="Close Product Gallery"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Triple Column Product Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
          
          {/* Column A: Media Gallery (Left, Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            {/* Aspect contain box */}
            <div className="aspect-square bg-slate-50/50 rounded-xl overflow-hidden relative border border-slate-200/60 flex items-center justify-center p-5">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Micro Thumbnail Grid */}
            {product.images.length > 1 && (
              <div className="flex gap-2 pb-1 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumbnail-selector-${idx}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border transition cursor-pointer flex-shrink-0 ${
                      selectedImage === img ? 'border-indigo-600 ring-2 ring-indigo-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail preview ${idx}`} className="w-full h-full object-contain p-0.5 mix-blend-multiply" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Details Table */}
            <div className="mt-2 bg-slate-50/70 rounded-xl p-4 border border-slate-100">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-1.5 border-b border-slate-200">
                Technical Blueprint
              </h4>
              <div className="mt-2.5 flex flex-col gap-2">
                {Object.entries(product.specs).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 text-xs py-1 border-b border-slate-100 last:border-none">
                    <span className="font-semibold text-slate-505 text-slate-500">{label}</span>
                    <span className="text-slate-800 text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Product Info & Customer Reviews (Center, Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 text-left border-b lg:border-b-0 lg:border-r border-slate-150 pb-6 lg:pb-0 lg:pr-6">
            <div>
              {/* Brand and Categories badge path */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-indigo-650 text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                  {product.brand}
                </span>
                <span className="bg-slate-100 text-slate-500 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating Star Lines */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${idx < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-black text-slate-700">{product.rating}</span>
                <span className="text-slate-300 text-[10px]">•</span>
                <span className="text-xs text-slate-500 font-medium">({product.reviewCount} Reviews Verified)</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Description Paragraph */}
            <div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Overview</h3>
              <p className="text-xs text-slate-655 text-slate-600 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Promotional Active Coupons vouchers list */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Promotions</h3>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2 items-start border border-dashed border-indigo-200 bg-indigo-50/45 p-2 rounded-lg text-xs leading-snug">
                  <Tag className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block font-bold">₹5,000 Instant Card Cashback</strong>
                    <span className="text-[10px] text-slate-500">Apply code <span className="font-mono font-bold text-indigo-600">SWIFTCART5K</span> on checkout page</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start border border-dashed border-emerald-200 bg-emerald-50/20 p-2 rounded-lg text-xs leading-snug">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">GST Business Invoicing Enabled</strong>
                    <span className="text-[10px] text-slate-500">Claim up to 18% input credit write-offs</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Form & List: Feedback and experiences */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Verified Reviews ({reviewsList.length})</h3>
              
              {reviewsList.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic">No buyer reviews submitted. Claim the first feedback slot below!</p>
              ) : (
                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="bg-slate-50 border border-slate-150 rounded-lg p-2.5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-800 text-[10px]">{rev.userName}</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-snug">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic review forms writing */}
              <form onSubmit={handleCreateReview} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2.5">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Write Customer Feedback</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    id="review-name-input"
                    value={newReviewerName}
                    onChange={(e) => setNewReviewerName(e.target.value)}
                    className="bg-white border border-slate-250 rounded p-2 text-[11px] focus:ring-1 focus:ring-indigo-600 focus:outline-none text-slate-700"
                  />
                  <select
                    id="review-rating-input"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(parseInt(e.target.value, 10))}
                    className="bg-white border border-slate-250 rounded p-1.5 text-[11px] text-yellow-650 font-bold focus:outline-none text-slate-705 text-slate-700"
                  >
                    <option value={5}>5 ★ Excellent</option>
                    <option value={4}>4 ★ Good</option>
                    <option value={3}>3 ★ Neutral</option>
                    <option value={2}>2 ★ Fair</option>
                    <option value={1}>1 ★ Poor</option>
                  </select>
                </div>
                <textarea
                  placeholder="Appraise material specs or cargo shipping times..."
                  id="review-comment-input"
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-white border border-slate-250 rounded p-1.5 text-[11px] focus:ring-1 focus:ring-indigo-600 focus:outline-none resize-none"
                />
                {reviewError && <span className="text-red-500 text-[10px] font-bold">{reviewError}</span>}
                <button
                  type="submit"
                  id="submit-review-btn"
                  className="w-full bg-slate-900 text-white font-bold py-1 px-3 rounded hover:bg-slate-850 text-[10px] uppercase tracking-wider transition cursor-pointer"
                >
                  Post Customer Review
                </button>
              </form>
            </div>
          </div>

          {/* Column C: Dedicated Amazon/BestBuy Style Purchase Buy Box (Right, Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-left">
            <div className="border border-slate-200 rounded-xl p-4.5 bg-slate-50/30 flex flex-col gap-4 shadow-xs">
              
              {/* Pricing section with absolute dominance in Buy Box */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Price Summary</span>
                <div className="flex items-baseline gap-1.5">
                  <strong className="text-2xl font-black text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </strong>
                  {product.discount > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {product.discount > 0 && (
                  <span className="text-[10px] font-bold text-red-655 text-red-600 bg-red-50 py-0.5 px-2 rounded-md mt-1 inline-block">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discount}% OFF)
                  </span>
                )}
              </div>

              <hr className="border-slate-100" />

              {/* Delivery Estimation indicators */}
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">FREE Standard Delivery</span>
                    <p className="text-[11px] text-slate-500">Handed by <span className="font-semibold text-slate-800">{deliveryEstimate}</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RefreshCw className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">15-Day Return Guarantee</span>
                    <p className="text-[11px] text-slate-500">Free courier pickup from your address</p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Stock Levels Indicator */}
              <div className="text-xs">
                {product.stock === 0 ? (
                  <div className="flex items-center gap-1.5 text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-150">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="font-extrabold text-[11px] uppercase tracking-wider">Out of Stock</span>
                  </div>
                ) : product.stock <= 5 ? (
                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="font-bold text-[11px]">Only {product.stock} left - order soon!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-150">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                    <span className="font-bold text-[11px]">In Stock & Ready for Transit</span>
                  </div>
                )}
              </div>

              {/* Quantity input stepper widget */}
              {product.stock > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Specify Qty</label>
                  <div className="flex items-center justify-between border border-slate-200 rounded-lg p-1 bg-white">
                    <button
                      id="decrement-quantity"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-2.5 py-1 hover:bg-slate-50 font-bold text-slate-700 text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-slate-800">{quantity}</span>
                    <button
                      id="increment-quantity"
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="px-2.5 py-1 hover:bg-slate-50 font-bold text-slate-700 text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Actions STACKS inside Buy Box */}
              <div className="flex flex-col gap-2 mt-2">
                <button
                  id="detail-add-to-cart"
                  disabled={product.stock === 0}
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full bg-slate-900 text-white font-extrabold py-3 border border-slate-900 rounded-lg text-xs hover:bg-slate-800 transition shadow-xs focus:ring-1 focus:ring-slate-900 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed uppercase tracking-wider block"
                >
                  Add to Cart
                </button>
                <button
                  id="detail-buy-now"
                  disabled={product.stock === 0}
                  onClick={() => onBuyNow(product, quantity)}
                  className="w-full bg-indigo-600 text-white font-extrabold py-3 rounded-lg text-xs hover:bg-indigo-700 transition shadow-sm cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed uppercase tracking-wider block font-black"
                >
                  Buy Now
                </button>
              </div>

              {/* Wishlist Link inside Buybox */}
              <button
                id="detail-toggle-wishlist"
                onClick={() => onToggleWishlist(product)}
                className={`w-full py-2 border rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 mt-1 ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-rose-550'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>

            </div>

            {/* Related recommendations on the right side margins */}
            <div className="flex flex-col gap-2 mt-2.5">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Customers Also Bought</h3>
              <div className="flex flex-col gap-2">
                {relatedProducts.slice(0, 3).map((rp) => (
                  <div
                    key={rp.id}
                    id={`related-product-${rp.id}`}
                    onClick={() => onSelectProduct(rp)}
                    className="p-1.5 bg-slate-50 border border-slate-150 rounded-lg hover:border-slate-300 transition cursor-pointer flex gap-2.5 items-center group text-xs text-left"
                  >
                    <img src={rp.images[0]} alt={rp.name} className="w-9 h-9 object-contain rounded bg-white shrink-0" referrerPolicy="no-referrer" />
                    <div className="overflow-hidden">
                      <h5 className="font-semibold text-slate-800 truncate group-hover:text-indigo-600">{rp.name}</h5>
                      <span className="font-bold text-slate-900">₹{rp.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
