import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { RxAvatar } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSquareMenu } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import CartMini from "../../../components/CartMini/index";
import "./NavMiddle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth, logoutUser } from "../../../actions/auth";

function NavbarMiddle() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //người dùng đã đăng nhập chưa
  const handleLogout = () => {
    dispatch(logoutUser());
    // window.location.reload();
    navigate("/");
  };
  const wishlist = useSelector((state) => state.wishlistReducer.items);
  const totalQuantity = wishlist.length;

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProductCategory = await fetch(
          "http://localhost:3000/api/v1/products-category"
        );
        const jsonProductCategory = await resProductCategory.json();
        setCategoriesData(jsonProductCategory.info);

        const res = await fetch("http://localhost:3000/api/v1/products");
        const json = await res.json();
        setProduct(json.info);
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchData();
  }, []);

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/products");
        const json = await res.json();
        setProduct(json.info);
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchData();
  }, []);

  const handleClickToCategoryDetail = (item) => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { item },
    });
  };

  const topDiscountProducts = useMemo(() => {
    return product
      .filter((p) => p.productDiscountPercentage > 0)
      .sort((a, b) => b.productDiscountPercentage - a.productDiscountPercentage)
      .slice(0, 5);
  }, [product]);

  return (
    <div className="midnav py-4">
      <div className="container">
        <div className="row align-items-center gx-lg-2 gx-0 m-0 p-0">
          {/* <div className="col-lg-3 d-none d-lg-block">Nguyen Ngoc Long</div> */}
          {/* <!-- LOGO --> */}
          <div className="col-lg-3 col-md-6 col-5 d-flex justify-content-start align-items-center">
            <Link className="navbar-brand d-none d-lg-block">
              <img src="/image/logoGM.png" alt="" width="200px" height="90px" />
            </Link>
            <div className="d-flex justify-content-between w-100 d-lg-none">
              <Link className="navbar-brand">
                <img
                  src="/image/logoGM.png"
                  alt=""
                  width="200px"
                  height="90px"
                />
              </Link>
            </div>
          </div>

          {/* <!-- Thanh tìm kiếm --> */}
          <div className="col-lg-6 d-none d-lg-block m-0 p-0">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                {/* <!-- Ô nhập tìm kiếm --> */}
                <input
                  type="search"
                  className="form-control form-control-lg rounded-start-5 border-success bg-white"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {/* <!-- Nút tìm kiếm --> */}
                <button
                  className="midnav__btn rounded-end-5 h-100 border-0"
                  type="submit"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ fontSize: "2rem" }}
                  />
                </button>
              </div>
              {showDropdown && (
                <div className="search-dropdown">
                  <div className="suggest__text">
                    <div className="suggest__text-title">Some Suggestions:</div>
                    <div className="suggest__text-info">
                      {topDiscountProducts.map((item) => (
                        <div
                          onClick={(e) => setSearchQuery(item.productName)}
                          className="product__suggest-card"
                          key={item._id}
                          style={{ width: "200px" }}
                        >
                          {item.productName}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="category__suggest">
                    <div
                      className="suggest-title"
                      style={{ marginBottom: "8px" }}
                    >
                      Category:
                    </div>
                    <div className="suggest-info">
                      {categoriesData.map((item) => (
                        <div
                          onClick={() => handleClickToCategoryDetail(item)}
                          className="category__suggest-card"
                          key={item._id}
                        >
                          {item.categoryName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* <!-- Heart, LogIn, Cart, List --> */}
          <div className="col-lg-3 text-end col-md-6 col-7 d-flex justify-content-end align-items-center m-0">
            <div className="list-inline d-flex">
              {/* <!-- Heart --> */}
              <div className="list-inline-item ps-3 pe-3">
                <Link className="position-relative text-dark" to="/wishlist">
                  <IoMdHeartEmpty style={{ fontSize: "3rem" }} />
                  {totalQuantity > 0 && (
                    <span className="wishlist-badge">
                      {totalQuantity > 9 ? "9+" : totalQuantity}
                    </span>
                  )}
                </Link>
              </div>
              {/* <!-- Cart --> */}
              <div className="list-inline-item ps-3 pe-3">
                <CartMini />
              </div>
              {/* <!-- LogIn --> */}
              <div className="list-inline-item ps-3 pe-3">
                <div className="dropdown">
                  <RxAvatar
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: "3rem" }}
                  />
                  <ul
                    className="dropdown-menu border-0"
                    style={{ overflow: "hidden", zIndex: 1050 }}
                  >
                    {isAuthenticated ? (
                      <>
                        <li>
                          <div
                            onClick={handleLogout}
                            className="dropdown-item fs-4"
                          >
                            <strong>LogOut</strong>
                          </div>
                        </li>
                        <li>
                          <Link to="myprofile" className="dropdown-item fs-4">
                            <strong>MyProfile</strong>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link className="dropdown-item fs-4" to="/login">
                            <strong>SignIn</strong>
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item fs-4" to="/register">
                            <strong>SignUp</strong>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {/* <!-- List --> */}
              <div className="list-inline-item ps-3 pe-3 d-inline-block d-lg-none">
                <button
                  className="navbar-toggler collapsed"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#navbar-default"
                  aria-controls="navbar-default"
                  aria-label="Toggle navigation"
                >
                  {/* <i className="fa-solid fa-bars fs-1"></i> */}
                  <LuSquareMenu style={{ fontSize: "3rem" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarMiddle;
