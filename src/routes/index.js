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
import CategoryDetail from '../components/CategoryDetail/CategoryDetail';
import ContactCompany from '../pages/Contact/ContactCompany';
import Search from '../pages/Home/PageSearch/Search';
import ProductDetail from '../pages/Home/ProductDetail/ProductDetail';
import MyProfile from '../pages/Home/MyProfile/MyProfile';

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
        path: "productdetail/:productSlug",
        element: <ProductDetail />
      },
      {
        path: "search/:query",
        element: <Search />
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
        path: "categorydetail/:categorySlug",
        element: <CategoryDetail />,
      },
      {
        path: "contact",
        element: <ContactCompany />
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
      {
        path: "myprofile",
        element: <MyProfile />,
      },
    ],
  },
];
