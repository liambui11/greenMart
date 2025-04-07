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
import About from '../pages/About/About';
import New from '../pages/News/News';

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
        path: "about",
        element: <About />,
      },
      {
        path: "news",
        element: <New />,
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
