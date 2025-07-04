export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  features: string[];
  category: "accounting" | "tax" | "bookkeeping" | "consulting";
  duration: string;
  popular?: boolean;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

export interface CheckoutSession {
  id: string;
  serviceId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  customerEmail?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: CheckoutSession[];
}
