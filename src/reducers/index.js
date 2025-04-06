import { combineReducers } from "redux";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";

const allReducers = combineReducers({
  cartReducer,
  wishlistReducer,
  // Thêm nhiều reducer ở đây
});

export default allReducers;
