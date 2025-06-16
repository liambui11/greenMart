import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer1.css";

function Footer1() {
  const [dataCategory, setDataCategory] = useState([]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/products-category/categorytree`
        );
        const json = await res.json();
        const parentCategories = json.info.filter(
          (cat) => cat.categoryParentID === null
        );
        setDataCategory(parentCategories);
      } catch (error) {
        console.error("Faild fetch product:", error);
      }
    };
    fetchCategoryData();
  }, []);

  return (
    <section className="footerss1">
      <div className="container">
        <div className="top-footer row">
          <div className="footer-content col-md-2 col-sm-6">
            <div className="infor">
              <Link className="logo-footer ">
                <img
                  src="/image/favicon.png"
                  alt=""
                  width="150px"
                  height="150px"
                />
              </Link>
              <div className="tieuDe">
                Web Shopping for Clean, Safe Food. For the health of every
                family.
              </div>
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Address: </span>97 Man Thien St., Hiep Phu Ward, Thu Duc
                City, Ho Chi Minh City
              </div>
              <div className="call">
                <i className="fa-solid fa-headset"></i>
                <span>Call Us: </span>0123456789
              </div>
              <div className="email">
                <i className="fa-solid fa-envelope"></i>
                <span>Email: </span>Greenmart@gmail.com
              </div>
              <div className="hours">
                <i className="fa-solid fa-clock"></i>
                <span>Hours: </span>8:00-22:00, Mon-Sat
              </div>
            </div>
          </div>
          <div className="footer-content col-md-2 col-sm-6">
            <h3>Categories</h3>
            <div className="listProduct">
              <ul>
                {dataCategory.map((category, index) => (
                  <li key={index}>
                    <Link to={`/categorydetail/${category.categorySlug}`}>
                      {category.categoryName}
                      {console.log("11111111111111111111111111111")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-content col-md-2 col-sm-4">
            <h3>Get to know us</h3>
            <div className="footer-about">
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Hotline</Link>
                </li>
                <li>
                  <Link to="/about">Company</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content col-md-2 col-sm-4">
            <h3>Policy</h3>
            <div className="policy">
              <ul>
                <li>
                  <Link to="/news">Sales Policy</Link>
                </li>
                <li>
                  <Link>Pay via courier</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content col-md-2 col-sm-4">
            <h3>For Customers</h3>
            <div className="customer">
              <ul>
                <li>
                  <Link to="/login">Account</Link>
                </li>
                <li>
                  <Link to="/myprofile">My Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer1;
