import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Home.css';
import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Validation from "./My_ProfileValidation";
import './MyProfile.css'

// const NavbarTop = () => {
//     return (
//         <div className="container">
//             <div className="bg-light py-1">
//                 <div className="row">
//                     <div className="col-md-6 col-12 text-center text-md-start d-flex justify-content-start">
//                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">My_Account-</a>
//                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">WishList</a>
//                     </div>
//                     <div className="col-md-6 col-12 text-md-end d-flex justify-content-md-end">
//                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">HotLine: 0123456789</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         // {/* first header */ }
//     );
// };

// const NavbarMiddle = () => {
//     return (
//         <div className="py-4">
//             <div className="container">
//                 {/* <!-- LOGO --> */}
//                 <div className="row w-100 align-items-center gx-lg-2 gx-0">
//                     <div className="col-lg-3 col-md-6 col-5">
//                         <a className="navbar-brand d-none d-lg-block" href="baitap1.html">
//                             <img src="/image/logo.png" alt="" width="200px" height="90px" />
//                         </a>
//                         <div className="d-flex justify-content-between w-100 d-lg-none">
//                             <a className="navbar-brand" href="baitap1.html">
//                                 <img src="/image/logo.png" alt="" width="200px" height="90px" />
//                             </a>
//                         </div>
//                     </div>
//                     {/* <!-- Thanh tìm kiếm --> */}
//                     <div className="col-lg-5 d-none d-lg-block">
//                         <form action="">
//                             <div className="input-group">
//                                 {/* <!-- Ô nhập tìm kiếm --> */}
//                                 <input type="search" className="form-control form-control-lg rounded-start ms-5 "
//                                     placeholder="Search for products" />

//                                 {/* <!-- Nút tìm kiếm --> */}
//                                 <button className="btn btn-outline-secondary rounded-end" type="button">
//                                     <FontAwesomeIcon icon={faMagnifyingGlass} />
//                                 </button>
//                             </div>
//                         </form>
//                     </div>

//                     {/* <!-- Heart, LogIn, Cart, List --> */}
//                     <div className="col-lg-4 text-end col-md-6 col-7 d-flex justify-content-end align-items-center m-0">
//                         <div className="list-inline d-flex">
//                             {/* <!-- Heart --> */}
//                             <div className="list-inline-item gap-3">
//                                 <a href="https://www.youtube.com/" className="position-relative text-dark">
//                                     <i className="fa-regular fa-heart fs-2"></i>
//                                 </a>
//                             </div>
//                             {/* <!-- Cart --> */}
//                             <div className="list-inline-item">
//                                 <a href="https://www.youtube.com/" className="position-relative text-dark">
//                                     <i className="fa-solid fa-cart-shopping fs-2"></i></a>
//                             </div>
//                             {/* <!-- LogIn --> */}
//                             <div className="list-inline-item">

//                                 <div className="dropdown">
//                                     <i className="fa-regular fa-circle-user fs-2" data-bs-toggle="dropdown" aria-expanded="false"></i>
//                                     <ul className="dropdown-menu border-0">
//                                         <li><a className="dropdown-item fs-4" href="https://www.youtube.com/" ><strong>SignIn</strong></a></li>
//                                         <li><a className="dropdown-item fs-4" href="https://www.youtube.com/"><strong>SignUp</strong></a></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                             {/* <!-- List --> */}
//                             <div className="list-inline-item d-inline-block d-lg-none">
//                                 <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas"
//                                     data-bs-target="#navbar-default" aria-controls="navbar-default"
//                                     aria-label="Toggle navigation">
//                                     <i className="fa-solid fa-bars fs-2"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const NavbarBottom = () => {
//     const [isSticky, setSticky] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 100) {
//                 setSticky(true);
//             } else {
//                 setSticky(false);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);
//     return (
//         <nav className={`navbar navbar-expand-lg bg-white mt-2 ${isSticky ? "fixed-top shadow-sm" : ""}`}>
//             <div className="container">
//                 {/* <!-- Thanh điều hướng khi thu nhỏ màn --> */}
//                 <div className="offcanvas offcanvas-start" tabindex="-1" id="navbar-default"
//                     aria-labelledby="navbar-defaultLabel">
//                     <div className="offcanvas-header pb-1">
//                         <a href="https://www.youtube.com/"><img src="/image/logo.png" alt="" width="200px" height="70px" /></a>
//                         <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
//                     </div>

//                     <div className="offcanvas-body">
//                         {/* <!-- Search --> */}
//                         <div className="d-block d-md-none mb-4">
//                             <form action="https://www.youtube.com/">
//                                 <div className="input-group">
//                                     <input type="search" className="form-control rounded" placeholder="Search for products" />
//                                     <span className="input-group-append">
//                                         <button className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
//                                             type="button">
//                                             <i className="fa-solid fa-magnifying-glass"></i>
//                                         </button>
//                                     </span>
//                                 </div>
//                             </form>
//                         </div>

