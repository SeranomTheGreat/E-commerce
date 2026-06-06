/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Plus, 
  Search, 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Eye,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Product, Order } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateProductStock: (id: string, newStock: number) => void;
  onUpdateProductPrice: (id: string, newPrice: number) => void;
  onAddProduct: (newProduct: Product) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteProduct: (id: string) => void;
}

export function AdminDashboard({
  products,
  orders,
  onUpdateProductStock,
  onUpdateProductPrice,
  onAddProduct,
  onUpdateOrderStatus,
  onDeleteProduct
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  // Search state
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  
  // Add product form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Mobiles');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [addError, setAddError] = useState('');

  // ------------------ CALCULATIONS ------------------
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;
  
  // Category Breakdown Data
  const categoryCount: Record<string, number> = {};
  const categorySales: Record<string, number> = {};
  
  products.forEach(p => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  orders.filter(o => o.status !== 'Cancelled').forEach(o => {
    o.items.forEach(item => {
      const matchedProd = products.find(p => p.id === item.productId);
      const cat = matchedProd ? matchedProd.category : 'General';
      categorySales[cat] = (categorySales[cat] || 0) + (item.price * item.quantity);
    });
  });

  const lowStockItems = products.filter(p => p.stock <= 8);

  // Filter lists
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.shippingAddress.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.status.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // Add Dynamic Product
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductBrand.trim() || !newProductPrice || !newProductStock) {
      setAddError('Please specify name, brand, listing price, and initial stock.');
      return;
    }

    const priceNum = parseFloat(newProductPrice);
    const stockNum = parseInt(newProductStock, 10);
    if (isNaN(priceNum) || priceNum <= 0) {
      setAddError('Please insert a valid currency price.');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      setAddError('Stock values can not write negative numbers.');
      return;
    }

    const imageUrl = newProductImage.trim() || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';

    const freshlyMinted: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newProductName.trim(),
      brand: newProductBrand.trim(),
      category: newProductCategory,
      price: priceNum,
      originalPrice: priceNum * 1.2,
      discount: 16,
      rating: 4.5,
      reviewCount: 1,
      stock: stockNum,
      images: [imageUrl],
      description: newProductDesc.trim() || 'No description provided.',
      specs: {
        'Origin': 'Assembled in India',
        'Regulatory Power': 'RoHS Certified'
      },
      tags: [newProductCategory.toLowerCase(), 'new-arrival'],
      popularity: 6,
      createdAt: '2026-06-06',
      reviews: []
    };

    onAddProduct(freshlyMinted);
    
    // reset form fields
    setNewProductName('');
    setNewProductBrand('');
    setNewProductPrice('');
    setNewProductStock('');
    setNewProductDesc('');
    setNewProductImage('');
    setAddError('');
    setShowAddForm(false);
  };

  return (
    <div id="admin-dashboard-panel" className="w-full max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col text-slate-800 text-left my-4">
      
      {/* Upper Operations banner */}
      <div className="bg-slate-900 px-5 py-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white">
        <div>
          <h2 className="text-sm font-black tracking-widest flex items-center gap-2 uppercase">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Control Operations Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-normal">Real-time purchase streams, stock inventory indexes, and shipment routing.</p>
        </div>
        
        {/* Quick sandbox metrics labels */}
        <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider">
          <span className="bg-slate-800 px-2.5 py-1.5 rounded text-emerald-400 border border-slate-700">
            SYSTEM: ONLINE
          </span>
          <span className="bg-slate-800 px-2.5 py-1.5 rounded text-indigo-350 text-indigo-300 border border-slate-700">
            TIME: UTC 2026
          </span>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex gap-1.5 shrink-0">
        <button
          id="admin-tab-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-200'
          }`}
        >
          Overview Statistics
        </button>
        <button
          id="admin-tab-products"
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            activeTab === 'products' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-200'
          }`}
        >
          Catalog Index ({products.length})
        </button>
        <button
          id="admin-tab-orders"
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer ${
            activeTab === 'orders' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-200'
          }`}
        >
          Shipment Queue ({orders.length})
        </button>
      </div>

      {/* TAB CONTENT: SALES OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="p-5 md:p-7 flex flex-col gap-6" id="admin-overview-container">
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-1">Total Web Revenue</span>
                <span className="text-base font-black text-slate-900 block">₹{totalSales.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 bg-emerald-50/75 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-1">Total Dispatches</span>
                <span className="text-base font-black text-slate-900 block">{totalOrdersCount} Shipments</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-1">Avg Shopping Basket</span>
                <span className="text-base font-black text-slate-900 block">₹{avgOrderValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-1">Active Quantities</span>
                <span className="text-base font-black text-slate-900 block">{products.reduce((sum, p) => sum + p.stock, 0)} Units</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Category Performance Breakdown */}
            <div className="lg:col-span-2 border border-slate-200 rounded-xl p-4.5 bg-white text-left">
              <span className="text-[10px] font-black text-slate-400 tracking-wider block mb-4 uppercase">Category Revenue Performance</span>
              
              <div className="flex flex-col gap-3.5">
                {products.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No category data.</p>
                ) : (
                  ['Mobiles', 'Laptops', 'Electronics', 'Fashion', 'Shoes', 'Home Appliances', 'Grocery', 'Beauty', 'Books', 'Toys', 'Sports'].map(cat => {
                    const count = categoryCount[cat] || 0;
                    const sales = categorySales[cat] || 0;
                    const maxWeight = Math.max(...Object.values(categoryCount), 1);
                    const widthPercent = Math.min(100, Math.max(7, (count / maxWeight) * 100));

                    if (count === 0 && sales === 0) return null;

                    return (
                      <div key={cat} className="flex flex-col gap-1 text-xs">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-slate-800">{cat} <span className="text-slate-400 font-normal">({count} variants)</span></span>
                          <span className="font-extrabold text-indigo-600">₹{sales.toLocaleString('en-IN')}</span>
                        </div>
                        {/* Bar tracker */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Critical Low Stock Alerter panel */}
            <div className="border border-amber-200 bg-amber-50/15 rounded-xl p-4 text-left">
              <span className="text-[10px] font-black text-amber-800 tracking-wider block mb-3.5 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Inventory Auditing Deficits ({lowStockItems.length})
              </span>
              
              {lowStockItems.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center justify-center">
                  <span className="text-3xl block mb-2">🎉</span>
                  <span className="text-xs font-semibold text-slate-600">All inventory levels fully balanced!</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {lowStockItems.map(p => (
                    <div key={p.id} className="bg-white border border-amber-200/60 shadow-2xs p-3 rounded-lg flex items-center justify-between gap-3 text-xs">
                      <div className="truncate text-left">
                        <span className="font-extrabold block truncate max-w-[130px] text-slate-800 leading-tight">{p.name}</span>
                        <span className="text-[10px] text-red-650 text-red-605 text-red-600 font-bold block mt-0.5">Stock Left: {p.stock} units</span>
                      </div>
                      <button
                        id={`restock-${p.id}`}
                        onClick={() => onUpdateProductStock(p.id, p.stock + 15)}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1.5 rounded transition cursor-pointer"
                      >
                        Restock +15
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CATALOG INDEX MANAGER */}
      {activeTab === 'products' && (
        <div className="p-5 md:p-7 flex flex-col gap-5 text-left" id="admin-catalog-management">
          
          <div className="flex flex-col sm:flex-row gap-3.5 justify-between items-start sm:items-center">
            {/* Search inputs */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search catalog variants..."
                id="admin-product-search"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-250 rounded-lg py-2 pl-9 pr-3 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-800 font-medium"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>

            {/* Collapsible activator */}
            <button
              id="admin-new-product-form-toggle"
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition cursor-pointer uppercase tracking-wider shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              Add Product to Index
            </button>
          </div>

          {/* Add product forms fields */}
          {showAddForm && (
            <form onSubmit={handleCreateProductSubmit} className="bg-indigo-50/15 border border-indigo-150 rounded-xl p-4.5 text-xs flex flex-col gap-4 text-left">
              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest block border-b border-indigo-100 pb-2 mb-1">
                Insert Premium Merchandise Specification
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-505 text-slate-500 uppercase tracking-wider">Product Name *</label>
                  <input
                    type="text"
                    required
                    id="new-prod-name"
                    placeholder="e.g. ZenSound Fold Plus"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-505 text-slate-500 uppercase tracking-wider">Manufacturer Brand *</label>
                  <input
                    type="text"
                    required
                    id="new-prod-brand"
                    placeholder="e.g. Zenith"
                    value={newProductBrand}
                    onChange={(e) => setNewProductBrand(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-505 text-slate-500 uppercase tracking-wider">Subcategory *</label>
                  <select
                    id="new-prod-category"
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none font-bold text-slate-700"
                  >
                    <option value="Mobiles">Mobiles</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-550 text-slate-500 uppercase tracking-wider">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    id="new-prod-price"
                    placeholder="e.g. 4990"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-550 text-slate-500 uppercase tracking-wider">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    id="new-prod-stock"
                    placeholder="e.g. 30"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider">Image Link URL</label>
                  <input
                    type="url"
                    id="new-prod-image"
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={newProductImage}
                    onChange={(e) => setNewProductImage(e.target.value)}
                    className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider">Marketing Overview Description</label>
                <textarea
                  id="new-prod-desc"
                  placeholder="Insert detailed product specs and features lists..."
                  rows={2}
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="bg-white border border-slate-250 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none resize-none"
                />
              </div>

              {addError && <p className="text-red-500 font-bold block pl-1">{addError}</p>}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  id="cancel-add-product"
                  onClick={() => setShowAddForm(false)}
                  className="bg-slate-200 hover:bg-slate-250 text-slate-700 px-4 py-2 rounded-lg font-bold cursor-pointer transition text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-add-product"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-extrabold cursor-pointer transition text-[11px]"
                >
                  Add Product
                </button>
              </div>
            </form>
          )}

          {/* Table index displays */}
          <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[9px] tracking-wider font-black">
                <tr>
                  <th className="py-3 px-4">Catalog Variant</th>
                  <th className="py-3 px-4">Subcategory</th>
                  <th className="py-3 px-4">Price Basis</th>
                  <th className="py-3 px-4 text-center">Remaining Stock</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200" id="admin-product-table-rows">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 italic font-medium">No inventory variants match your query.</td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p.id} id={`admin-row-${p.id}`} className="hover:bg-slate-50 transition">
                      {/* Name/brand info banner */}
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                          <img src={p.images[0]} alt={p.name} className="w-7 h-7 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                        </div>
                        <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                          <span className="font-extrabold text-slate-800 block truncate leading-tight">{p.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Brand: {p.brand} • SKU: {p.id}</span>
                        </div>
                      </td>

                      {/* directory */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px] bg-slate-100 px-2.5 py-0.5 rounded-sm">
                          {p.category}
                        </span>
                      </td>

                      {/* Pricing list modifiers */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                          <button
                            id={`adj-price-btn-${p.id}`}
                            onClick={() => {
                              const ans = prompt(`Update unit cost price for ${p.name}:`, p.price.toString());
                              if (ans !== null && !isNaN(parseFloat(ans))) {
                                onUpdateProductPrice(p.id, parseFloat(ans));
                              }
                            }}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </td>

                      {/* Inventory controls */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            id={`stock-dec-${p.id}`}
                            onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stock - 5))}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer"
                          >
                            -5
                          </button>
                          <span className={`font-mono font-black text-[11px] text-center min-w-[22px] ${p.stock <= 8 ? 'text-red-600' : 'text-slate-800'}`}>
                            {p.stock}
                          </span>
                          <button
                            id={`stock-inc-${p.id}`}
                            onClick={() => onUpdateProductStock(p.id, p.stock + 10)}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer"
                          >
                            +10
                          </button>
                        </div>
                      </td>

                      {/* delete variants */}
                      <td className="py-3 px-4 text-center">
                        <button
                          id={`delete-prod-${p.id}`}
                          onClick={() => {
                            if (confirm(`Erase merchandise variant ${p.name} permanently?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="bg-white hover:bg-red-50 p-1.5 rounded-md border border-slate-200 text-slate-400 hover:text-red-500 cursor-pointer transition-all"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SHIPMENT COORDINATION QUEUE */}
      {activeTab === 'orders' && (
        <div className="p-5 md:p-7 flex flex-col gap-5 text-left" id="admin-orders-coordination">
          
          {/* Order Search */}
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by Order ID, Client name..."
              id="admin-order-search"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250 rounded-lg py-2 pl-9 pr-3 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 text-slate-800 font-medium"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>

          {/* Orders card stacks list */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl" id="admin-empty-orders">
              <span className="text-4xl block mb-2">📦</span>
              <p className="font-extrabold text-slate-800 text-xs">No active orders matching search query</p>
              <p className="text-[11px] text-slate-400 mt-1">Submit a checkout pipeline flow as client login to trigger live coordinates.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredOrders.map(order => (
                <div key={order.id} id={`admin-order-card-${order.id}`} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3 relative hover:border-slate-300 transition-all text-left">
                  
                  {/* Status header control banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white border border-slate-200/60 p-2.5 rounded-lg">
                    <div className="text-xs">
                      <span className="font-mono font-black text-slate-900 uppercase">LEDGER ROUTE #{order.id}</span>
                      <span className="text-slate-300 mx-2 font-light">|</span>
                      <span className="text-slate-505 font-semibold text-slate-500">Scheduled: {order.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Logistics Status:</span>
                      <select
                        id={`status-changer-${order.id}`}
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded cursor-pointer border focus:outline-none ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : order.status === 'Pending'
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : order.status === 'Shipped'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                            : 'bg-rose-50 border-red-200 text-red-650 text-red-600'
                        }`}
                      >
                        <option value="Pending">Pending Audit</option>
                        <option value="Shipped">Dispatched / Shipped</option>
                        <option value="Delivered">Delivered Successfully</option>
                        <option value="Cancelled">Cancelled Entirely</option>
                      </select>
                    </div>
                  </div>

                  {/* Consignee dispatch detail banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 text-xs py-1 border-b border-dashed border-slate-200 pb-3">
                    <div className="text-left">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Shipping Consignee Destination</span>
                      <strong className="text-slate-800 font-extrabold block">{order.shippingAddress.fullName}</strong>
                      <p className="text-slate-500 font-normal leading-relaxed mt-0.5">{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 && `${order.shippingAddress.addressLine2}, `}{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
                      <span className="text-[10px] text-slate-400 font-medium block mt-1">Email: {order.shippingAddress.email} | Mobile: {order.shippingAddress.phone}</span>
                    </div>

                    <div className="text-left sm:text-right flex flex-col justify-end sm:items-end gap-1 text-xs">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Authorization Specs</span>
                      <p className="text-slate-600 font-bold">Settlement Gateway: <span className="uppercase text-slate-900">{order.paymentMethod}</span></p>
                      <p className="text-slate-600 font-bold">Delivery Estimate: <span className="text-slate-900">{order.estimatedDelivery}</span></p>
                    </div>
                  </div>

                  {/* Products roll lists */}
                  <div className="flex flex-col gap-2.5 pl-1.5 text-xs text-left">
                    {order.items.map((item, keyIdx) => (
                      <div key={keyIdx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <img src={item.image} alt={item.name} className="w-7 h-7 object-contain rounded border border-slate-100 bg-white" referrerPolicy="no-referrer" />
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-750 text-slate-800 block truncate max-w-[200px] sm:max-w-md leading-tight">{item.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total pricing breakups */}
                  <div className="flex flex-wrap justify-between items-center text-xs bg-slate-200/40 p-2.5 rounded-lg mt-1 font-normal text-slate-500 leading-relaxed text-left gap-1">
                    <span>Units price: ₹{order.subtotal?.toLocaleString('en-IN') || 0} + Shipping: ₹{order.shippingFee || 0} + GST: ₹{order.tax?.toLocaleString('en-IN') || 0}</span>
                    <span className="font-black text-slate-900">
                      Dispatched Invoiced Total: <strong className="text-indigo-600 text-xs ml-1 font-black">₹{order.total.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
