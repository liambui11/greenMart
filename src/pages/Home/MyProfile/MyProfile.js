import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from "react";
import Validation from "./MyProfileValidation";
import './MyProfile.css'
import axiosInstance from '../../../untils/axiosInstance'


const MyProfile = () => {
    const [file, setFile] = useState(null);

    const [values, setValues] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(()=>{
        const fetchUser = async () => {
            try{
                const res = await axiosInstance.get('/api/v1/users/detail');
                if (res.data.code === 200){
                    const user = res.data.info;
                    setValues({
                        name: user.userName || '',
                        email: user.userEmail || '',
                        address: user.userAddress || '',
                        phone: user.userPhone || ''
                    });
                    if (user.userAvatar) {
                        setFile(user.userAvatar);
                    }
                }
            }
            catch (err) {
                console.error("Lỗi khi lấy thông tin user:", err);
            }
        };
        fetchUser();
    },[])

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        console.log("bắt đầu chạy câpj nhật")

        if(Object.keys(validationErrors).length===0){
            try{

                // const res = await axiosInstance.put('/api/v1/users/update', {
                //     userName: values.name,
                //     userEmail: values.email,
                //     userPhone: values.phone,
                //     userAddress: values.address,
                // });
                const formData = new FormData();
                formData.append("userName", values.name);
                formData.append("userPhone", values.phone);
                formData.append("userAddress", values.address);

                const imageFile = document.getElementById("fileInput").files[0];
                if (imageFile) {
                    formData.append("userAvatar", imageFile);
                }

                const res = await axiosInstance.put('/api/v1/users/update', formData,{
                    headers:{
                        "Content-Type": "multipart/form-data"
                    }
                })

                if (res.data.code === 200) {
                    alert("Cập nhật thông tin thành công!");
                } else {
                    alert("Cập nhật thất bại!");
                }

            }catch(error){
                console.error("Lỗi khi cập nhật thông tin:", error);
                alert("Đã xảy ra lỗi khi cập nhật!");
            }
        }

    }

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };


    const handleButtonChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file))
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="Profile">
                    <div className="Profile__tittle">
                        <h1>MY PROFILE</h1>
                    </div>
                    <div className="Profile__infor">
                        
                        <div className="Profile__infor__form">
                            <form onSubmit={handleSubmit}>
                                <div className='Profile__infor__Fullname'>
                                    <label htmlFor="name"><strong>Full Name</strong></label>
                                    <input type="text" placeholder='Enter Full Name' name='name'
                                        onChange={handleInput} value={values.name} className='form-control rounded-0' />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                                <div className='Profile__infor__Email'>
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input type="email" placeholder='Enter Email' name='email' readOnly
                                        onChange={handleInput} value={values.email} className='form-control rounded-0' />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className='Profile__infor__Address'>
                                    <label htmlFor="address"><strong>Address</strong></label>
                                    <input type="text" placeholder='Enter Address' name='address'
                                        onChange={handleInput} value={values.address} className='form-control rounded-0' />
                                    {errors.address && <span className="text-danger">{errors.address}</span>}
                                </div>
                                <div className='Profile__infor__Phone'>
                                    <label htmlFor="phone"><strong>Phone Number</strong></label>
                                    <input type="text" placeholder='Enter Phone Number' name='phone'
                                        onChange={handleInput} value={values.phone} className='form-control rounded-0' />
                                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                </div>
                                <button type='submit' className='Profile__infor__form__btn'><strong>Save</strong></button>

                            </form>
                        </div>
                        <div className="Profile__infor__avatar">
                            <label>
                                <img
                                    className="Profile__infor__avatar__img"
                                    src={file || "./image/avatar-user/default-avatar-profile.png"}
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

export default MyProfile;