import axiosInstance from "../untils/axiosInstance";

export const fetchWishlist = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/api/v1/wishlist");
    dispatch({ type: "SET_WISHLIST", payload: res.data.data });
  } catch (err) {
    console.error("Fetch wishlist failed", err);
  }
};

export const addWishlistItem = (product) => async (dispatch, getState) => {
  const prevWishlist = getState().wishlistReducer || [];

  dispatch({ type: "ADD_WISHLIST_ITEM", payload: product });

  try {
    await axiosInstance.post("/api/v1/wishlist/add", { productID: product._id });
  } catch (err) {
    console.error("Add wishlist failed", err);
    // rollback
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist });
  }
};

export const deleteWishlistItem = (productID) => async (dispatch, getState) => {
  const prevWishlist = getState().wishlistReducer || [];

  dispatch({ type: "DELETE_WISHLIST_ITEM", productID });

  try {
    await axiosInstance.delete("/api/v1/wishlist/delete", {
      data: { productID },
    });
  } catch (err) {
    console.error("Delete wishlist failed", err);
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist });
  }
};

export const clearWishlist = () => async (dispatch, getState) => {
  const prevWishlist = getState().wishlistReducer || [];

  dispatch({ type: "CLEAR_WISHLIST" });

  try {
    await axiosInstance.delete("/api/v1/wishlist/clear");
  } catch (err) {
    console.error("Clear wishlist failed", err);
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist });
  }
};