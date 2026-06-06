/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage, e.g. 15 for 15%
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  stock: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  tags: string[];
  popularity: number; // 1 to 10 scale
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  savedForLater?: boolean;
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  date: string;
  shippingAddress: ShippingDetails;
  paymentMethod: 'card' | 'upi' | 'cod';
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  estimatedDelivery: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  savedAddresses: ShippingDetails[];
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
}
