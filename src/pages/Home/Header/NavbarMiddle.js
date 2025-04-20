import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { RxAvatar } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSquareMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import CartMini from "../../../components/CartMini/index";
import './NavMiddle.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { checkAuth, logoutUser } from '../../../actions/auth';


function NavbarMiddle() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);//người dùng đã đăng nhập chưa
    const handleLogout = () => {
        dispatch(logoutUser());
        // window.location.reload();
    };
    const wishlist = useSelector((state) => state.wishlistReducer.items);
    const totalQuantity = wishlist.length;

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        }
    };
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
                                <img src="/image/logoGM.png" alt="" width="200px" height="90px" />
                            </Link>
                        </div>
                    </div>
                    {/* <!-- Thanh tìm kiếm --> */}
                    <div className="col-lg-6 d-none d-lg-block">
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                {/* <!-- Ô nhập tìm kiếm --> */}
                                <input
                                    type="search"
                                    className="form-control form-control-lg rounded-start ms-5 h-100 border-0"
                                    placeholder="Search for products"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                                {/* <!-- Nút tìm kiếm --> */}
                                <button
                                    className="btn btn-outline-secondary rounded-end h-100 border-0"
                                    type="submit"
                                >

                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "2rem" }} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Heart, LogIn, Cart, List --> */}
                    <div className="col-lg-3 text-end col-md-6 col-7 d-flex justify-content-end align-items-center m-0">
                        <div className="list-inline d-flex">
                            {/* <!-- Heart --> */}
                            <div className="list-inline-item">
                                <Link className="position-relative text-dark" to="/wishlist">
                                    <IoMdHeartEmpty style={{ fontSize: "3rem" }} />
                                    {totalQuantity > 0 && (
                                        <span className="wishlist-badge">
                                            {totalQuantity > 9 ? '9+' : totalQuantity}
                                        </span>
                                    )}

                                </Link>
                            </div>
                            {/* <!-- Cart --> */}
                            <div className="list-inline-item">
                                <CartMini />
                            </div>
                            {/* <!-- LogIn --> */}
                            <div className="list-inline-item">
                                <div className="dropdown">
                                    <RxAvatar data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "3rem" }} />
                                    <ul className="dropdown-menu border-0" style={{ overflow: "hidden", zIndex: 1050 }}>
                                        {
                                            isAuthenticated ? 
                                            (
                                                <>
                                                <li><div onClick={handleLogout} className="dropdown-item fs-4"><strong>LogOut</strong></div></li>
                                                <li><Link to="myprofile" className="dropdown-item fs-4"><strong>MyProfile</strong></Link></li>
                                                </>
                                            ):
                                            (
                                                <>
                                                <li><Link className="dropdown-item fs-4" to="/login"  ><strong>SignIn</strong></Link></li>
                                                <li><Link className="dropdown-item fs-4" to="/register" ><strong>SignUp</strong></Link></li>
                                                </>
                                            )
                                        }
                                        
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