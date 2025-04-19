const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload;

    case "ADD_WISHLIST_ITEM":
      return [...state, action.payload];

    case "DELETE_WISHLIST_ITEM":
      return state.filter(item => item.productID._id !== action.productID);

      case "CLEAR_WISHLIST":
      case "LOGOUT":
        return [];

    default:
      return state;
  }
};

export default wishlistReducer;
