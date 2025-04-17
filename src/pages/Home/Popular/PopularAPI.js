const API_BASE_URL = "http://localhost:3000/api/v1/products";

export const fetchPopular = async () => {
    const res = await fetch(`${API_BASE_URL}?limitItems=10&sortKey=createdAt&sortValue=asc`);
    const data = await res.json();
    return data.info;
};