import { GetOrdersResponse } from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined" ? "http://localhost:3000" : "");

// Kullanıcının siparişlerini getir
const getOrders = async (userId: string): Promise<GetOrdersResponse> => {
  const res = await fetch(`${BASE_URL}/api/orders?userId=${userId}`);

  return res.json();
};

export { getOrders };
