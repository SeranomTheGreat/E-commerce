/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  User, 
  SlidersHorizontal, 
  Search, 
  Compass, 
  Grid, 
  Heart, 
  Sliders, 
  CheckCircle, 
  X, 
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Percent,
  History,
  MapPin
} from 'lucide-react';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, Order, UserProfile, ShippingDetails, Review } from './types';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AIShoppingAssistant } from './components/AIShoppingAssistant';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPanel } from './components/CheckoutPanel';
import { AccountPanel } from './components/AccountPanel';
import { AdminDashboard } from './components/AdminDashboard';

// Demo Credentials profiles
const DEMO_USER_PROFILE: UserProfile = {
  fullName: 'Jane Doe',
  email: 'user@swiftcart.com',
  phone: '+91 98765 43210',
  savedAddresses: [
    {
      fullName: 'Jane Doe',
      phone: '+91 98765 43210',
      email: 'user@swiftcart.com',
      addressLine1: 'Flat 401, Sapphire Residency',
      addressLine2: 'Hiranandani Meadows',
      city: 'Thane',
      state: 'Maharashtra',
      zipCode: '400610'
    },
    {
      fullName: 'Jane Doe (Office Address)',
      phone: '+91 98223 34455',
      email: 'work.doe@gmail.com',
      addressLine1: 'Ground Floor, TechHub Incubator',
      addressLine2: 'Mindspace IT Park',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500081'
    }
  ]
};

const DEMO_ADMIN_PROFILE: UserProfile = {
  fullName: 'Staff Administrator',
  email: 'admin@swiftcart.com',
  phone: '+91 91234 56789',
  savedAddresses: []
};

// Populate a beautiful initial mock purchase history for Jane
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ORD-984124',
    date: '2026-06-03',
    shippingAddress: DEMO_USER_PROFILE.savedAddresses[0],
    paymentMethod: 'card',
    items: [
      {
        productId: 'elec-1',
        name: 'Acura ANC Wireless Earbuds',
        price: 3499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
      },
      {
        productId: 'fash-1',
        name: 'Urban Canvas Field Jacket',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 5998,
    discountAmount: 0,
    shippingFee: 99,
    tax: 1080,
    total: 7177,
    status: 'Delivered',
    estimatedDelivery: 'Arrived Tuesday, June 2, 2026'
  }
];

