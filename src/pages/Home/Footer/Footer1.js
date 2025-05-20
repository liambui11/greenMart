import React from "react";
import { Link } from "react-router-dom";
import "./Footer1.css";

function Footer1() {
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
                  width="130px"
                  height="100px"
                />
              </Link>
              <div className="tieuDe">
                Web Shopping for Clean, Safe Food. For the health of every
                family.
              </div>
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Address: </span>351 ql13, Phường Hiệp Bình Phước, Quận Thủ
                Đức, Thành phố Hồ Chí Minh
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
                <li>
                  <Link>Vegetables</Link>
                </li>
                <li>
                  <Link>Meat</Link>
                </li>
                <li>
                  <Link>Fruits</Link>
                </li>
                <li>
                  <Link>Beer and Soft Drinks</Link>
                </li>
                <li>
                  <Link>Noodles</Link>
                </li>
                <li>
                  <Link>Duck and Chicken</Link>
                </li>
                <li>
                  <Link>Eggs and Milk</Link>
                </li>
                <li>
                  <Link>Confectionery</Link>
                </li>
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
