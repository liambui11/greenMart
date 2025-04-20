import axiosInstance from "../untils/axiosInstance";
import isEqual from "lodash/isEqual";

export const fetchWishlist = () => async (dispatch, getState) => {
  dispatch({ type: "WISHLIST_LOADING" });

  try {
    const res = await axiosInstance.get("/api/v1/wishlist");
    const serverWishlist = res.data.data;
    const currentWishlist = getState().wishlistReducer.items || [];

    if (serverWishlist.length !== currentWishlist.length || !isEqual(serverWishlist, currentWishlist)) {
      dispatch({ type: "FETCH_WISHLIST_SUCCESS", payload: serverWishlist });
    }
  } catch (err) {
    console.error("Fetch wishlist failed", err);
  } finally {
    dispatch({ type: "WISHLIST_DONE" });
  }
};

export const addWishlistItem = (productID) => async (dispatch, getState) => {
  dispatch({ type: "WISHLIST_LOADING" });

  const prevWishlist = getState().wishlistReducer.items || [];

  const isAlreadyInWishlist = prevWishlist.some(
    (item) => item._id === productID
  );

  if (isAlreadyInWishlist) {
    dispatch({ type: "WISHLIST_DONE" });
    return;
  }

  const updatedWishlist = [...prevWishlist, { _id: productID }];
  dispatch({ type: "ADD_WISHLIST_SUCCESS", payload: updatedWishlist });

  try {
    const res = await axiosInstance.post("/api/v1/wishlist/add", {
      productID,
    });
    const serverWishlist = res.data.data;
    
    dispatch({ type: "SET_WISHLIST", payload: serverWishlist });
  } catch (err) {
    console.error("Add wishlist failed", err);
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist }); // rollback
  } finally {
    dispatch({ type: "WISHLIST_DONE" });
  }
};

export const deleteWishlistItem = (productID) => async (dispatch, getState) => {
  dispatch({ type: "WISHLIST_LOADING" });

  const prevWishlist = getState().wishlistReducer.items || [];
  const updatedWishlist = prevWishlist.filter((item) => item._id !== productID);

  dispatch({ type: "DELETE_WISHLIST_ITEM", productID });

  try {
    const res = await axiosInstance.delete("/api/v1/wishlist/delete", {
      data: { productID },
    });
    const serverWishlist = res.data.data;

    if (
      serverWishlist.length !== updatedWishlist.length ||
      !isEqual(serverWishlist, updatedWishlist)
    ) {
      dispatch({ type: "SET_WISHLIST", payload: serverWishlist });
    }
  } catch (err) {
    console.error("Delete wishlist failed", err);
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist }); // rollback
  } finally {
    dispatch({ type: "WISHLIST_DONE" });
  }
};

export const clearWishlist = () => async (dispatch, getState) => {
  dispatch({ type: "WISHLIST_LOADING" });

  const prevWishlist = getState().wishlistReducer.items || [];

  dispatch({ type: "CLEAR_WISHLIST" });

  try {
    await axiosInstance.delete("/api/v1/wishlist/clear");
  } catch (err) {
    console.error("Clear wishlist failed", err);
    dispatch({ type: "SET_WISHLIST", payload: prevWishlist }); // rollback
  } finally {
    dispatch({ type: "WISHLIST_DONE" });
  }
};
