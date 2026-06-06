/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

interface AssistantResponse {
  text: string;
  recommendedProducts: Product[];
}

export function generateAssistantResponse(prompt: string, products: Product[]): AssistantResponse {
  const query = prompt.toLowerCase().trim();

  // 1. Basic greeting handler
  if (query === 'hi' || query === 'hello' || query === 'hey' || query.includes('welcome') || query.includes('who are you')) {
    return {
      text: "Hello! I am your SwiftCart AI Shopping Assistant. 🛒✨\n\nI can help you browse through our extensive product catalog. You can ask me things like:\n• *'Find me a phone under ₹20000'*\n• *'Best laptop for students'*\n• *'Gift for my mother under ₹1000'*\n• *'Running shoes with good ratings'*\n\nWhat are you looking to buy today?",
      recommendedProducts: products.filter(p => p.popularity >= 9).slice(0, 3) // recommend popular items
    };
  }

  // 2. Identify price constraint (e.g., "under 20000", "under ₹5000", "below 1000")
  let priceCeiling = Infinity;
  const priceMatch = query.match(/(?:under|below|less than|budget of|within|capital of)?\s*(?:rs\.?|inr|₹)?\s*(\d+)/i);
  if (priceMatch) {
    const matchedNumber = parseInt(priceMatch[1], 10);
    // Ignore extremely small numbers that might be ratings or item count (e.g. "under 3 seconds", "under 5 rating")
    if (matchedNumber > 100) {
      priceCeiling = matchedNumber;
    }
  }

  // 3. Category matching heuristics
  let targetCategory: string | null = null;
  const categoriesLower = products.map(p => p.category.toLowerCase());
  const uniqueCategories = Array.from(new Set(categoriesLower));

  // Category synonyms
  const categorySynonyms: Record<string, string> = {
    'phone': 'mobiles',
    'phones': 'mobiles',
    'smartphone': 'mobiles',
    'smartphones': 'mobiles',
    'mobile': 'mobiles',
    'laptops': 'laptops',
    'laptop': 'laptops',
    'computer': 'laptops',
    'computers': 'laptops',
    'audio': 'electronics',
    'gadget': 'electronics',
    'gadgets': 'electronics',
    'smartwatch': 'electronics',
    'watch': 'electronics',
    'appliances': 'home appliances',
    'appliance': 'home appliances',
    'kitchen': 'home appliances',
    'fridge': 'home appliances',
    'microwave': 'home appliances',
    'wear': 'fashion',
    'clothes': 'fashion',
    'clothing': 'fashion',
    'shirt': 'fashion',
    'jacket': 'fashion',
    'dress': 'fashion',
    'shoe': 'shoes',
    'shoes': 'shoes',
    'sneaker': 'shoes',
    'sneakers': 'shoes',
    'boots': 'shoes',
    'chair': 'furniture',
    'desk': 'furniture',
    'table': 'furniture',
    'bed': 'furniture',
    'couch': 'furniture',
    'grocery': 'grocery',
    'food': 'grocery',
    'honey': 'grocery',
    'tea': 'grocery',
    'beauty': 'beauty',
    'makeup': 'beauty',
    'serum': 'beauty',
    'lipstick': 'beauty',
    'perfume': 'beauty',
    'cosmetics': 'beauty',
    'skincare': 'beauty',
    'books': 'books',
    'book': 'books',
    'novel': 'books',
    'read': 'books',
    'toys': 'toys',
    'toy': 'toys',
    'robot': 'toys',
    'kid': 'toys',
    'kids': 'toys',
    'sports': 'sports',
    'sport': 'sports',
    'badminton': 'sports',
    'camping': 'sports',
    'fitness': 'sports'
  };

  // Check if we matched a direct category
  for (const cat of Array.from(new Set(products.map(p => p.category)))) {
    if (query.includes(cat.toLowerCase())) {
      targetCategory = cat;
      break;
    }
  }

  // If not direct, check synonyms
  if (!targetCategory) {
    for (const [key, val] of Object.entries(categorySynonyms)) {
      if (query.includes(key)) {
        // Find corresponding actual category name
        const match = products.find(p => p.category.toLowerCase() === val);
        if (match) {
          targetCategory = match.category;
          break;
        }
      }
    }
  }

  // 4. Special intent detection:
  // "gift for my mother under ₹1000"
  const isMotherGift = query.includes('mother') || query.includes('mom') || query.includes('gift') && (query.includes('she') || query.includes('her') || query.includes('woman'));
  // "student"
  const isStudent = query.includes('student') || query.includes('college') || query.includes('school') || query.includes('study');
  // "rating"
  const hasRatingFilter = query.includes('rating') || query.includes('best') || query.includes('highest') || query.includes('popular');

  // Let's perform scoring on ALL products to find the perfect recommendation
  const scoredProducts = products.map(p => {
    let score = 0;

    // Check price ceiling (absolute veto if exceeded)
    if (p.price > priceCeiling) {
      return { product: p, score: -9999 };
    }

    // Category match
    if (targetCategory && p.category === targetCategory) {
      score += 100;
    }

    // Tags & Name keywords match
    const words = query.split(/\s+/);
    words.forEach(word => {
      if (word.length < 3) return; // ignore short words
      if (p.name.toLowerCase().includes(word)) score += 30;
      if (p.brand.toLowerCase().includes(word)) score += 20;
      if (p.description.toLowerCase().includes(word)) score += 10;
      if (p.tags.some(t => t.toLowerCase() === word)) score += 40;
    });

    // Special Intent: Gift for Mother
    if (isMotherGift) {
      // Recommend Beauty, Books, Grocery under 1500 (ideal mother gifts)
      if (['beauty', 'grocery', 'books', 'home appliances'].includes(p.category.toLowerCase())) {
        score += 80;
      }
      if (p.tags.includes('women')) score += 50;
    }

    // Special Intent: Student
    if (isStudent) {
      if (p.tags.includes('student') || p.tags.includes('office') || p.category === 'Laptops' || p.category === 'Books') {
        score += 80;
      }
    }

    // Rating / Popularity
    if (hasRatingFilter) {
      score += (p.rating - 4.0) * 30; // higher score for 4.8 vs 4.2
      score += p.popularity * 10;
    }

    // Small boost for high ratings or popularity in general
    score += p.rating * 5;
    score += p.popularity * 2;

    return { product: p, score };
  });

  // Filter out vetoed items and sort by score descending
  const filteredAndSorted = scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  const finalRecommendations = filteredAndSorted.slice(0, 4);

  if (finalRecommendations.length === 0) {
    // Return empty state recommendations
    return {
      text: `I searched our inventory but couldn't find matches matching your specific inquiry. 🔎\n\nHow about exploring some of our **highest-rated daily customer favorites**? Let me know if you would like me to narrow down by price!`,
      recommendedProducts: products.filter(p => p.rating >= 4.7).slice(0, 3)
    };
  }

  // Construct premium personalized assistance explanation
  let feedbackText = '';
  if (isMotherGift) {
    feedbackText = `I have selected some lovely gifts perfect for your mother! These premium products are delightful, highly popular, and make excellent, thoughtful gestures:`;
  } else if (isStudent) {
    feedbackText = `Here are our top recommended essential tools for students! They combine outstanding durability, cost performance, and academic productivity:`;
  } else if (priceCeiling !== Infinity) {
    feedbackText = `Here are some superb choices matching your request of being **under ₹${priceCeiling.toLocaleString('en-IN')}**:`;
  } else {
    feedbackText = `Based on your request, I found some outstanding matches from our catalog! Here are the top choices centered on your preference:`;
  }

  // Add bulleted reasons for each recommendation to look smart and helpful
  finalRecommendations.forEach((p, idx) => {
    let reason = '';
    if (p.category === 'Mobiles' && p.price < 20000) {
      reason = 'Offers exceptional high-capacity battery life & performance at a modest budget-friendly price point.';
    } else if (p.category === 'Laptops' && p.tags.includes('student')) {
      reason = 'Ideal balance of portability, ergonomic keyboard comfort, and reliable multi-tasking operations.';
    } else if (p.tags.includes('running')) {
      reason = 'Engineered mesh with shock-absorbing soles designed dynamically for daily cardio fitness.';
    } else if (p.category === 'Beauty') {
      reason = 'Dermatologically safe botanical ingredients with fantastic customer feedback rating of ' + p.rating + '⭐';
    } else {
      reason = `Highly recommended ${p.category} favorite from ${p.brand} with a ${p.rating}⭐ rating across ${p.reviewCount} customer reviews.`;
    }
    feedbackText += `\n\n${idx + 1}. **${p.name}** (₹${p.price.toLocaleString('en-IN')})\n*Reason:* ${reason}`;
  });

  return {
    text: feedbackText,
    recommendedProducts: finalRecommendations
  };
}
