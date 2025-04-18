const API_BASE_URL = "http://localhost:3000/api/v1/products";

export const fetchProducts = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.info;
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
};

export const fetchProductsByPriceAscending = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productPrice&sortValue=asc`);
    if (!res.ok) throw new Error("Failed to fetch products by price ascending");
    const data = await res.json();
    return data.info;
  } catch (error) {
    console.error("fetchProductsByPriceAscending error:", error);
    return [];
  }
};

export const fetchProductsByPriceDescending = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productPrice&sortValue=desc`);
    if (!res.ok) throw new Error("Failed to fetch products by price descending");
    const data = await res.json();
    return data.info;
  } catch (error) {
    console.error("fetchProductsByPriceDescending error:", error);
    return [];
  }
};

export const fetchProductsByName = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productName&sortValue=asc`);
    if (!res.ok) throw new Error("Failed to fetch products by name");
    const data = await res.json();
    return data.info;
  } catch (error) {
    console.error("fetchProductsByName error:", error);
    return [];
  }
};

export const fetchProductsByPromotion = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productDiscountPercentage&sortValue=desc`);
    if (!res.ok) throw new Error("Failed to fetch products by promotion");
    const data = await res.json();
    return data.info;
  } catch (error) {
    console.error("fetchProductsByPromotion error:", error);
    return [];
  }
};

