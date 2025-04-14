import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from "react";
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


const My_Profile = () => {
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

export default My_Profile;