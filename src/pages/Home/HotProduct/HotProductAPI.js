const API_BASE_URL = "http://localhost:3000/api/v1/products";

export const fetchProductCategory = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}?keyword=&currentPage=1&limitItems=10&sortKey=productPosition&sortValue=asc`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Loi fecth category", error);
  }
};
