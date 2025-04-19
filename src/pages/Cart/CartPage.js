import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAll, fetchCart } from "../../actions/cart";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import { FaRegTrashCan } from "react-icons/fa6";
import "./css/CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");  
    } else {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, navigate]);

  const cart = useSelector((state) => state.cartReducer);

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleClearCart = () => {
      dispatch(deleteAll());
  };

  return (
    <div className="container cart-page">
      <h3 className="cart-page__heading">Shopping Cart</h3>
      <div className="row">
        <div className="col-lg-8">
          <div className="cart-page__info d-flex justify-content-between">
            <h6 className="cart-page__total-items">
            You have <span className="cart-page__highlight">{totalQuantity}</span> items in your cart
            </h6>
            <button onClick={handleClearCart} className="cart-page__clear-btn">
             <FaRegTrashCan/> Clear All
            </button>
          </div>
          <CartTable cart={cart} />
        </div>
        <div className="col-lg-4">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;