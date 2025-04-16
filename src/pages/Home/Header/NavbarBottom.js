import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './NavBottom.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

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
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };
    return (
        <nav className={`navbar navbar-expand-lg bg-white mt-2 ${isSticky ? "fixed-top shadow-sm" : ""}`}>
            <div className="navbottom container">
                {/* <!-- Thanh điều hướng khi thu nhỏ màn --> */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-default"
                    aria-labelledby="navbar-defaultLabel">
                    <div className="offcanvas-header pb-1">
                        <Link><img src="/image/logo.png" alt="" width="200px" height="70px" /></Link>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
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
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>


                        {/* <!-- Button Directory --> */}
                        {/* <!-- thanh dieu huong --> */}
                        <div className="directory1 d-block d-lg-none mb-4">
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
                                            <Link className="text-decoration-none text-dark">Vegetables</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Meat</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Fruits</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Beer and Soft
                                                Drinks</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Noodles</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Duck and Chicken</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Eggs and Milk</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="text-decoration-none text-dark">Confectionery</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ---Màn hình lớn--- */}
                        <div className="directory2 d-flex align-items-center">
                            <div className="dropdown me-5 d-none d-lg-block">
                                <button className="btn" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="me-1">
                                        <i className="fa-solid fa-list me-3"></i>
                                        ALL CATEGORIES
                                    </span>
                                </button>
                                <ul className="dropdown-menu rounded-0" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Vegetables</Link>
                                    </li>
                                    <li className="dropdown-submenu ">
                                        <Link className="text-decoration-none text-dark">Meat, Chicken & Fish</Link>
                                        <ul className="submenu dropdown-menu position-absolute top-0 start-100 rounded-0">
                                            <li><Link className="dropdown-item">Meat</Link></li>
                                            <li><Link className="dropdown-item">Chicken</Link></li>
                                            <li><Link className="dropdown-item">Fish</Link></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-item px-2 ">
                                        <Link className="text-decoration-none text-dark">Fruits</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Beer and Soft Drinks</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Noodles</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Duck and Chicken</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Eggs and Milk</Link>
                                    </li>
                                    <li className="dropdown-item ">
                                        <Link className="text-decoration-none text-dark">Confectionery</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="nvb">
                                <ul className="navbar-nav d-flex align-items-center ms-5">
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <Link to="/" className="text-decoration-none text-dark">
                                            <strong>HOME</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <Link to="/about" className="text-decoration-none text-dark"><strong>ABOUT</strong></Link>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <Link to="/news" className="text-decoration-none text-dark"><strong>NEWS</strong></Link>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <Link to="contact" className="text-decoration-none text-dark">
                                            <strong>CONTACT</strong>
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
                                        <Link to="myprofile" className="text-decoration-none text-dark">
                                            <strong>
                                                ANNOUNCEMENT
                                            </strong>
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

export default NavbarBottom