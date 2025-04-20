const initialState = {
  items: [],
  isLoading: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_LOADING":
      return { ...state, isLoading: true };

    case "CART_DONE":
      return { ...state, isLoading: false };

    case "FETCH_CART_SUCCESS":
    case "ADD_TO_CART_SUCCESS":
    case "UPDATE_CART_SUCCESS":
      return { items: action.payload, isLoading: false };

    case "DELETE_CART_ITEM":
      return {
        items: state.items.filter(item => item.productID._id !== action.productID),
        isLoading: false,
      };

    case "CLEAR_CART":
    case "LOGOUT":
      return { items: [], isLoading: false };

    default:
      return state;
  }
};

export default cartReducer;
