// Orders store - uses localStorage for persistence

export type OrderStatus = "pending_payment" | "payment_submitted" | "payment_verified" | "processing" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  payment: {
    method: "upi";
    upiId?: string; // set by admin
    qrUrl?: string; // set by admin
    transactionId?: string; // entered by customer
    verifiedAt?: string;
    rejectedReason?: string;
  };
  deliveryDate?: string;
  notes?: string;
}

const ORDERS_KEY = "siyo_orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: "ORD" + Date.now().toString().slice(-8),
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...updates };
  saveOrders(orders);
  return orders[idx];
}

export function getOrderById(id: string): Order | null {
  return getOrders().find((o) => o.id === id) || null;
}

// Admin settings (UPI QR etc)
export interface AdminSettings {
  upiId: string;
  upiQrUrl: string;
  payeeName: string;
  businessName: string;
  phone: string;
  email: string;
  deliveryTime: string;
  orderCutoff: string;
  announcement: string;
}

const DEFAULT_SETTINGS: AdminSettings = {
  upiId: "siyofarms@upi",
  upiQrUrl: "",
  payeeName: "Siyo Farms",
  businessName: "Siyo Farms",
  phone: "+91 98765 43210",
  email: "hello@siyofarms.com",
  deliveryTime: "6:00 AM – 8:00 AM",
  orderCutoff: "10:00 PM",
  announcement: "Free delivery on orders above ₹500 | Fresh dairy every morning 🥛",
};

export function getAdminSettings(): AdminSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem("siyo_admin_settings");
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(settings: AdminSettings) {
  localStorage.setItem("siyo_admin_settings", JSON.stringify(settings));
}
