import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './actions/auth';
import { fetchWishlist } from './actions/wishlist';
import { fetchCart } from './actions/cart';
import AllRoute from './components/AllRoute';
import OverlayLoading from './components/OverlayLoading/OverlayLoading';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, isLoading: isAuthLoading, accessToken } = useSelector((state) => state.auth);
    const isWishlistLoading = useSelector((state) => state.wishlistReducer?.isLoading);
    const isCartLoading = useSelector((state) => state.cartReducer?.isLoading);

    const isAppLoading = isAuthLoading || isWishlistLoading || isCartLoading;

    // Nếu người dùng xóa local storage hoặc lấy token từ local chậm
    useEffect(() => {
    if (!accessToken) {
        dispatch(checkAuth());
    }
    }, [accessToken, dispatch]);

    useEffect(() => {
      if (isAuthenticated) {
        dispatch(fetchWishlist());
        dispatch(fetchCart());
      }
    }, [isAuthenticated, dispatch]);
    return (
        <>
          <AllRoute/>
          {isAppLoading && <OverlayLoading />}
        </>
    );
};

export default App;
