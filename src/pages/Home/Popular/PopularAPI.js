const API_BASE_URL = "https://greenmart-api.vercel.app/api/v1/products";

export const fetchPopular = async () => {
    const res = await fetch(`${API_BASE_URL}?limitItems=10&sortKey=createdAt&sortValue=asc`);
    const data = await res.json();
    return data.info;
};