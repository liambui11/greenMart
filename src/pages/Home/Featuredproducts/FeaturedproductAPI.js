const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1/products`;

export const fetchFeaturedproduct = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}?limitItems=30&sortKey=productPosition&sortValue=asc`
    );
    const data = await res.json();

    // Lọc sản phẩm có khuyến mãi
    const filteredProducts = data.info.filter(
      (product) => product.productStock > 0 && product.productDiscountPercentage
    );

    return filteredProducts;
  } catch (error) {
    console.error("Lỗi khi fetch sản phẩm:", error);
    return [];
  }
};
