import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logoutUser } from './actions/auth';
import { fetchWishlist } from './actions/wishlist';
import { fetchCart } from './actions/cart';
import AllRoute from './components/AllRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axiosInstance from './untils/axiosInstance';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const accessToken = useSelector((state) => state.auth.accessToken);

    // Nếu người dùng xóa local storage hoặc lấy token từ local chậm
    useEffect(() => {
    if (!accessToken) {
        dispatch(checkAuth());
    }
    }, [accessToken, dispatch]);

    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const fetchUserDetail = async () => {
          try {
            const res = await axiosInstance.get('/api/v1/users/detail');
            if (res.data.code === 200) {
              setUserInfo(res.data.info);
            }
          } catch (error) {
            console.error("Failed to fetch user details", error);
          }
        };
    
        if (isAuthenticated) {
          fetchUserDetail();
          dispatch(fetchWishlist());
          dispatch(fetchCart());
        }
      }, [isAuthenticated, dispatch]);

    const handleLogout = () => {
      dispatch(logoutUser());
    };

    return (
        <>
            <div>
      <h1>GreenMart</h1>
      {isAuthenticated ? <>
                        <p>Chào mừng! {userInfo?.userName || "người dùng"}</p>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </> : <p>Chưa đăng nhập</p>}
    </div>
            <AllRoute/>
        </>
    );
};

export default App;
