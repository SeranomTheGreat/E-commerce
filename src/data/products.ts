/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- MOBILES (4) ---
  {
    id: 'mob-1',
    name: 'AeroPhone Pro 15',
    brand: 'Aero',
    category: 'Mobiles',
    price: 74900,
    originalPrice: 79900,
    discount: 6,
    rating: 4.8,
    reviewCount: 328,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565849906461-0e443500e2d8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience the next generation of mobile computing with AeroPhone Pro 15. Featuring a breathtaking Super AMOLED display, triple-lens pro camera system, and all-day extreme battery life.',
    specs: {
      'Display': '6.7-inch Super Retina XDR OLED',
      'Processor': 'A17 Bionic chip Hexa-core',
      'RAM': '8 GB',
      'Storage': '256 GB NVMe',
      'Rear Camera': '48MP + 12MP + 12MP Triple Setup',
      'Battery': '4500 mAh with 30W wireless charging support'
    },
    tags: ['smartphone', 'mobile', 'flagship', 'aero', 'under 100000', 'under 80000'],
    popularity: 10,
    createdAt: '2026-03-10'
  },
  {
    id: 'mob-2',
    name: 'Nova Lite X3',
    brand: 'Nova',
    category: 'Mobiles',
    price: 18499,
    originalPrice: 22999,
    discount: 19,
    rating: 4.3,
    reviewCount: 145,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The Nova Lite X3 redefines budget performance. Packed with a high-capacity battery, sharp quad-camera array, and a fast Snapdragon processor, it represents exceptional value.',
    specs: {
      'Display': '6.5-inch IPS LCD 90Hz',
      'Processor': 'Snapdragon 680 Octa-core',
      'RAM': '6 GB',
      'Storage': '128 GB (Expandable up to 512GB)',
      'Rear Camera': '50MP + 8MP + 2MP + 2MP Quad Setup',
      'Battery': '5000 mAh with 18W fast charging'
    },
    tags: ['mobile', 'budget', 'nova', 'under 20000', 'under 30000'],
    popularity: 8,
    createdAt: '2026-04-12'
  },
  {
    id: 'mob-3',
    name: 'Zenith Fold Alpha',
    brand: 'Zenith',
    category: 'Mobiles',
    price: 124999,
    originalPrice: 139999,
    discount: 10,
    rating: 4.6,
    reviewCount: 84,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Transform how you multitask, create, and watch with the Zenith Fold Alpha. The pioneering foldable dynamic screen offers tablet-like viewing workspace in a smartphone pocket form-factor.',
    specs: {
      'Display': '7.6-inch Foldable Dynamic AMOLED 2X (Unfolded)',
      'Processor': 'Snapdragon 8 Gen 2',
      'RAM': '12 GB LPDDR5X',
      'Storage': '512 GB UFS 4.0',
      'Camera': '50MP Triple Camera with dual OIS',
      'Battery': '4400 mAh dual-cell system'
    },
    tags: ['foldable', 'premium', 'flagship', 'mobile', 'zenith'],
    popularity: 9,
    createdAt: '2026-01-20'
  },
  {
    id: 'mob-4',
    name: 'Vortex Play Elite',
    brand: 'Vortex',
    category: 'Mobiles',
    price: 28999,
    originalPrice: 34999,
    discount: 17,
    rating: 4.5,
    reviewCount: 198,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1565849906461-0e443500e2d8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Engineering excellence for gaming enthusiasts. Vortex Play Elite delivers incredibly smooth frame rates, ultra-low latency response, and advanced thermal liquid-cooling tech.',
    specs: {
      'Display': '6.67-inch OLED 144Hz Refresh',
      'Processor': 'MediaTek Dimensity 8200 Ultra',
      'RAM': '8 GB LPDDR5',
      'Storage': '256 GB UFS 3.1',
      'Cooling': 'IceVapor Chamber Liquid Cooling',
      'Battery': '5080 mAh with 67W Turbo Charge'
    },
    tags: ['gaming', 'mobile', 'vortex', 'under 30000', 'under 50000'],
    popularity: 8,
    createdAt: '2026-05-01'
  },

  // --- LAPTOPS (4) ---
  {
    id: 'lap-1',
    name: 'AeroBook Ultra 14',
    brand: 'Aero',
    category: 'Laptops',
    price: 89900,
    originalPrice: 99900,
    discount: 10,
    rating: 4.8,
    reviewCount: 412,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Thin, light, and endlessly powerful. Crafted from space-grade aluminum, the AeroBook Ultra has an elegant 3K display, state-of-the-art processors, and battery life that outlasts your longest workdays.',
    specs: {
      'Display': '14.2-inch 3K Liquid Retina (120Hz)',
      'Processor': 'Intel Core i7 13th Gen Nano',
      'RAM': '16 GB LPDDR5',
      'Storage': '1 TB Ultra-Fast SSD',
      'Graphics': 'Intel Iris Xe Graphics',
      'Weight': '1.24 kg'
    },
    tags: ['laptop', 'ultrabook', 'aero', 'premium', 'under 100000', 'student'],
    popularity: 10,
    createdAt: '2026-02-15'
  },
  {
    id: 'lap-2',
    name: 'Vortex Titan Strike',
    brand: 'Vortex',
    category: 'Laptops',
    price: 114999,
    originalPrice: 129999,
    discount: 11,
    rating: 4.7,
    reviewCount: 156,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Unleash elite portable gaming power. High-refresh OLED monitors matched with Nvidia RTX graphics ensure you lead every scoreboard with lag-free graphics and zero screen tearing.',
    specs: {
      'Display': '15.6-inch QHD OLED 240Hz',
      'Processor': 'AMD Ryzen 9 7940HS',
      'RAM': '32 GB DDR5 Dual Channel',
      'Storage': '1 TB Gen 4 SSD',
      'Graphics': 'NVIDIA GeForce RTX 4070 (8GB)',
      'Keyboard': 'RGB Per-Key Backlit Mechanical'
    },
    tags: ['gaming', 'laptop', 'vortex', 'rtx', 'premium', 'under 150000'],
    popularity: 9,
    createdAt: '2026-04-05'
  },
  {
    id: 'lap-3',
    name: 'NovaBook Essential 15',
    brand: 'Nova',
    category: 'Laptops',
    price: 32900,
    originalPrice: 39900,
    discount: 17,
    rating: 4.2,
    reviewCount: 228,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The smart choice for online learning, remote office, and multimedia streaming. Light on price but big on features, with a comfortable full-sized keyboard and superb anti-glare display.',
    specs: {
      'Display': '15.6-inch Full HD Anti-Glare',
      'Processor': 'Intel Core i3 11th Gen',
      'RAM': '8 GB DDR4',
      'Storage': '512 GB PCIe SSD',
      'OS': 'Windows 11 Home pre-installed',
      'Weight': '1.65 kg'
    },
    tags: ['laptop', 'budget', 'student', 'office', 'nova', 'under 40000', 'under 50000'],
    popularity: 7,
    createdAt: '2026-05-10'
  },
  {
    id: 'lap-4',
    name: 'OmniWork Creator Max',
    brand: 'Omni',
    category: 'Laptops',
    price: 144999,
    originalPrice: 159999,
    discount: 9,
    rating: 4.9,
    reviewCount: 64,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The ultimate portable studio for creative professionals. High dynamic color accuracy, supreme multi-threading performance, and quiet dual fans make professional audio, video, and design workflows effortless.',
    specs: {
      'Display': '16-inch UHD+ mini-LED calibrated, 100% DCI-P3',
      'Processor': 'Intel Core i9 14th Gen Extreme',
      'RAM': '64 GB LPDDR5X',
      'Storage': '2 TB NVMe Professional SSD',
      'Graphics': 'NVIDIA Studio RTX 4080 (12GB)',
      'Security': 'Biometric Windows Hello Fingerprint'
    },
    tags: ['laptop', 'creator', 'premium', 'omni', 'production'],
    popularity: 9,
    createdAt: '2026-05-20'
  },

  // --- ELECTRONICS (4) ---
  {
    id: 'elec-1',
    name: 'Acura ANC Wireless Earbuds',
    brand: 'Acura',
    category: 'Electronics',
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    rating: 4.5,
    reviewCount: 928,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Block out ambient distractions and submerge into acoustics. Acura active noise cancelling algorithms eliminate up to 98% of external sounds. Rich bass, pristine treble, and 30-hour playback combo.',
    specs: {
      'Type': 'In-ear Truly Wireless',
      'Noise Cancelling': 'Active (ANC) up to 40dB',
      'Battery Life': '6 hours earbuds + 24 hours charge case',
      'Bluetooth Version': 'v5.3 Low Delay',
      'Waterproof Standard': 'IPX5 Sweat Resistant'
    },
    tags: ['audio', 'earbuds', 'electronics', 'acura', 'anc', 'under 5000'],
    popularity: 10,
    createdAt: '2026-04-01'
  },
  {
    id: 'elec-2',
    name: 'OmniView 4K Smart Projector',
    brand: 'Omni',
    category: 'Electronics',
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    rating: 4.6,
    reviewCount: 114,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Turn any flat surface into a luxury movie theater. Boasting razor-sharp 4K decoding resolution, seamless built-in Android Streaming apps, auto-keystone configuration, and premium dual box speakers.',
    specs: {
      'Brightness': '2500 ANSI Lumens',
      'Projection Size': '50 - 200 inches',
      'Audio Source': 'Built-in 2x 10W Dolby Stereo',
      'Connectivity': 'WiFi 6, Bluetooth, Dual HDMI, USB',
      'Operating System': 'Smart TV OS with Play Store'
    },
    tags: ['electronics', 'projector', 'theater', 'omni', 'under 50000'],
    popularity: 8,
    createdAt: '2026-03-22'
  },
  {
    id: 'elec-3',
    name: 'Zenith Watch Pro Active',
    brand: 'Zenith',
    category: 'Electronics',
    price: 5499,
    originalPrice: 8999,
    discount: 38,
    rating: 4.4,
    reviewCount: 512,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'A dedicated companion for your fitness and wellness journey. Track blood oxygen, continuous heart rate, sleep metrics, and over 100 indoor/outdoor sports activities dynamically with real-time GPS routing.',
    specs: {
      'Display': '1.85-inch AMOLED Premium Display',
      'Battery Life': 'Up to 10 days normal, 24 days standby',
      'Waterproof': '5ATM Swim Resistant',
      'Sensors': 'Real-time Heart Rate, SpO2, Accelerometer, GPS'
    },
    tags: ['smartwatch', 'fitness', 'electronics', 'zenith', 'under 10000', 'under 50000'],
    popularity: 9,
    createdAt: '2026-05-02'
  },
  {
    id: 'elec-4',
    name: 'AeroCharge Multi-Device Station',
    brand: 'Aero',
    category: 'Electronics',
    price: 2490,
    originalPrice: 3990,
    discount: 37,
    rating: 4.3,
    reviewCount: 382,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'De-clutter your desk space immediately. Charges your premium phone, smartwatch, and earbud pods concurrently via safe, high-speed single-connection magnetic induction circuits.',
    specs: {
      'Charging Ports': '3-in-1 Triple Magnetic charger',
      'Output Power': '15W Phone + 5W Pods + 2.5W Watch',
      'Safety': 'Over-temperature control and high voltage surge protection',
      'Charging Standard': 'Qi Compatible Wireless'
    },
    tags: ['charger', 'station', 'electronics', 'aero', 'under 5000'],
    popularity: 7,
    createdAt: '2026-05-08'
  },

  // --- FASHION (4) ---
  {
    id: 'fash-1',
    name: 'Urban Canvas Field Jacket',
    brand: 'SwiftStyle',
    category: 'Fashion',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.4,
    reviewCount: 380,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The epitome of utility meeting style. Tailored carefully with weather-resistant heavy structured cotton canvas. This jacket features multiple cargo pockets and inner drawstrings for custom silhouette.',
    specs: {
      'Material': '100% Breathable Structured Cotton',
      'Fit': 'Regular Comfort Utility Fit',
      'Closure': 'Heavy Brass Zip with Storm Button Flap',
      'Care': 'Machine wash cold inside out'
    },
    tags: ['jacket', 'outerwear', 'fashion', 'men', 'swiftstyle', 'under 3000'],
    popularity: 9,
    createdAt: '2026-01-15'
  },
  {
    id: 'fash-2',
    name: 'Luxe Cashmere Knit Cardigan',
    brand: 'LuxeArt',
    category: 'Fashion',
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    rating: 4.7,
    reviewCount: 124,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Indulge in supreme warmth and buttery-soft luxury. Sourced sustainably from premium cashmere fibers, this rib-trimmed button cardigan is lightweight, cloud-soft, and designed to stay in shape.',
    specs: {
      'Material': '80% Premium Cashmere, 20% Fine Wool Blend',
      'Details': 'Tortoise buttons, ribbed hem & cuffs',
      'Texture': 'Ultra-soft, non-scratch micro-texture',
      'Care': 'Professional Dry clean recommended'
    },
    tags: ['cardigan', 'wool', 'fashion', 'women', 'luxeart', 'under 5000'],
    popularity: 8,
    createdAt: '2026-03-05'
  },
  {
    id: 'fash-3',
    name: 'Slim Fit Indigo Denim Jeans',
    brand: 'SwiftStyle',
    category: 'Fashion',
    price: 1599,
    originalPrice: 2999,
    discount: 46,
    rating: 4.3,
    reviewCount: 520,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Modern slim tailored jeans made from highly flexible comfort stretch denim. Naturally faded with ecological lasers for a refined vintage, wear-anywhere lifestyle look.',
    specs: {
      'Material': '98% Heavy Denim Cotton, 2% High-Elastic Elastane',
      'Rise': 'Mid-rise comfort structured waist',
      'Stitch': 'Reinforced dual-line copper stitching',
      'Stretch Factor': 'Medium flexibility retention science'
    },
    tags: ['jeans', 'denim', 'fashion', 'swiftstyle', 'under 2000'],
    popularity: 9,
    createdAt: '2026-04-18'
  },
  {
    id: 'fash-4',
    name: 'Retro Pleated Summer Dress',
    brand: 'VogueClub',
    category: 'Fashion',
    price: 1899,
    originalPrice: 3499,
    discount: 45,
    rating: 4.5,
    reviewCount: 304,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Charmingly lightweight pleated midi dress perfect for sunny outings and beach getaways. Breathable organic rayon weave printed with gentle neutral daisy patterns and fitted with adjustable shoulder tie straps.',
    specs: {
      'Fabric': '100% Eco-certified Breathable Rayon',
      'Pattern': 'Hand-drawn Minimalist Botanical Print',
      'Length': 'Midi-length with dynamic tiered ruffles',
      'Lining': 'Full internal non-static breathable lining'
    },
    tags: ['dress', 'summer', 'fashion', 'women', 'vogueclub', 'under 2000'],
    popularity: 8,
    createdAt: '2026-05-12'
  },

  // --- SHOES (4) ---
  {
    id: 'shoe-1',
    name: 'Velocity Comfort Running Shoes',
    brand: 'Aero',
    category: 'Shoes',
    price: 3899,
    originalPrice: 5999,
    discount: 35,
    rating: 4.6,
    reviewCount: 684,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Accelerate your routine. Velocity running engineering leverages shock-absorbing cellular soles and porous woven mesh uppers that breathe continuously, relieving foot stress during endurance miles.',
    specs: {
      'Activity': 'Running, Gym, Daily Fitness Cardio',
      'Upper': 'Engineered Seamless Multi-density Prime Mesh',
      'Midsole': 'Reactive Energy-Return Foam Core',
      'Outsole': 'Pure carbon grid rubber for high-durability traction',
      'Weight': '240g balanced performance'
    },
    tags: ['running', 'shoes', 'sports', 'aero', 'fitness', 'under 5000'],
    popularity: 10,
    createdAt: '2026-03-11'
  },
  {
    id: 'shoe-2',
    name: 'Heritage Leather Urban Sneakers',
    brand: 'SwiftStyle',
    category: 'Shoes',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.4,
    reviewCount: 421,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The standard of casual luxury. Expertly crafted in rich suede and premium tumbled grain leather panels. Padded leather collars and cushioned orthotic insoles guarantee unmatched daily walkability.',
    specs: {
      'Upper': 'Full Tumbled Grain cowhide & soft suede details',
      'Insole': 'Orthotic memory foam with moisture control layers',
      'Outsole': 'Non-marking vulcanized natural flat rubber',
      'Lacing': 'Waxed high-friction flat weaves'
    },
    tags: ['sneakers', 'leather', 'shoes', 'casual', 'swiftstyle', 'under 3000'],
    popularity: 9,
    createdAt: '2026-04-03'
  },
  {
    id: 'shoe-3',
    name: 'Terrain Grip Waterproof Trail Boots',
    brand: 'Vortex',
    category: 'Shoes',
    price: 6499,
    originalPrice: 8999,
    discount: 27,
    rating: 4.7,
    reviewCount: 168,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Dominate muddy paths and steep gravel cliffs. Features advanced HydroShield internal bootie waterproofing mechanics, an impact-absorbing EVA frame, and robust high-friction self-cleaning deeply grooved safety lugs.',
    specs: {
      'Waterproof': 'HydroShield bootie system up to 4 hours immersion',
      'Shank': 'Rigid composite arch stability nylon shank',
      'Ankle Collar': 'High padded memory cushion wrap for sprain protection',
      'Claw Depth': '5.5mm deep multi-angle traction lugs'
    },
    tags: ['boots', 'hiking', 'shoes', 'waterproof', 'vortex', 'under 10000'],
    popularity: 8,
    createdAt: '2026-02-28'
  },
  {
    id: 'shoe-4',
    name: 'EcoLight Knit Slip-On Loafers',
    brand: 'EarthStep',
    category: 'Shoes',
    price: 1999,
    originalPrice: 3499,
    discount: 42,
    rating: 4.2,
    reviewCount: 290,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Crafted with the planet in mind. Lightweight, knitted slip-ons made using recycled plastic bottle yarns. Soft, flexible, machine washable, and incredibly comfortable for lounging or shopping runs.',
    specs: {
      'Upper': '100% Recycled Post-Consumer PET Knit',
      'Sole': 'Algae-derived biomass light flexibility EVA',
      'Weight': 'Only 160g - featherweight comfort',
      'Machine Washable': 'Yes, cold delicate cycle'
    },
    tags: ['loafers', 'slipon', 'shoes', 'eco', 'earthstep', 'under 2000'],
    popularity: 8,
    createdAt: '2026-05-15'
  },

  // --- HOME APPLIANCES (4) ---
  {
    id: 'appl-1',
    name: 'NeoPress 6-in-1 Air Fryer Oven',
    brand: 'Acura',
    category: 'Home Appliances',
    price: 6899,
    originalPrice: 10999,
    discount: 37,
    rating: 4.7,
    reviewCount: 1120,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Savor guilty pleasures with 90% less oil. Built with dual thermal vortex heating systems and a wide visual window to bake, roast, dehydrate, or air-fry delicious meals instantly for the whole family.',
    specs: {
      'Capacity': '8 Liters Glass Window Drawer',
      'Power Wattage': '1800W Turbo Heat',
      'Temperature Range': '40°C to 230°C digital precision',
      'Presets': '6 One-touch Digital cooking program algorithms',
      'Safety': 'Auto shutoff and burn-prevention safety sensor'
    },
    tags: ['airfryer', 'appliances', 'kitchen', 'acura', 'under 10000'],
    popularity: 10,
    createdAt: '2026-03-12'
  },
  {
    id: 'appl-2',
    name: 'SnoCyclone Smart Air Purifier',
    brand: 'Nova',
    category: 'Home Appliances',
    price: 9499,
    originalPrice: 14999,
    discount: 36,
    rating: 4.6,
    reviewCount: 310,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Rest and breathe pristine air. Armed with true HEPA H13 active filtration mesh, it traps 99.97% of PM2.5 particles, allergens, pet dander, and odors in rooms up to 500 sq ft within minutes.',
    specs: {
      'Filter Class': 'HEPA H13 Active Carbon Dual-Barrier',
      'CADR rating': '360 m³/h high efficiency',
      'Noise Level': '22dB ultra-quiet Sleep Mode',
      'App Integration': 'WiFi synced with real-time Air Quality PM2.5 tracking'
    },
    tags: ['purifier', 'appliances', 'home', 'nova', 'under 10000'],
    popularity: 9,
    createdAt: '2026-04-10'
  },
  {
    id: 'appl-3',
    name: 'HydraFlow Steam Garment Press',
    brand: 'Omni',
    category: 'Home Appliances',
    price: 2899,
    originalPrice: 4999,
    discount: 42,
    rating: 4.3,
    reviewCount: 418,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Remove heavy persistent fabric wrinkles immediately. Ready in under 30 seconds, this high-pressure continuous steam wand features non-drip ceramic soleplates and a wide 300ml water tank.',
    specs: {
      'Type': 'Professional Handheld Garment Steamer',
      'Steam Output': '25g/min continuous deep penetration',
      'Power': '1400W Fast heating element',
      'Soleplate': 'Micro-polished Ceramic coating non-scratch'
    },
    tags: ['steamer', 'appliances', 'laundry', 'omni', 'under 3000'],
    popularity: 8,
    createdAt: '2026-05-05'
  },
  {
    id: 'appl-4',
    name: 'Cyclic Robotic Vacuum S9',
    brand: 'Zenith',
    category: 'Home Appliances',
    price: 24900,
    originalPrice: 34900,
    discount: 28,
    rating: 4.5,
    reviewCount: 142,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Completely automate floor sweeping and wet mopping. Cyclic S9 uses LiDAR smart navigation to map rooms, design barrier walls, and dock itself automatically to self-empty the integrated dust collector.',
    specs: {
      'Suction Power': '4000Pa Cyclone Suction',
      'Navigation': '3D LiDAR Mapping with obstacle bypass sensors',
      'Function': 'Dual action sweeping + active pressure mopping',
      'Runtime': '150 mins with automatic return-to-dock recharge'
    },
    tags: ['vacuum', 'appliances', 'robotic', 'home', 'zenith', 'under 30000'],
    popularity: 9,
    createdAt: '2026-05-18'
  },

  // --- FURNITURE (4) ---
  {
    id: 'furn-1',
    name: 'Elysian Solid Oak Study Desk',
    brand: 'IKEA-Style',
    category: 'Furniture',
    price: 12900,
    originalPrice: 19900,
    discount: 35,
    rating: 4.7,
    reviewCount: 94,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'A timeless workspace anchor built with solid sustainable white oak. Features integrated grommets for dynamic wire layout routing and three soft-close drawers for organizing stationery items neatly.',
    specs: {
      'Material': '100% Solid white oak wood body',
      'Dimensions': '120cm Width x 60cm Depth x 75cm Height',
      'Drawers': '3 Soft-Close wooden drawer channels',
      'Finish': 'Water-resistant eco matte transparent lacquer'
    },
    tags: ['desk', 'table', 'furniture', 'office', 'home', 'wood', 'under 20000'],
    popularity: 9,
    createdAt: '2026-02-10'
  },
  {
    id: 'furn-2',
    name: 'CloudComfort Velvet Lounge Armchair',
    brand: 'LuxeArt',
    category: 'Furniture',
    price: 15490,
    originalPrice: 24900,
    discount: 37,
    rating: 4.8,
    reviewCount: 78,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Indulge in plush luxurious relaxation. Saturated in heavy, easy-to-clean velvet textile over multi-layered comfort pocket springs. Tilted ergonomically and balanced perfectly on premium gold electroplated brass steel legs.',
    specs: {
      'Fabric': 'High-density Stain-Resistant Luxury Polyester Velvet',
      'Seat Core': 'Pocket springs enveloped in hyper-resilient cushion foam',
      'Frame': 'Reinforced solid pine wood frame',
      'Load Capacity': 'Up to 150 kg static pressure tests'
    },
    tags: ['chair', 'armchair', 'furniture', 'living', 'velvet', 'luxeart', 'under 20000'],
    popularity: 9,
    createdAt: '2026-03-24'
  },
  {
    id: 'furn-3',
    name: 'Apex Ortho-Ergonomic Office Chair',
    brand: 'Omni',
    category: 'Furniture',
    price: 8990,
    originalPrice: 14990,
    discount: 40,
    rating: 4.6,
    reviewCount: 224,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Prevent posture fatigue during intense office hours. Fully calibrated adaptive mesh back, self-adjusting lumbar support system, multi-direction 3D armrests, and 135-degree gas gas-lift lock tilting chassis.',
    specs: {
      'Mesh Design': 'High-tensile aerodynamic cooling structural mesh',
      'Base': 'Heavy-duty 5-star structural metal chrome base',
      'Adjustability': '3D Armrests, 10cm gas lift, customizable lumbar slider',
      'Castors': 'No-scratch silent smooth-rolling PU wheels'
    },
    tags: ['chair', 'office', 'furniture', 'ergonomic', 'omni', 'under 10000'],
    popularity: 10,
    createdAt: '2026-04-02'
  },
  {
    id: 'furn-4',
    name: 'Snooze Nest Platform Double Bed',
    brand: 'IKEA-Style',
    category: 'Furniture',
    price: 21900,
    originalPrice: 29900,
    discount: 26,
    rating: 4.5,
    reviewCount: 52,
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Embrace restful elegance with a minimalist master bed frame. Upholstered in premium textured gray linen with a high button tufted headboard and heavy eucalyptus wood slats supporting all standard double mattresses.',
    specs: {
      'Size': 'Standard Double Bed (Queen layout)',
      'Upholstery': 'Premium breathable non-pilling weave linen',
      'Support': '24 Curved eucalyptus supportive wooden slats system',
      'Assembly': 'Friction-lock toolless ease assembly design'
    },
    tags: ['bed', 'furniture', 'bedroom', 'linen', 'under 30000'],
    popularity: 8,
    createdAt: '2026-05-14'
  },

  // --- GROCERY (3) ---
  {
    id: 'groc-1',
    name: 'Premium Organic Rainforest Honey',
    brand: 'EarthStep',
    category: 'Grocery',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.7,
    reviewCount: 812,
    stock: 120,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
    ],
    description: '100% pure, raw, unfiltered forest nectar sourced from wild, organic hives in remote nature reserves. Cold-pressed carefully to encapsulate healthy pollen, enzymes, and deep medicinal benefits.',
    specs: {
      'Volume': '500 Grams glass jar pack',
      'Certification': 'USDA Organic, Non-GMO Verified',
      'Purity': '100% Raw unprocessed Honey flora',
      'Origin': 'Sustainably sourced tribal forest reserves'
    },
    tags: ['honey', 'organic', 'grocery', 'earthstep', 'under 500'],
    popularity: 10,
    createdAt: '2026-05-01'
  },
  {
    id: 'groc-2',
    name: 'Golden Brew Premium Darjeeling Tea',
    brand: 'EarthStep',
    category: 'Grocery',
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.5,
    reviewCount: 342,
    stock: 90,
    images: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Single-origin seasonal Darjeeling loose leaves handpicked at high elevation estates from the foothills of the Himalayas. Delight in the iconic sweet muscatel finish and elegant floral bouquet aroma.',
    specs: {
      'Type': 'Organic Loose Leaf Black Tea',
      'Flush': 'First Flush Premium Hand-Plucked quality',
      'Weight': '250 Grams air-tight aluminum canister',
      'Caffeine': 'Medium natural alertness'
    },
    tags: ['tea', 'blacktea', 'grocery', 'darjeeling', 'under 1000'],
    popularity: 9,
    createdAt: '2026-04-20'
  },
  {
    id: 'groc-3',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    brand: 'LuxeArt',
    category: 'Grocery',
    price: 1290,
    originalPrice: 1690,
    discount: 23,
    rating: 4.8,
    reviewCount: 428,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Exquisite olive oil extraction directly from handpressed single-estate olives. Exuding light grassy notes and fruity balance, it boasts low acidity under 0.3%, making it a superb finishing dressing oil.',
    specs: {
      'Volume': '1 Liter Dark protective glass bottle',
      'Acidity Status': 'Extremely pure < 0.3% FFA standard',
      'Process': 'Cold mechanical extraction, zero chemical additives',
      'Country of Origin': 'Harvested and packed in Seville, Spain'
    },
    tags: ['oil', 'oliveoil', 'grocery', 'luxeart', 'under 2000'],
    popularity: 9,
    createdAt: '2026-03-15'
  },

  // --- BEAUTY (4) ---
  {
    id: 'beau-1',
    name: 'Luminous Glow Glass Skin Serum',
    brand: 'Nirvana',
    category: 'Beauty',
    price: 999,
    originalPrice: 1899,
    discount: 47,
    rating: 4.6,
    reviewCount: 580,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Unlock your inner dew. Packed heavily with 10% pure Niacinamide, high efficiency Hyaluronic Acid micro-molecules, and skin-comforting Centella Asiatica botanical extracts. Restores natural lipid health.',
    specs: {
      'Skin Type': 'All Skin Types (highly sensitive and acne-prone safe)',
      'Key Ingredients': '10% Niacinamide, Centella Asiatica, peptides',
      'Benefits': 'Melanin regulation, pore shrinking, long lasting hydration',
      'Volume': '30 ml dropping dispenser'
    },
    tags: ['makeup', 'skincare', 'beauty', 'serum', 'nirvana', 'under 1000'],
    popularity: 10,
    createdAt: '2026-03-20'
  },
  {
    id: 'beau-2',
    name: 'Hydro-Boost Botanical Face Moisturizer',
    brand: 'Nirvana',
    category: 'Beauty',
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.5,
    reviewCount: 392,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Refresh exhausted skin cells instantly. A gel-cream formulation rich in marine collagen and plant prebiotics that locks in water barrier matrices for up to 72 hours of plump skin comfort.',
    specs: {
      'Texture': 'Non-sticky ultra-lightweight gel cream',
      'Free from': 'Parabens, sulfates, artificial dyes, phthalates',
      'Key Actives': 'Marine Collagen, Aloe water, Rosemary essence',
      'Volume': '50ml jar'
    },
    tags: ['skincare', 'moisturizer', 'beauty', 'nirvana', 'under 1000'],
    popularity: 9,
    createdAt: '2026-04-14'
  },
  {
    id: 'beau-3',
    name: 'Luxe Crimson Matte Lipstick',
    brand: 'VogueClub',
    category: 'Beauty',
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    rating: 4.4,
    reviewCount: 228,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Embrace deep show-stopping pigments. Formulated dynamically with nourishing Jojoba wax and organic Shea butter, it glides like silk and dries into a weightless smudge-proof matte veil.',
    specs: {
      'Shade': 'Classic Ruby Red - Velvet Carmine',
      'Hydration': 'Vitamin E infused core prevent dryness',
      'Wear duration': 'Up to 12 hours non-transfer wear science',
      'Finish': 'Pure intense focus matte'
    },
    tags: ['lipstick', 'beauty', 'vogueclub', 'makeup', 'under 2000'],
    popularity: 8,
    createdAt: '2026-05-02'
  },
  {
    id: 'beau-4',
    name: 'Royal Velvet Oud Eau de Parfum',
    brand: 'LuxeArt',
    category: 'Beauty',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.8,
    reviewCount: 194,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'An elegant sensory journey. Blending majestic dark agarwood oud extracts with soft Damascus rose petals, warm cardamom spices, and creamy Madagascan vanilla notes. Captures enduring exotic sophistication.',
    specs: {
      'Scent Profile': 'Warm Woody Oriental Rose blend',
      'Concentration': 'Eau de Parfum (18% oil formulation concentration)',
      'Longevity': 'Up to 10 hours continuous projection',
      'Gender': 'Unisex exquisite collection'
    },
    tags: ['perfume', 'beauty', 'luxeart', 'fragrance', 'under 5000'],
    popularity: 9,
    createdAt: '2026-04-10'
  },

  // --- BOOKS (3) ---
  {
    id: 'book-1',
    name: 'The Creative Spark: Designing Tomorrow',
    brand: 'Penguin House',
    category: 'Books',
    price: 499,
    originalPrice: 799,
    discount: 37,
    rating: 4.7,
    reviewCount: 512,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'An absolute masterpiece exploring cognitive science behind design innovation. Dr. Liam Vance analyzes modern workflows from Silicon Valley and Bauhaus to reveal patterns of design breakthroughs.',
    specs: {
      'Author': 'Dr. Liam Vance',
      'Language': 'English',
      'Format': 'Paperback with gold leaf accents',
      'Page Count': '352 pages',
      'ISBN': '978-3-16-148410-0'
    },
    tags: ['design', 'books', 'science', 'under 500', 'under 1000'],
    popularity: 9,
    createdAt: '2026-01-18'
  },
  {
    id: 'book-2',
    name: 'Data Architecture Patterns 2026',
    brand: 'O-Reilly Style',
    category: 'Books',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.9,
    reviewCount: 88,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'The definitive blueprint guide for senior software engineers. Master modern distributed databases, stream pipelines, scaling strategies, and architectural designs for petabyte-scale application backends.',
    specs: {
      'Author': 'Sarah Jenkins (Chief Architect at TechCore)',
      'Format': 'Hardcover Textbook',
      'Publisher': 'Omni Tech Books Press',
      'Page Count': '512 pages',
      'Topic': 'System Design & Distributed Data Systems'
    },
    tags: ['tech', 'books', 'programming', 'architecture', 'under 2000'],
    popularity: 10,
    createdAt: '2026-04-05'
  },
  {
    id: 'book-3',
    name: 'Echoes of the Forgotten Kingdom',
    brand: 'Penguin House',
    category: 'Books',
    price: 389,
    originalPrice: 599,
    discount: 35,
    rating: 4.6,
    reviewCount: 215,
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'An enthralling historical fantasy epic mapping the rise and mysterious collapse of an advanced ancient civilization nested deep inside Himalayan isolated valleys.',
    specs: {
      'Author': 'Amara Thorne',
      'Genre': 'Epic Fantasy & Historical Fiction',
      'Page Count': '420 pages',
      'Publish Year': 'March 2026'
    },
    tags: ['fantasy', 'books', 'epic', 'under 500'],
    popularity: 8,
    createdAt: '2026-03-25'
  },

  // --- TOYS (3) ---
  {
    id: 'toy-1',
    name: 'Cosmos Ranger Mars Rover Kit',
    brand: 'Lego-Style',
    category: 'Toys',
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    rating: 4.8,
    reviewCount: 341,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Inspire future astronomers! This 850-piece model building kit construct a highly realistic Mars exploration rover featuring functional independent rocker-bogie suspensions and a robotic sample retrieval claw.',
    specs: {
      'Age Recommendation': '8+ Years',
      'Piece Count': '850 Pieces modular brick locks',
      'Batteries': 'Optional 2x AAA for solar arm sensor lights',
      'Material': 'Eco-certified Non-toxic ABS structural plastics'
    },
    tags: ['lego', 'space', 'toys', 'stem', 'under 3000', 'under 5000'],
    popularity: 10,
    createdAt: '2026-03-10'
  },
  {
    id: 'toy-2',
    name: 'Smart RoboPup Companion',
    brand: 'Zenith',
    category: 'Toys',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.4,
    reviewCount: 145,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'A charming interactive robotic puppy that reacts to touch, voice, and gestures. Program custom dance loops, teaches basic coding patterns, and barks happy responses dynamically with colorful LED gaze designs.',
    specs: {
      'Technology': 'Infrared gestures, auditory microphone, capacitive touch',
      'Recharge': 'Injected USB battery, full 90 minute runtime',
      'App Support': 'Android & iOS Companion coding controls'
    },
    tags: ['robot', 'interactive', 'toys', 'under 5000'],
    popularity: 8,
    createdAt: '2026-05-01'
  },
  {
    id: 'toy-3',
    name: 'Master Artist Wooden Double Easel',
    brand: 'EarthStep',
    category: 'Toys',
    price: 1890,
    originalPrice: 2990,
    discount: 36,
    rating: 4.6,
    reviewCount: 198,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Unleash raw creative color. This double-sided wooden standing easel hosts a magnetic dry-erase whiteboard on one layer and a chalk chalkboard on the reverse. Fitted with convenient wide storage paint trays.',
    specs: {
      'Material': 'Polished sustainable premium New Zealand Pine',
      'Dimensions': 'Adjustable stands 95cm - 130cm height',
      'Includes': '10 Chalk markers, felt eraser, magnetic alphabet letters'
    },
    tags: ['easel', 'art', 'toys', 'crafts', 'under 2000'],
    popularity: 9,
    createdAt: '2026-04-12'
  },

  // --- SPORTS (3) ---
  {
    id: 'spo-1',
    name: 'Aerofit Carbon Fiber Badminton Racket',
    brand: 'Aero',
    category: 'Sports',
    price: 3290,
    originalPrice: 4990,
    discount: 34,
    rating: 4.7,
    reviewCount: 412,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Unleash fast-paced thunder strikes. Super lightweight carbon-nanotube weave generates rapid whip action and high structural durability. Strung at high tension with professional grade gutting strings.',
    specs: {
      'Weight Class': '4U (80-84 Grams Ultra light)',
      'Frame Material': 'High Modulus Nano Carbon Graphite',
      'String Tension': 'Factory calibrated 28 lbs high tension',
      'Grip Size': 'G5 slim premium grip wrap handle'
    },
    tags: ['badminton', 'racket', 'sports', 'aero', 'under 5000'],
    popularity: 9,
    createdAt: '2026-02-20'
  },
  {
    id: 'spo-2',
    name: 'Apex Pro High-Grip Basketball',
    brand: 'Vortex',
    category: 'Sports',
    price: 1490,
    originalPrice: 2490,
    discount: 40,
    rating: 4.5,
    reviewCount: 328,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Calibrated for strict indoor and outdoor competitive bounds. Built with premium microfiber composite leather panels. Features moisture-wicking deep channel pebble alignments that guarantee high security handling.',
    specs: {
      'Size': 'Official Size 7 Standard regulation match ball',
      'Carcase': 'Dual-layer winding nylon carcass science',
      'Bladder': 'Special air retention butyl air valve'
    },
    tags: ['basketball', 'sports', 'vortex', 'under 2000'],
    popularity: 8,
    createdAt: '2026-04-05'
  },
  {
    id: 'spo-3',
    name: 'Pinnacle Trekker Camping Tent',
    brand: 'EarthStep',
    category: 'Sports',
    price: 4890,
    originalPrice: 7990,
    discount: 38,
    rating: 4.7,
    reviewCount: 154,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Live inside nature in safe comfort. A double-layer, wind-engineered canvas structure designed to sleeps 3 adults easily. Pre-bent aerospace grade aluminum poles ensure full assembly in under 5 minutes.',
    specs: {
      'Bed Capacity': '3 Persons comfort footprint',
      'Waterproofing Index': 'PU3000mm fully taped rainfly seams',
      'Poles': '9.5mm Aerospace-grade lightweight aluminum frame',
      'Weight': '2.6 kg ultra-compact backpacking pack'
    },
    tags: ['tent', 'camping', 'sports', 'outdoor', 'earthstep', 'under 5000'],
    popularity: 9,
    createdAt: '2026-03-30'
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'mob-1': [
    { id: 'rev-1', userName: 'Arjun K.', rating: 5, comment: 'Phenomenal phone! The screen colors are incredibly vibrant and the camera setup matches professional gear. Highly recommend.', createdAt: '2026-05-12' },
    { id: 'rev-2', userName: 'Riya M.', rating: 4, comment: 'Pristine build, but somewhat expensive. Battery life represents solid improvement over prior series.', createdAt: '2026-05-18' }
  ],
  'lap-1': [
    { id: 'rev-3', userName: 'Kartik S.', rating: 5, comment: 'Spectacular computer. It handles compilations, VM routines, and designing concurrently without any heating noise.', createdAt: '2026-05-20' },
    { id: 'rev-4', userName: 'Siddharth V.', rating: 4, comment: 'Packs incredible battery punch. Build aesthetics feel exactly like the premium price tag specifies.', createdAt: '2026-05-25' }
  ],
  'elec-1': [
    { id: 'rev-5', userName: 'Anjali T.', rating: 5, comment: 'The Active Noise Cancel is actual magic for this price tag! Completely isolates subway sounds perfectly.', createdAt: '2026-05-02' },
    { id: 'rev-6', userName: 'John D.', rating: 4, comment: 'Fits really comfortably. Low frequency notes sound warm and robust.', createdAt: '2026-05-10' }
  ],
  'appl-1': [
    { id: 'rev-7', userName: 'Nikhil R.', rating: 5, comment: 'Using this daily now! Extremely simple air frying with fantastic crispiness. Clean layout controls make operation simple.', createdAt: '2026-05-15' }
  ],
  'beau-1': [
    { id: 'rev-8', userName: 'Preeti G.', rating: 5, comment: 'Literally transformed my skin barrier texturing in under two weeks! My skin feels incredibly dewy and soft.', createdAt: '2026-05-22' }
  ]
};
