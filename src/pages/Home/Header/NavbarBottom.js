import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBottom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const renderCategoryTreeMobile = (categories, navigate) => {
  const handleClick = (item) => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { item },
    });
  };
  return categories.map((category, index) => (
    <li key={index} className="dropdown-submenu1 mb-2">
      <div
        onClick={() => handleClick(category)}
        className="dropdown-item1 text-decoration-none text-dark d-block py-2"
      >
        {category.categoryName}
        {category.children && category.children.length > 0 && (
          <MdKeyboardArrowRight />
        )}
      </div>

      {category.children && category.children.length > 0 && (
        <ul className="submenu1 list-unstyled ps-3">
          {renderCategoryTreeMobile(category.children, navigate)}
        </ul>
      )}
    </li>
  ));
};

const renderCategoryTree = (categories, navigate) => {
  const handleClick = (item) => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { item },
    });
  };
  return categories.map((category, index) => (
    <li key={index} className="dropdown-submenu rounded-0">
      <div
        onClick={() => handleClick(category)}
        className="dropdown-item text-decoration-none"
      >
        <span>{category.categoryName}</span>
        {category.children && category.children.length > 0 && (
          <IoIosArrowDown />
        )}
      </div>

      {category.children && category.children.length > 0 && (
        <ul className="submenu dropdown-menu ">
          {renderCategoryTree(category.children, navigate)}
        </ul>
      )}
    </li>
  ));
};

function NavbarBottom() {
  const [isSticky, setSticky] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/products-category/categorytree`
        );
        const json = await res.json();
        setCategoriesData(json.info);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg mt-2 ${isSticky ? "fixed-top shadow-sm" : ""}`}
    >
      <div className="navbottom container">
        {/* <!-- Thanh điều hướng khi thu nhỏ màn --> */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="navbar-default"
          aria-labelledby="navbar-defaultLabel"
        >
          <div className="offcanvas-header pb-1">
            <Link>
              <img src="/image/logoGM.png" alt="" width="200px" height="70px" />
            </Link>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* <!-- Search --> */}
            <div className="d-block d-lg-none mb-4">
              <form action={handleSearch}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search for products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="input-group-append">
                    <button
                      className="btn bg-light border-bottom border-top border-end ms-n10 rounded-0 rounded-end"
                      type="submit"
                    >
                      <CiSearch style={{ fontSize: "2rem" }} />
                    </button>
                  </span>
                </div>
              </form>
            </div>

            {/* <!-- Button Directory --> */}
            {/* <!-- thanh dieu huong --> */}
            <div className="directory1 d-block d-lg-none mb-4 bg-">
              <a
                className="btn btn-outline-success w-100 d-flex justify-content-center align-items-center dropdown-toggle collapsed"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <span className="me-1">
                  <i className="fa-solid fa-list"></i>
                </span>
                ALL CATEGORIES
              </a>
              <div className="mt-2 collapse" id="collapseExample">
                <div className="card card-body">
                  <ul className="mb-0 list-unstyled">
                    {renderCategoryTreeMobile(categoriesData, navigate)}
                  </ul>
                </div>
              </div>
            </div>

            {/* ---Màn hình lớn--- */}
            <div className="directory2 d-lg-flex justify-content-start align-items-center ">
              <div className="dropdown d-none d-lg-flex justify-content-start align-items-start ">
                <button
                  className="btn"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="me-0">
                    <i className="fa-solid fa-list me-3"></i>
                    ALL CATEGORIES
                  </span>
                </button>
                <ul
                  className="dropdown-menu me-0"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {renderCategoryTree(categoriesData, navigate)}
                </ul>
              </div>
              <div className="nvb">
                <ul className="navbar-nav me-5">
                  <li className="nav-item dropdown w-100 w-md-auto me-4 ms-4 ps-5 pd-5">
                    <Link to="/" className="text-decoration-none text-white">
                      <strong>Home</strong>
                    </Link>
                  </li>
                  <li className="nav-item dropdown w-100 w-md-auto me-4 ms-4 ps-5 pd-5">
                    <Link
                      to="/about"
                      className="text-decoration-none text-white"
                    >
                      <strong>About</strong>
                    </Link>
                  </li>
                  <li className="nav-item dropdown w-100 w-md-auto me-4 ms-4 ps-5 pd-5">
                    <Link
                      to="/news"
                      className="text-decoration-none text-white"
                    >
                      <strong>News</strong>
                    </Link>
                  </li>
                  <li className="nav-item dropdown w-100 w-md-auto me-4 ms-4 ps-5 pd-5">
                    <Link
                      to="contact"
                      className="text-decoration-none text-white"
                    >
                      <strong>Contact</strong>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarBottom;
