
export interface Chef {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  chef: Chef;
  distance: number;
  time: number;
  rating: number;
  dietary: string[];
  reservable?: boolean;
  category: string;
}

export interface ChefProfile {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  distance: number;
  isLive: boolean;
  location: string;
  ordersCompleted: number;
}
