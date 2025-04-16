import { combineReducers } from "redux";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  cartReducer,
  wishlistReducer,
  auth: authReducer,
  // Thêm nhiều reducer ở đây
});

export default allReducers;
