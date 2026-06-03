export interface Product {
  id: string;
  category: 'overseas' | 'domestic';
  subCategory: string; // e.g. "태국/치앙마이", "제주도권"
  badge?: '긴급마감' | '2인출발' | '골프조인';
  title: string;
  description: string;
  priceText: string;
  image: string;
  duration: string; // e.g., "1박 2일", "3박 5일"
  highlights: string[];
  hotelName: string;
  meals: string;
}

export interface BlogReview {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  link: string;
  golfCourse: string;
}

export interface Booking {
  id: string;
  createdAt: string;
  customerName: string;
  contact: string;
  productId: string;
  productTitle: string;
  preferredDate: string;
  pax: number;
  status: 'pending' | 'discussing' | 'confirmed' | 'completed';
  additionalRequests?: string;
  adminNotes?: string;
}
