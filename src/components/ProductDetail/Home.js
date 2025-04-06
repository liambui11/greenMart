import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './Home.css';
import products from "./products";
import { useState, useEffect, useRef } from "react";

const NavbarTop = () => {
    return (
        <div className="container">
            <div className="bg-light py-1">
                <div className="row">
                    <div className="col-md-6 col-12 text-center text-md-start d-flex justify-content-start">
                        <a href="#" className="text-decoration-none text-dark">My_Account-</a>
                        <a href="#" className="text-decoration-none text-dark">WishList</a>
                    </div>
                    <div className="col-md-6 col-12 text-md-end d-flex justify-content-md-end">
                        <a href="#" className="text-decoration-none text-dark">HotLine: 0123456789</a>
                    </div>
                </div>
            </div>
        </div>
        // {/* first header */ }
    );
};

const NavbarMiddle = () => {
    return (
        <div className="py-4">
            <div className="container">
                {/* <!-- LOGO --> */}
                <div className="row w-100 align-items-center gx-lg-2 gx-0">
                    <div className="col-lg-3 col-md-6 col-5">
                        <a className="navbar-brand d-none d-lg-block" href="baitap1.html">
                            <img src="/image/logo.png" alt="" width="200px" height="90px" />
                        </a>
                        <div className="d-flex justify-content-between w-100 d-lg-none">
                            <a className="navbar-brand" href="baitap1.html">
                                <img src="/image/logo.png" alt="" width="200px" height="90px" />
                            </a>
                        </div>
                    </div>
                    {/* <!-- Thanh tìm kiếm --> */}
                    <div className="col-lg-5 d-none d-lg-block">
                        <form action="#">
                            <div className="input-group">
                                {/* <!-- Ô nhập tìm kiếm --> */}
                                <input type="search" className="form-control form-control-lg rounded-start ms-5 "
                                    placeholder="Search for products" />

                                {/* <!-- Nút tìm kiếm --> */}
                                <button className="btn btn-outline-secondary rounded-end" type="button">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Heart, LogIn, Cart, List --> */}
                    <div className="col-lg-4 text-end col-md-6 col-7 d-flex justify-content-end align-items-center m-0">
                        <div className="list-inline d-flex">
                            {/* <!-- Heart --> */}
                            <div className="list-inline-item gap-3">
                                <a href="" className="position-relative text-dark">
                                    <i class="fa-regular fa-heart"></i>
                                </a>
                            </div>
                            {/* <!-- Cart --> */}
                            <div className="list-inline-item">
                                <a href="" className="position-relative text-dark">
                                    <i className="fa-solid fa-cart-shopping"></i></a>
                            </div>
                            {/* <!-- LogIn --> */}
                            <div className="list-inline-item">
                                <a href="" className="text-dark"><i className="fa-regular fa-circle-user"></i></a>
                            </div>
                            {/* <!-- List --> */}
                            <div className="list-inline-item d-inline-block d-lg-none">
                                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#navbar-default" aria-controls="navbar-default"
                                    aria-label="Toggle navigation">
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavbarBottom = () => {
    const [isSticky, setSticky] = useState(false);

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
    return (
        <nav className={`navbar navbar-expand-lg bg-white mt-2 ${isSticky ? "fixed-top shadow-sm" : ""}`}>
            <div className="container">
                {/* <!-- Thanh điều hướng khi thu nhỏ màn --> */}
                <div className="offcanvas offcanvas-start" tabindex="-1" id="navbar-default"
                    aria-labelledby="navbar-defaultLabel">
                    <div className="offcanvas-header pb-1">
                        <a href="#"><img src="/image/logo.png" alt="" width="200px" height="70px" /></a>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>

                    <div className="offcanvas-body">
                        {/* <!-- Search --> */}
                        <div class="d-block d-md-none mb-4">
                            <form action="#">
                                <div class="input-group">
                                    <input type="search" className="form-control rounded" placeholder="Search for products" />
                                    <span className="input-group-append">
                                        <button className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
                                            type="button">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Button Directory --> */}
                        {/* <!-- thanh dieu huong --> */}
                        <div class="directory1 d-block d-md-none mb-4">
                            <a className="btn btn-outline-success w-100 d-flex justify-content-center align-items-center dropdown-toggle collapsed"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                                aria-controls="collapseExample">
                                <span className="me-1"><i class="fa-solid fa-list"></i></span>
                                MENU
                            </a>
                            <div className="mt-2 collapse" id="collapseExample">
                                <div className="card card-body">
                                    <ul className="mb-0 list-unstyled">
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🥬Vegetables</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🥩Meat</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🍎Fruits</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🍺Beer and 🍹Soft
                                                Drinks</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🍜Noodles</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🦆Duck and 🐔Chicken</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🥚Eggs and🥛Milk</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">🍰🍬Confectionery</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ---Màn hình lớn--- */}
                        <div className="directory2 d-flex align-items-center">
                            <div className="dropdown me-5 d-none d-md-block">
                                <button className="btn px-6 btn-outline-primary-500" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="me-1">
                                        <i class="fa-solid fa-list"></i>
                                        MENU
                                    </span>
                                </button>
                                <ul className="dropdown-menu fade" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🥬Vegetables</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🥩Meat</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🍎Fruits</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🍺Beer and 🍹Soft Drinks</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🍜Noodles</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🦆Duck and 🐔Chicken</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🥚Eggs and🥛Milk</a>
                                    </li>
                                    <li className="dropdown-item">
                                        <a href="#" className="text-decoration-none text-dark">🍰🍬Confectionery</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="nvb">
                                <ul className="navbar-nav d-flex align-items-center ms-5">
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="https://freshcart.codescandy.com/pages/shop-single.html" className="text-decoration-none text-dark">Home</a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">About</a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">News</a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">
                                            <span className="me-1">
                                                <i className="fa-solid fa-phone"></i>
                                            </span>
                                            Contact
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">
                                            <span className="me-1">
                                                <i className="fa-solid fa-bell"></i>
                                            </span>
                                            Announcement
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};



// Main
const TopSectionMain = ({ product }) => {
    return (
        <nav>
            <div className="container">
                <div className="row">
                    <div className="topSectionMain">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <i class="fa-solid fa-angle-right"></i>
                            </li>
                            <li>
                                <a href="#">Product</a>
                            </li>
                            <li>
                                <i class="fa-solid fa-angle-right"></i>
                            </li>
                            <li>
                                <a>{product.name}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const ImgSectionMain = ({ product }) => {
    const [quantity, setQuantity] = useState(product.quantity);

    const [index, setIndex] = useState(0);

    const handleSubtract = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1))
    }
    const handlePlus = () => {
        setQuantity(prevQuantity => (prevQuantity + 1))
    }

    return (
        <nav>
            <div className="container">
                <div className="MidSectionMain row">
                    <div className="imgSectionMain">
                        <img src="/image/apple.png" alt="" />
                        <p className="discount"> {product.discount}</p>
                    </div>
                    <div className="contentSectionMain">

                        <h1>{product.name}</h1>
                        <hr />

                        <div className="price">
                            <p>Price:</p>
                            <p className="Promotional"> ${product.price - (product.price * (parseFloat(product.discount) / 100))} </p>
                            <p className="List">${product.price.toLocaleString()}</p>
                        </div>

                        <div className="availability">
                            <p>
                                <span>Availability:</span>
                                {product.availability}
                            </p>

                            <p>
                                <span>Type:</span>
                                {product.type}
                            </p>
                        </div>

                        <div className="Quantity">

                            <button type="button" className="subtract" onClick={handleSubtract}>-</button>
                            <div className="Quantity__num">{quantity}</div>
                            <button type="button" className="plus" onClick={handlePlus}>+</button>

                        </div>

                        <div className="btnAddHeart">
                            <button className="btnAdd" type="button">
                                <i class="fa-solid fa-plus"></i>
                                Add to Cart
                            </button>
                            <div className="heart">
                                <a href="#">
                                    <i className="fa-regular fa-heart"></i>
                                </a>

                            </div>
                        </div>

                        <div className="describe">
                            <p>Describe:
                                <span>
                                    {product.describe}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}

// ----------


const Footer1 = () => {
    return (
        <section className="ss1">
            <div className="container">
                <div className="top-footer row">
                    <div className="footer-content col-md-2 col-sm-6">
                        <div className="infor">
                            <a href="#" className="logo-footer ">
                                <img src="/image/logo.png" alt="" width="200px" height="90px" />
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


const Footer2 = () => {
    return (
        <section className="ss2">
            <div className="container">
                <div className="partners">
                    <div className="content">
                        <h4>Secured Payment Gateways</h4>
                    </div>
                    <div className="imgVisa">
                        <img src="/image/Visa.png" alt="" />
                    </div>
                    <div className="imgAmazon">
                        <img src="/image/amazon-logo.png" alt="" />
                    </div>
                    <div className="imgMasterCard">
                        <img src="/image/MasterCard-Logo.png" alt="" />
                    </div>
                    <div className="imgAmerican">
                        <img src="/image/R.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

const Footer3 = () => {
    return (
        <section className="ss3">
            <div className="container">
                <div className="end">
                    <div className="content">
                        <h5>© 2025, Greenmart.com - Website system to
                            sell necessities and clean food for free</h5>
                    </div>
                    <div className="socialMedia">
                        <h5>Follow Us</h5>
                        <div className="mxh">
                            <a href="#"><i className="fa-brands fa-facebook fa-2x"></i></a>
                            <a href="#"><i className="fa-brands fa-square-instagram fa-2x"></i></a>
                            <a href="#"><i className="fa-brands fa-tiktok fa-2x"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube fa-2x"></i></a>
                            <a href="#"><i className="fa-brands fa-square-twitter fa-2x"></i></a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

const HR = () => {
    return (
        <hr style={{ border: "0.5px solid #ccc", margin: "0" }} />
    );
};

const WishList = () => {
    return (
        <div>
            <NavbarTop />
            <NavbarMiddle />
            <NavbarBottom />
            <HR />
            {/* <TopSectionMain /> */}
            {products.map((product) => (
                <TopSectionMain key={product.id} product={product} />
            ))}
            {/* <ImgSectionMain /> */}
            {products.map((product) => (
                <ImgSectionMain key={product.id} product={product} />
            ))}

            <HR />
            <Footer1 />
            <HR />
            <Footer2 />
            <HR />
            <Footer3 />
        </div>
    );
};

export default WishList;
