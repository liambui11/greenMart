
const API_BASE_URL = "http://localhost:3000/api/v1/products";

export const fetchProducts = async (query) => {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10`);
    const data = await res.json();
    return data.info;
};

export const fetchProductsByPriceAscending = async (query) => {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productPrice&sortValue=asc`);
    const data = await res.json();
    return data.info;
};

export const fetchProductsByPriceDescending = async (query) => {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productPrice&sortValue=desc`);
    const data = await res.json();
    return data.info;
};

export const fetchProductsByName = async (query) => {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productName&sortValue=asc`);
    const data = await res.json();
    return data.info;
};

export const fetchProductsByPromotion = async (query) => {
    const res = await fetch(`${API_BASE_URL}?keyword=${query}&currentPage=1&limitItems=10&sortKey=productDiscountPercentage&sortValue=desc`);
    const data = await res.json();
    return data.info;
};
