const cartReducer = (state = [], action) => {
    switch(action.type) {
        case "FETCH_CART_SUCCESS":
          return action.payload;
          case "ADD_TO_CART_SUCCESS":
            return action.payload;
        case "UPDATE_CART_SUCCESS":
          return action.payload;
        case "DELETE_CART_ITEM":
          return state.filter(item => item.productID._id !== action.productID);
          case "CLEAR_CART":
          case "LOGOUT":
            return [];
        default:
          return state;
      }
  };
  
  export default cartReducer;
  