//                         {/* <!-- Button Directory --> */}
//                         {/* <!-- thanh dieu huong --> */}
//                         <div className="directory1 d-block d-md-none mb-4">
//                             <a className="btn btn-outline-success w-100 d-flex justify-content-center align-items-center dropdown-toggle collapsed"
//                                 data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
//                                 aria-controls="collapseExample">
//                                 <span className="me-1"><i className="fa-solid fa-list"></i></span>
//                                 MENU
//                             </a>
//                             <div className="mt-2 collapse" id="collapseExample">
//                                 <div className="card card-body">
//                                     <ul className="mb-0 list-unstyled">
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥬Vegetables</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥩Meat</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍎Fruits</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍺Beer and 🍹Soft
//                                                 Drinks</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍜Noodles</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🦆Duck and 🐔Chicken</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥚Eggs and🥛Milk</a>
//                                         </li>
//                                         <li className="dropdown-item">
//                                             <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍰🍬Confectionery</a>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ---Màn hình lớn--- */}
//                         <div className="directory2 d-flex align-items-center">
//                             <div className="dropdown me-5 d-none d-md-block">
//                                 <button className="btn px-6 btn-outline-primary-500" type="button" id="dropdownMenuButton1"
//                                     data-bs-toggle="dropdown" aria-expanded="false">
//                                     <span className="me-1">
//                                         <i className="fa-solid fa-list"></i>
//                                         MENU
//                                     </span>
//                                 </button>
//                                 <ul className="dropdown-menu fade" aria-labelledby="dropdownMenuButton1">
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥬Vegetables</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥩Meat</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍎Fruits</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍺Beer and 🍹Soft Drinks</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍜Noodles</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🦆Duck and 🐔Chicken</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🥚Eggs and🥛Milk</a>
//                                     </li>
//                                     <li className="dropdown-item">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">🍰🍬Confectionery</a>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="nvb">
//                                 <ul className="navbar-nav d-flex align-items-center ms-5">
//                                     <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
//                                         <a href="https://freshcart.codescandy.com/pages/shop-single.html" className="text-decoration-none text-dark">Home</a>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">About</a>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">News</a>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">
//                                             <span className="me-1">
//                                                 <i className="fa-solid fa-phone"></i>
//                                             </span>
//                                             Contact
//                                         </a>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-md-auto me-4 ms-5">
//                                         <a href="https://www.youtube.com/" className="text-decoration-none text-dark">
//                                             <span className="me-1">
//                                                 <i className="fa-solid fa-bell"></i>
//                                             </span>
//                                             Announcement
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };


const Infor = () => {
    const [file, setFile] = useState(null);

    const [values, setValues] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: [event.target.value]
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
    }

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };


    const handleButtonChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File được chọn:', file.name);
            setFile(URL.createObjectURL(file))
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="Profile">
                    <div className="Profile__tittle">
                        <h2><strong>My profile</strong></h2>
                    </div>
                    <div className="Profile__infor">
                        <div className="Profile__infor__form">
                            <form action="" onSubmit={handleSubmit}>
                                <div className='Profile__infor__Fullname'>
                                    <label htmlFor="name"><strong>Full Name</strong></label>
                                    <input type="text" placeholder='Enter Full Name' name='name'
                                        onChange={handleInput} className='form-control rounded-0' />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                                <div className='Profile__infor__Email'>
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input type="email" placeholder='Enter Email' name='email'
                                        onChange={handleInput} className='form-control rounded-0' />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className='Profile__infor__Address'>
                                    <label htmlFor="address"><strong>Address</strong></label>
                                    <input type="text" placeholder='Enter Address' name='address'
                                        onChange={handleInput} className='form-control rounded-0' />
                                    {errors.address && <span className="text-danger">{errors.address}</span>}
                                </div>
                                <div className='Profile__infor__Phone'>
                                    <label htmlFor="phone"><strong>Phone Number</strong></label>
                                    <input type="text" placeholder='Enter Phone Number' name='phone'
                                        onChange={handleInput} className='form-control rounded-0' />
                                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                </div>
                                <button type='submit' className='Profile__infor__form__btn'><strong>Save</strong></button>

                            </form>
                        </div>
                        {/* <div className="Profile__infor__line"></div> */}
                        <div className="Profile__infor__avatar">
                            <label>
                                <img
                                    className="Profile__infor__avatar__img"
                                    src={file || "./image/avatarDefault.jpg"} // Ảnh mặc định
                                    width={200}
                                    height={200}
                                    alt="Avatar"
                                />
                                <input
                                    type="file" id="fileInput"
                                    onChange={handleButtonChange}
                                    accept="image/*"
                                />
                                <button className="Profile__infor__avatar__btn" type="button" onClick={handleButtonClick}>
                                    <strong>CHOOSE IMAGE</strong>
                                </button>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const My_Profile = () => {
    return (
        <div>
            {/* <NavbarTop />
            <NavbarMiddle />
            <NavbarBottom /> */}
            <Infor />

        </div>
    );
};

export default My_Profile;