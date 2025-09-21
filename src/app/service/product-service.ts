import { GetProductsResponse, GetProductResponse } from "../types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined" ? "http://localhost:3000" : "");

// Bütün ürünleri getirir
const getProducts = async (): Promise<GetProductsResponse> => {
  const res = await fetch(`${BASE_URL}/api/groceries`);

  return res.json();
};

// Belirli bir ürünü getirir
const getProduct = async (id: string): Promise<GetProductResponse> => {
  const res = await fetch(`${BASE_URL}/api/groceries/${id}`);

  return res.json();
};

// Ürünleri arama
const searchProducts = async (query: string): Promise<GetProductsResponse> => {
  const res = await fetch(
    `${BASE_URL}/api/groceries?query=${encodeURIComponent(query)}`
  );

  return res.json();
};

export { getProducts, getProduct, searchProducts };
