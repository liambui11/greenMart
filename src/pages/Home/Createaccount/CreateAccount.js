import React from 'react'
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';


function CreateAccount() {
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate(`/register`)
    }
    return (
        <section className="CreateAccount">
            <div className="container">
                <div className="createAccount row">
                    <div className="createAccount__content">
                        <div className="createAccount__title">
                            <h1>Create an account today</h1>
                            <h2><strong>to unlock exclusive deals, special discounts, </strong></h2>
                            <h3><strong>and experience seamless shopping!</strong></h3>
                        </div>
                        <div className="createAccount__email">
                            <button onClick={handleClick} className="createAccount__email__btn">SIGN-UP</button>
                        </div>
                    </div>
                    <div className="createAccount__img">
                        <img 
                            src=" https://klbtheme.com/bacola/wp-content/uploads/2021/04/coupon.png"
                            alt=""
                            width="400px"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAccount