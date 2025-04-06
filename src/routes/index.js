import LayoutDefault from '../layout/LayoutDefault/LayoutDefault';
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/Register";
import CartPage from "../pages/Cart/CartPage";
import WishlistPage from "../pages/WishList/WishListPage";
import ForgotPassword from "../pages/PassWord/ForgotPage";
import OtpPage from "../pages/PassWord/OtpPage";
import ResetPWPage from "../pages/PassWord/ResetPWPage";
import CheckoutPage from "../pages/CheckOut/CheckoutPage";
import HomeContent from '../pages/Home/HomeContent/HomeContent';

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <HomeContent />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "password/otp",
        element: <OtpPage />,
      },
      {
        path: "password/reset",
        element: <ResetPWPage />,
      },
    ],
  },
];
