import React from 'react'
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavbarBottom() {
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
            <div className="navbottom container">
                {/* <!-- Thanh điều hướng khi thu nhỏ màn --> */}
                <div className="offcanvas offcanvas-start" tabindex="-1" id="navbar-default"
                    aria-labelledby="navbar-defaultLabel">
                    <div className="offcanvas-header pb-1">
                        <a href="#"><img src="/image/logo.png" alt="" width="200px" height="70px" /></a>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>

                    <div className="offcanvas-body">
                        {/* <!-- Search --> */}
                        <div className="d-block d-md-none mb-4">
                            <form action="#">
                                <div className="input-group">
                                    <input type="search" className="form-control rounded" placeholder="Search for products" />
                                    <span className="input-group-append">
                                        <button className="btn bg-light border-bottom border-top border-end ms-n10 rounded-0 rounded-end" type="button">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>


                        {/* <!-- Button Directory --> */}
                        {/* <!-- thanh dieu huong --> */}
                        <div className="directory1 d-block d-md-none mb-4">
                            <a className="btn btn-outline-success w-100 d-flex justify-content-center align-items-center dropdown-toggle collapsed"
                                data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                                aria-controls="collapseExample">
                                <span className="me-1"><i className="fa-solid fa-list"></i></span>
                                ALL CATEGORIES
                            </a>
                            <div className="mt-2 collapse" id="collapseExample">
                                <div className="card card-body">
                                    <ul className="mb-0 list-unstyled">
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Vegetables</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Meat</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Fruits</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Beer and Soft
                                                Drinks</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Noodles</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Duck and Chicken</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Eggs and Milk</a>
                                        </li>
                                        <li className="dropdown-item">
                                            <a href="#" className="text-decoration-none text-dark">Confectionery</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ---Màn hình lớn--- */}
                        <div className="directory2 d-flex align-items-center">
                            <div className="dropdown me-5 d-none d-md-block">
                                <button className="btn btn-success text-white" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="me-1">
                                        <i className="fa-solid fa-list me-3"></i>
                                        ALL CATEGORIES
                                    </span>
                                </button>
                                <ul className="dropdown-menu fade" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item ">
                                        <Link href="#" className="text-decoration-none text-dark">Vegetables</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Meat</a>
                                    </li>
                                    <li className="dropdown-item px-2 ">
                                        <a href="#" className="text-decoration-none text-dark">Fruits</a>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Beer and Soft Drinks</a>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Noodles</a>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Duck and Chicken</a>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Eggs and Milk</a>
                                    </li>
                                    <li className="dropdown-item ">
                                        <a href="#" className="text-decoration-none text-dark">Confectionery</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="nvb">
                                <ul className="navbar-nav d-flex align-items-center ms-5">
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="https://freshcart.codescandy.com/pages/shop-single.html" className="text-decoration-none text-dark">
                                            <strong>HOME</strong>
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark"><strong>ABOUT</strong></a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark"><strong>NEWS</strong></a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">
                                            {/* <span className="me-1">
                                                  <i className="fa-solid fa-phone"></i>
                                              </span> */}
                                            <strong>CONTACT</strong>
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <a href="#" className="text-decoration-none text-dark">
                                            {/* <span className="me-1">
                                                  <i className="fa-solid fa-bell"></i>
                                              </span> */}
                                            <strong>
                                                ANNOUNCEMENT
                                            </strong>
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
}

export default NavbarBottom