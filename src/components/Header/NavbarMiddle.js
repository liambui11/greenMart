import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSquareMenu } from "react-icons/lu";
import { Link } from "react-router-dom";


function NavbarMiddle() {
    return (
        <div className="midnav py-4">
            <div className="container">
                {/* <!-- LOGO --> */}
                <div className="row w-100 align-items-center gx-lg-2 gx-0">
                    <div className="col-lg-3 col-md-6 col-5">
                        <Link className="navbar-brand d-none d-lg-block" >
                            <img src="/image/logoGM.png" alt="" width="200px" height="90px" />
                        </Link>
                        <div className="d-flex justify-content-between w-100 d-lg-none">
                            <Link className="navbar-brand" >
                                <img src="/image/logo.png" alt="" width="200px" height="90px" />
                            </Link>
                        </div>
                    </div>
                    {/* <!-- Thanh tìm kiếm --> */}
                    <div className="col-lg-6 d-none d-lg-block">
                        <form action="#">
                            <div className="input-group">
                                {/* <!-- Ô nhập tìm kiếm --> */}
                                <input type="search" className="form-control form-control-lg rounded-start ms-5 h-100 border-0"
                                    placeholder="Search for products" />

                                {/* <!-- Nút tìm kiếm --> */}
                                <button className="btn btn-outline-secondary rounded-end h-100 border-0" type="button">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "2rem" }} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Heart, LogIn, Cart, List --> */}
                    <div className="col-lg-3 text-end col-md-6 col-7 d-flex justify-content-end align-items-center m-0">
                        <div className="list-inline d-flex">
                            {/* <!-- Heart --> */}
                            <div className="list-inline-item gap-3">
                                <Link className="position-relative text-dark">
                                    {/* <i class="fa-regular fa-heart fs-2"></i> */}
                                    <IoMdHeartEmpty style={{ fontSize: "3rem" }} />
                                </Link>
                            </div>

                            {/* <!-- Cart --> */}
                            <div className="list-inline-item">
                                <Link href="" className="position-relative text-dark">
                                    {/* <i className="fa-solid fa-cart-shopping fs-2"></i> */}
                                    {/* <i className="klbth-icon-shopping-bag"></i> */}
                                    <HiOutlineShoppingBag style={{ fontSize: "3rem" }} />
                                </Link>
                            </div>

                            {/* <!-- LogIn --> */}
                            <div className="list-inline-item">
                                {/* <a href="" className="text-dark">
                                    
                                    <RxAvatar style={{ fontSize: "3rem" }} />
                                </a> */}
                                <div className="dropdown">
                                    {/* <i className="fa-regular fa-circle-user fs-2" data-bs-toggle="dropdown" aria-expanded="false"></i> */}
                                    <RxAvatar data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "3rem" }} />
                                    <ul className="dropdown-menu border-0" style={{ overflow: "hidden", zIndex: 1050 }}>
                                        <li><Link className="dropdown-item fs-4"  ><strong>SignIn</strong></Link></li>
                                        <li><Link className="dropdown-item fs-4" ><strong>SignUp</strong></Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- List --> */}
                            <div className="list-inline-item d-inline-block d-lg-none">
                                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#navbar-default" aria-controls="navbar-default"
                                    aria-label="Toggle navigation">
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