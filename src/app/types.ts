// Product types
export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  origin: string;
  isOrganic: boolean;
  description: string;
  nutritionalValue: string;
  expiryDays: number;
  photo: string;
  __v: number;
}

// Cart types
export interface CartItem {
  _id: string;
  grocery: Product;
  quantity: number;
  price: number;
  name: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response types
export interface GetProductsResponse {
  groceries: Product[];
}

export interface GetProductResponse {
  grocery: Product;
}

export interface GetBasketResponse {
  cart: Cart;
}

export interface MessageResponse {
  message: string;
}

export interface SingleCheckoutResponse {
  url: string;
}

// Order types
export interface OrderItem {
  _id: string;
  grocery: {
    _id: string;
    name: string;
    photo: string;
  };
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate: string | null;
  customerInfo: {
    name: string;
    phone: string;
    deliveryAddress: string;
  };
  __v: number;
}

export interface GetOrdersResponse {
  orders: Order[];
}
