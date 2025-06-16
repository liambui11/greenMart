import axiosInstance from "../../untils/axiosInstance";
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/orders`;

export const fetchOrder = async (query) => {
  try {
    const res = await axiosInstance.get(`${API_BASE_URL}?keyword=${query}`);
    return res.data.info;
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
};

export const fetchOrderByPriceAscending = async (query) => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}?keyword=${query}&sortKey=totalOrderAmount&sortValue=asc`
    );
    return res.data.info;
  } catch (error) {
    console.error("fetchProductsByPriceAscending error:", error);
    return [];
  }
};

export const fetchOrderByPriceDescending = async (query) => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}?keyword=${query}&sortKey=totalOrderAmount&sortValue=desc`
    );
    return res.data.info;
  } catch (error) {
    console.error("fetchProductsByPriceDescending error:", error);
    return [];
  }
};

export const fetchUser = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/users/detail");
    return res.data.info;
  } catch (error) {
    console.error("fetchMyOrderUser error:", error);
    return [];
  }
};
