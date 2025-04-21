import React from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateAccount() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.userName);

  const handleClick = (e) => {
    navigate(`/register`);
  };
  return (
    // <section className="CreateAccountForYou">
    // <div className="container">
    <div className="container__CreateAccount">
      <div className="CreateAccount__content">
        <div className="CreateAccount__title">
          <h1>Create an account today</h1>
          <h2>
            <strong>to unlock exclusive deals, special discounts, </strong>
          </h2>
          <h3>
            <strong>and experience seamless shopping!</strong>
          </h3>
        </div>
        <div className="CreateAccount__email">
          <button
            type="button"
            onClick={handleClick}
            className="CreateAccount__email__btn"
          >
            SIGN-UP
          </button>
        </div>
      </div>
      <div className="CreateAccount__img">
        <img
          src=" https://klbtheme.com/bacola/wp-content/uploads/2021/04/coupon.png"
          alt=""
          //   width="400px"
        />
      </div>
    </div>
    // </div>
    // </section>
  );
}

export default CreateAccount;
