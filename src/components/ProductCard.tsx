/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingCart, Heart, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: React.Key | string | number;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 20px -8px rgba(0,0,0,0.08)' }}
      className="bg-white border border-slate-200/85 rounded-xl overflow-hidden flex flex-col h-full relative group transition-all duration-300"
    >
      {/* Thumbnail Container */}
      <div 
        className="relative aspect-square bg-slate-50/50 overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-slate-100"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Floating Heart / Wishlist icon */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-sm border transition-all duration-200 cursor-pointer z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600'
              : 'bg-white/90 text-slate-400 border-slate-200 hover:text-rose-500 hover:border-rose-200 hover:scale-105'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Promo and Stock Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
              Save {product.discount}%
            </span>
          )}
          {product.popularity >= 9 && (
            <span className="bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Absolute dynamic notification indicators in thumbnail margins */}
        {isOutOfStock ? (
          <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 backdrop-blur-xs py-1.5 text-center text-[10px] font-extrabold text-white uppercase tracking-wider">
            Out of Stock
          </div>
        ) : isLowStock ? (
          <div className="absolute inset-x-0 bottom-0 bg-amber-500/90 text-slate-950 py-1 text-center text-[9px] font-black uppercase tracking-wider">
            Only {product.stock} left in stock
          </div>
        ) : null}
      </div>

      {/* Main Metadata Panel */}
      <div className="p-3.5 flex flex-col flex-1 text-left">
        {/* Brand Label */}
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {product.brand}
        </div>

        {/* Title */}
        <h3
          id={`product-name-${product.id}`}
          onClick={() => onViewDetails(product)}
          className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-indigo-600 cursor-pointer mb-1.5 leading-snug min-h-[34px]"
        >
          {product.name}
        </h3>

        {/* Ratings display line */}
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex text-amber-400 items-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-3 h-3 ${
                  idx < Math.floor(product.rating) ? 'fill-current' : 'text-slate-250 text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-black text-slate-700">{product.rating}</span>
          <span className="text-slate-300 text-[9px]">•</span>
          <span className="text-[10px] text-slate-400 font-medium">({product.reviewCount})</span>
        </div>

        {/* Real Commerce Delivery Estimation notes */}
        <div className="mt-auto pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[15px] font-extrabold text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span className="text-[10px] text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
            <span>Delivery: Tue, Jun 9 • <span className="text-green-600 font-semibold">Free Shipping</span></span>
          </div>
        </div>
      </div>

      {/* Structured Actions in bottom rail */}
      <div className="p-2.5 bg-slate-50/50 border-t border-slate-100/70 flex gap-1.5">
        <button
          id={`quick-view-${product.id}`}
          onClick={() => onViewDetails(product)}
          className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-705 text-slate-700 font-bold py-1.5 px-2 rounded-lg text-[10.5px] transition-all cursor-pointer"
        >
          Quick View
        </button>
        <button
          id={`add-to-cart-${product.id}`}
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className={`flex-1 flex justify-center items-center gap-1 font-semibold py-1.5 px-2 rounded-lg text-[10.5px] transition-all cursor-pointer ${
            isOutOfStock
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-600 shadow-sm shadow-indigo-100 font-bold'
          }`}
        >
          <ShoppingCart className="w-3 h-3" />
          Add To Cart
        </button>
      </div>
    </motion.div>
  );
}
