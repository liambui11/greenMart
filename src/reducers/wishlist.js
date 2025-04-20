const initialState = {
  items: [],
  isLoading: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WISHLIST_LOADING":
      return { ...state, isLoading: true };

    case "WISHLIST_DONE":
      return { ...state, isLoading: false };

    case "FETCH_WISHLIST_SUCCESS":
    case "ADD_WISHLIST_SUCCESS":
    case "SET_WISHLIST":
      return { items: action.payload, isLoading: false };

    case "DELETE_WISHLIST_ITEM":
      return {
        items: state.items.filter(item => item.productID._id !== action.productID),
        isLoading: false,
      };

    case "CLEAR_WISHLIST":
    case "LOGOUT":
      return { items: [], isLoading: false };

    default:
      return state;
  }
};

export default wishlistReducer;
