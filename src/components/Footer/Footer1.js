import React from 'react'
import './Footer1.css'

function Footer1() {
    return (
        <section className="ss1">
            <div className="container">
                <div className="top-footer row">
                    <div className="footer-content col-md-2 col-sm-6">
                        <div className="infor">
                            <a href="#" className="logo-footer ">
                                <img src="/image/favicon.png" alt="" width="150px" height="100px" />
                            </a>
                            <div className="tieuDe">
                                Web Shopping for Clean, Safe Food.
                                For the health of every family.
                            </div>
                            <div className="location">
                                <i className="fa-solid fa-location-dot" ></i>
                                <span>Address:</span>351 ql13, Phường Hiệp Bình Phước, Quận Thủ Đức, Thành phố Hồ
                                Chí
                                Minh
                            </div>
                            <div className="call">
                                <i className="fa-solid fa-headset" ></i>
                                <span>Call Us: </span>0123456789
                            </div>
                            <div className="email">
                                <i className="fa-solid fa-envelope" ></i>
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
                                <li><a href="#">Vegetables</a></li>
                                <li><a href="#">Meat</a></li>
                                <li><a href="#">Fruits</a></li>
                                <li><a href="#">Beer and Soft Drinks</a></li>
                                <li><a href="#">Noodles</a></li>
                                <li><a href="#">Duck and Chicken</a></li>
                                <li><a href="#">Eggs and Milk</a></li>
                                <li><a href="#">Confectionery</a></li>
                            </ul>

                        </div>
                    </div>
                    <div className="footer-content col-md-2 col-sm-4">

                        <h3>Get to know us</h3>
                        <div className="about">
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Hotline</a></li>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Help Center</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer-content col-md-2 col-sm-4">

                        <h3>Policy</h3>
                        <div className="policy">
                            <ul>
                                <li><a href="#">Sales Policy</a></li>
                                <li><a href="#">Payment</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer-content col-md-2 col-sm-4">

                        <h3>For Customers</h3>
                        <div className="customer">
                            <ul>
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Shopping</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer1