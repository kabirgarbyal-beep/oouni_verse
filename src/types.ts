export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  category: 'bags' | 'plushies' | 'flowers' | 'keychains' | 'accessories' | 'coasters' | 'homedecor' | 'wearables';
  image: string;
  secondaryImages: string[];
  description: string;
  story: string;
  materials: string[];
  careInstructions: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-Order';
  isBestSeller?: boolean;
  isFeatured?: boolean;
  reviews: Review[];
  size?: string;
  colorVariants?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customOptions?: {
    isCustom?: boolean;
    yarnColor?: string;
    accessory?: string;
    textLabel?: string;
    size?: string;
  };
}

export interface CustomOrderRequest {
  fullName: string;
  email: string;
  whatsappNumber: string;
  category: string;
  colorPalette: string;
  inspirationIdea: string;
  estimatedTimeline: string;
  uploadedImageUrl?: string;
  addAccessories: string[];
}
