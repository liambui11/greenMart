import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import { deleteAll } from "../../actions/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import "./css/CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  return (
    <div className="container cart-page">
      <h3 className="cart-page__heading">Shopping Cart</h3>
      <div className="row">
        <div className="col-lg-8">
          <div className="cart-page__info d-flex justify-content-between">
            <h6 className="cart-page__total-items">
            You have <span className="cart-page__highlight">{cart.length}</span> items in your cart
            </h6>
            <button onClick={() => dispatch(deleteAll())} className="cart-page__clear-btn">
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