export default function App() {
  // --- CORE MASTER DATA STATES ---
  const [products, setProducts] = useState<Product[]>(() => {
    // Populate simple mock reviews on load
    return INITIAL_PRODUCTS.map(p => ({
      ...p,
      reviews: p.reviews || [
        {
          id: `rev-base-${p.id}`,
          userName: 'Arjun S.',
          rating: p.rating >= 4.6 ? 5 : 4,
          comment: `Absolutely wonderful product! Surpassed my expectations on materials and shipping speed. Highly recommend ${p.brand}!`,
          createdAt: '2026-05-28'
        }
      ]
    }));
  });

  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);

  // --- INTERACTION & SCREEN NAVIGATION ---
  const [activeTab, setActiveTab] = useState<'marketplace' | 'account' | 'admin-dashboard' | 'checkout'>('marketplace');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- AUTHENTICATED USER STATE ---
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  // --- MARKETPLACE FILTERS & QUERY STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceBudget, setPriceBudget] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<string>('default');
  const [filterDiscountOnly, setFilterDiscountOnly] = useState(false);
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);

  // --- USER INTERACTION PERSISTENT STATES ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Toast confirmation message
  const [toastMsg, setToastMsg] = useState('');

  // Auto clear toast utility
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  // --- LOGIN / LOGOUT PORTAL HANDLERS ---
  const handleLogin = (email: string, role: 'user' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN_PROFILE);
      setUserRole('admin');
      setActiveTab('admin-dashboard');
      showToast('Admin Control deck unlocked successfully!');
    } else {
      setCurrentUser(DEMO_USER_PROFILE);
      setUserRole('user');
      setActiveTab('marketplace');
      showToast('Logged in successfully! Address books synced.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setActiveTab('marketplace');
    showToast('Logged out securely.');
  };

  // --- INVENTORY OPERATIONS (ADMIN CONTROL DECK) ---
  const handleUpdateProductStock = (id: string, newStock: number) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === id ? { ...p, stock: newStock } : p)
    );
    showToast('Stock level adjusted successfully.');
  };

  const handleUpdateProductPrice = (id: string, newPrice: number) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === id ? { ...p, price: newPrice, originalPrice: newPrice * 1.25 } : p)
    );
    showToast('Merchandise Price modified.');
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    showToast(`New product "${newProduct.name}" appended to Marketplace!`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    showToast('Merchandise listing terminated.');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    showToast(`Order status set to ${newStatus}.`);
  };

  // --- MARKETPLACE CLIENT OPERATION TRIGGERS ---
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    // Add to recently viewed if not already present
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6); // Cap at 6 items
    });
  };

  const handleAddToCart = (product: Product, qty: number = 1) => {
    if (product.stock === 0) {
      showToast('Cannot add: Merchandise is out of stock!');
      return;
    }

    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        // Enforce stock ceiling limits
        const targetQty = Math.min(product.stock, existing.quantity + qty);
        showToast(`Updated quantity of ${product.name} in basket.`);
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: targetQty, savedForLater: false } 
            : item
        );
      } else {
        showToast(`Added ${product.name} to shopping cart.`);
        return [...prevItems, { product, quantity: Math.min(product.stock, qty), savedForLater: false }];
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart entirely.');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleToggleSaveForLater = (productId: string) => {
    setCartItems(prev => 
      prev.map(item => item.product.id === productId ? { ...item, savedForLater: !item.savedForLater } : item)
    );
    showToast('Cart saved preferences updated.');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isPresent = prev.some(p => p.id === product.id);
      if (isPresent) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist.`);
        return [...prev, product];
      }
    });
  };

  const handleAddReview = (productId: string, review: Review) => {
    setProducts(prevProducts => 
      prevProducts.map(p => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [review, ...currentReviews];
          const newAvgRating = parseFloat(
            ((p.rating * p.reviewCount + review.rating) / (p.reviewCount + 1)).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: p.reviewCount + 1
          };
        }
        return p;
      })
    );
    
    // Sync the active modal view object representation
    setSelectedProduct(currentModal => {
      if (currentModal && currentModal.id === productId) {
        const currentReviews = currentModal.reviews || [];
        const updatedReviews = [review, ...currentReviews];
        const newAvgRating = parseFloat(
          ((currentModal.rating * currentModal.reviewCount + review.rating) / (currentModal.reviewCount + 1)).toFixed(1)
        );
        return {
          ...currentModal,
          reviews: updatedReviews,
          rating: newAvgRating,
          reviewCount: currentModal.reviewCount + 1
        };
      }
      return currentModal;
    });

    showToast('Review approved and appended immediately!');
  };

  // --- CHECKOUT COORDINATES TRIGGERS ---
  const handleSetOrderCompleted = (
    orderId: string, 
    estimatedDelivery: string, 
    finalBillTotal: number, 
    shipping: ShippingDetails,
    method: 'card' | 'upi' | 'cod'
  ) => {
    // Collect active items
    const activeCartList = cartItems.filter(item => !item.savedForLater);
    
    // Deduct stock levels dynamically
    setProducts(prevProducts => 
      prevProducts.map(p => {
        const boughtItem = activeCartList.find(b => b.product.id === p.id);
        if (boughtItem) {
          return {
            ...p,
            stock: Math.max(0, p.stock - boughtItem.quantity)
          };
        }
        return p;
      })
    );

    const invoiceItems = activeCartList.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0]
    }));

    const itemsSubtotal = activeCartList.reduce((acc, current) => acc + (current.product.price * current.quantity), 0);
    const taxValue = Math.round(itemsSubtotal * 0.18);
    const shippingFee = itemsSubtotal > 5000 ? 0 : 99;

    const brandNewOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      shippingAddress: shipping,
      paymentMethod: method,
      items: invoiceItems,
      subtotal: itemsSubtotal,
      discountAmount: 0,
      shippingFee: shippingFee,
      tax: taxValue,
      total: finalBillTotal,
      status: 'Pending',
      estimatedDelivery: estimatedDelivery
    };

    // Append orders and empty active cart Items (keep saved items)
    setOrders(prev => [brandNewOrder, ...prev]);
    setCartItems(prev => prev.filter(item => item.savedForLater));
    
    // Enforce prompt gate auth profile addresses insertion if not already matching
    if (currentUser && currentUser.email === 'user@swiftcart.com') {
      const addressExists = currentUser.savedAddresses.some(
        a => a.addressLine1.toLowerCase() === shipping.addressLine1.toLowerCase()
      );
      if (!addressExists) {
        setCurrentUser(profile => {
          if (profile) {
            return {
              ...profile,
              savedAddresses: [...profile.savedAddresses, shipping]
            };
          }
          return profile;
        });
      }
    }

    showToast(`Order #${orderId} generated successfully!`);
    
    // Re-route logged user directly to review order queues inside profile screens!
    if (!currentUser) {
      // Simulate automatic guest login to let them review
      setCurrentUser({
        fullName: shipping.fullName,
        email: shipping.email,
        phone: shipping.phone,
        savedAddresses: [shipping]
      });
      setUserRole('user');
    }
    setActiveTab('account');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  // --- FILTER & SORTING EXECUTION LAYER ---
  const activeDirectoryCategories = [
    'All',
    'Mobiles',
    'Laptops',
    'Electronics',
    'Fashion',
    'Shoes',
    'Home Appliances',
    'Furniture',
    'Grocery',
    'Beauty',
    'Books',
    'Toys',
    'Sports'
  ];

  const processedCatalogItems = products
    .filter(p => {
      // 1. Search key filters
      const matchQuery = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase() === searchTerm.toLowerCase());
      
      // 2. Category filters
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;

      // 3. Price limit sliders
      const matchPrice = p.price <= priceBudget;

      // 4. Custom filters
      const matchDiscount = !filterDiscountOnly || p.discount > 0;
      const matchStock = !filterLowStockOnly || p.stock <= 8;

      return matchQuery && matchCategory && matchPrice && matchDiscount && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      return 0; // default initial sorting logic
    });

  return (
    <div id="application-container" className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col font-sans">
      
      {/* Dynamic Toast popup alerts */}
      {toastMsg && (
        <div id="system-toast" className="fixed top-6 right-6 bg-slate-900 border border-slate-700 text-white rounded-2xl px-5 py-3.5 shadow-2xl z-50 text-xs font-semibold animate-slide-left flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Global Navigation Header line */}
      <header className="sticky top-0 bg-white border-b border-slate-200 z-30 shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand & Location Wrapper */}
          <div className="flex items-center gap-5">
            <div 
              onClick={() => { setActiveTab('marketplace'); setSelectedCategory('All'); }}
              className="flex items-center gap-2 cursor-pointer select-none"
              id="brand-logo"
            >
              <div className="p-2 bg-slate-900 rounded-lg text-white shadow">
                <ShoppingBag className="w-4.5 h-4.5 shrink-0 text-white" />
              </div>
              <span className="font-black text-slate-900 tracking-tight text-lg">
                Swift<strong className="text-indigo-600">Cart</strong>
              </span>
              <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-200">v1.2</span>
            </div>

            {/* Delivery Location Selector Panel */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-5 h-8">
              <MapPin className="w-4 h-4 text-slate-400" />
              <div className="text-left font-medium leading-tight">
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Deliver to</div>
                <div className="font-extrabold text-slate-700 truncate max-w-[130px]" id="delivery-location-label">
                  {currentUser && currentUser.savedAddresses.length > 0 
                    ? `${currentUser.savedAddresses[0].city} ${currentUser.savedAddresses[0].zipCode}`
                    : 'India'}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Dominant Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xl mx-4">
            <div className="relative w-full flex items-center bg-slate-150 bg-slate-100 border border-slate-200 focus-within:border-slate-400 focus-within:bg-white rounded-xl transition-all">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search for flagship devices, sneakers, creator workstations..."
                id="header-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-2.5 pl-10 pr-10 text-xs focus:outline-none text-slate-800"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3.5 text-slate-450 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation and Actions Controls Panel */}
          <div className="flex items-center gap-3">
            <button
              id="nav-marketplace"
              onClick={() => setActiveTab('marketplace')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'marketplace' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Marketplace</span>
            </button>

            {/* Admin selector block if eligible role */}
            {userRole === 'admin' && (
              <button
                id="nav-admin"
                onClick={() => setActiveTab('admin-dashboard')}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'admin-dashboard' ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Admin Deck</span>
              </button>
            )}

            <button
              id="nav-account"
              onClick={() => setActiveTab('account')}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'account' ? 'bg-indigo-55 bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? currentUser.fullName.split(' ')[0] : 'Sign In'}</span>
            </button>

            <div className="h-6 w-px bg-slate-200" />

            {/* Wishlist Link badge */}
            <button
              id="nav-wishlist"
              onClick={() => { setActiveTab('account'); showToast('Opened your account wishlist catalog view.'); }}
              className="relative p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              aria-label="Wishlist Catalog"
            >
              <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? 'text-rose-500 fill-current' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white rounded-full text-[9px] font-black h-4 w-4 flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger badge */}
            <button
              id="trigger-cart-drawer"
              onClick={() => setIsCartOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition shadow-sm flex items-center gap-1.5 relative cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-black min-w-[12px]">
                {cartItems.filter(i => !i.savedForLater).reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main viewport layouts */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col">
        
        {/* VIEW 1: ACTIVE SECURED CHECKOUT PROCESS CONTROL */}
        {activeTab === 'checkout' && (
          <CheckoutPanel
            onBackToCart={() => { setActiveTab('marketplace'); setIsCartOpen(true); }}
            cartItems={cartItems}
            savedAddresses={currentUser ? currentUser.savedAddresses : []}
            onSetOrderCompleted={handleSetOrderCompleted}
          />
        )}

        {/* VIEW 2: ACCOUNT LEDGER / USER TRANSACTION LOGS */}
        {activeTab === 'account' && (
          <AccountPanel
            user={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            orders={orders}
            wishlist={wishlist}
            recentlyViewed={recentlyViewed}
            onRemoveFromWishlist={handleToggleWishlist}
            onMoveWishlistItemToCart={(p) => { handleAddToCart(p); handleToggleWishlist(p); }}
            onViewProduct={handleViewProductDetails}
          />
        )}

        {/* VIEW 3: SYSTEM ADMINISTRATORS COMPREHENSIVE OVERVIEW */}
        {activeTab === 'admin-dashboard' && userRole === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            onUpdateProductStock={handleUpdateProductStock}
            onUpdateProductPrice={handleUpdateProductPrice}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {/* VIEW 4: DEFAULT MARKETPLACE CONSOLE */}
        {activeTab === 'marketplace' && (
          <div className="flex flex-col gap-6" id="marketplace-screen">
            
            {/* Search inputs responsive on mobile devices */}
            <div className="flex md:hidden items-center relative w-full">
              <input
                type="text"
                placeholder="Search premium merchandise..."
                id="header-search-mobile"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-9 pr-3 text-xs focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>

            {/* Slideshow banners carousel */}
            <HeroCarousel
              onSelectCategory={(cat) => { setSelectedCategory(cat); showToast(`Directory filtered: ${cat}`); }}
              onExploreProducts={() => showToast('Scrolling to marketplace directory index.')}
            />

            {/* Categorization chips slider block */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {activeDirectoryCategories.map(cat => (
                <button
                  key={cat}
                  id={`category-chip-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 border border-slate-900 text-white shadow shadow-slate-300'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
              
              {/* Sidebar Filters panel */}
              <aside className="w-full lg:w-[250px] bg-white border border-slate-100 p-5 rounded-3xl flex flex-col gap-5 text-left shrink-0 shadow-sm" id="catalog-sidebar-filters">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="text-xs font-black text-slate-905 uppercase tracking-widest flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-505" />
                    Filters Setup
                  </span>
                  
                  {/* Reset operations */}
                  {(searchTerm || selectedCategory !== 'All' || priceBudget < 150000 || sortBy !== 'default' || filterDiscountOnly || filterLowStockOnly) && (
                    <button
                      id="reset-filters-btn"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setPriceBudget(150000);
                        setSortBy('default');
                        setFilterDiscountOnly(false);
                        setFilterLowStockOnly(false);
                        showToast('Filters cleared.');
                      }}
                      className="text-[10px] bg-red-50 text-red-500 font-extrabold px-2 py-0.5 rounded-md hover:bg-red-100 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Section: Price Constraints */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pricing Threshold</span>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400">Up to:</span>
                    <strong className="text-indigo-650 font-extrabold text-sm text-indigo-600">₹{priceBudget.toLocaleString('en-IN')}</strong>
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={150000}
                    step={100}
                    id="price-range-slider"
                    value={priceBudget}
                    onChange={(e) => setPriceBudget(parseInt(e.target.value, 10))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono font-bold uppercase">
                    <span>₹300</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>

                {/* Filter Section: Sorting modes selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order Rankings</span>
                  <select
                    id="sort-ranking-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-slate-250 bg-white rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-indigo-550 focus:outline-none text-slate-700"
                  >
                    <option value="default">Default Catalog Order</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Customer Reviews Spec</option>
                    <option value="popularity">Popularity / Hits</option>
                  </select>
                </div>

                {/* Filter Section: Binary properties checks */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-extrabold pb-1">Special Index</span>
                  
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer py-1 select-none">
                    <input
                      type="checkbox"
                      id="checkbox-discount"
                      checked={filterDiscountOnly}
                      onChange={(e) => setFilterDiscountOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Discounts Offerings Only</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-600 font-medium cursor-pointer py-1 select-none">
                    <input
                      type="checkbox"
                      id="checkbox-stock"
                      checked={filterLowStockOnly}
                      onChange={(e) => setFilterLowStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Low Stock Shortage Warnings</span>
                  </label>
                </div>
              </aside>

              {/* Marketplace list grid */}
              <div className="flex-1 min-w-0 flex flex-col gap-6">
                
                {/* upper summaries info */}
                <div className="flex justify-between items-center bg-white border border-slate-100 px-5 py-3 rounded-2xl shadow-sm rounded-xl">
                  <span className="text-xs font-bold text-slate-500">
                    Inventory displays: <strong className="text-slate-800 font-black">{processedCatalogItems.length} Products Found</strong>
                  </span>
                  {selectedCategory !== 'All' && (
                    <span className="text-[10px] font-extrabold uppercase bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                      Filtered Directory: {selectedCategory}
                    </span>
                  )}
                </div>

                {/* core grid */}
                {processedCatalogItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl text-center" id="no-products-match">
                    <span className="text-5xl mb-4">🔍</span>
                    <h3 className="font-bold text-slate-800 text-sm">No items match your specifications</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">Consider resetting the search bar query or expanding the price range budget slider!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="products-marketplace-grid">
                    {processedCatalogItems.map(p => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onViewDetails={handleViewProductDetails}
                        onAddToCart={(prod) => handleAddToCart(prod, 1)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some(w => w.id === p.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global persistent Footer section */}
      <footer className="bg-slate-900 border-t border-slate-800 py-10 mt-auto text-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-light tracking-wide text-left">
          
          {/* Column A: branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="font-black text-white tracking-tight text-sm">SwiftCart Sandbox</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Fully interactive merchant sandbox simulating state-rich order logging, smart recommendations, and dynamic inventory restocks instantly.
            </p>
          </div>

          {/* Column B: demo logins reminder and shortcuts */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block mb-2">Authenticated sandboxes</span>
            <div className="flex flex-col gap-1.5 font-mono text-slate-400 text-[11px]">
              <p>📍 User: <strong className="text-slate-200">user@swiftcart.com</strong> <span className="text-slate-500">pin: user123</span></p>
              <p>📍 Admin: <strong className="text-slate-200">admin@swiftcart.com</strong> <span className="text-slate-500">pin: admin123</span></p>
            </div>
            <p className="text-slate-500 text-[10px] mt-2 italic leading-snug">Sign in dynamically inside account portal tabs to authorize saved shipping destination autofills.</p>
          </div>

          {/* Column C: compliance declarations */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-[#7c3aed] text-indigo-400 uppercase tracking-widest">SSL secure compliance</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <p className="text-slate-400 leading-snug">All transaction records are fully virtual and sandboxed for testing and evaluation purposes with zero merchant debiting risk.</p>
            </div>
            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500">
              <span>© 2026 SwiftCart. All virtual rights reserved under Apache-2.0.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent conversational floating Artificial Intelligence Shopping Assistant Widget */}
      <AIShoppingAssistant 
        products={products}
        onSelectProduct={(p) => { handleViewProductDetails(p); }}
      />

      {/* Persistent Shopping Cart drawer module panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleSaveForLater={handleToggleSaveForLater}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Persistent Product details modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, qty) => { handleAddToCart(p, qty); setSelectedProduct(null); }}
          onBuyNow={(p, qty) => { handleAddToCart(p, qty); setSelectedProduct(null); handleProceedToCheckout(); }}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
          onSelectProduct={(p) => handleViewProductDetails(p)}
          onAddReview={handleAddReview}
          relatedProducts={products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
        />
      )}
    </div>
  );
}
