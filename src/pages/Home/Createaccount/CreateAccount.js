import React from 'react'
import './CreateAccount.css';


function CreateAccount() {
    return (
        <section className="CreateAccount">
            <div className="container">
                <div className="createAccount row">
                    <div className="createAccount__title">
                        <h1>Create an account today</h1>
                        <h2><strong>to unlock exclusive deals, special discounts, </strong></h2>
                        <h3><strong>and experience seamless shopping!</strong></h3>
                    </div>
                    <div className="createAccount__email">
                        <button className="createAccount__email__btn">SIGN-UP</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAccount