import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./css/CartSummary.css"; 

const CartSummary = ({ cart }) => {
  const navigate = useNavigate(); 

  const total = cart.reduce((sum, item) => sum + item.info.productPrice * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout"); 
  };

  return (
    <div className="cart-summary border p-md-4">
      <table className="cart-summary__table table">
        <tbody>
          <tr className="cart-summary__row">
            <td className="cart-summary__cell">Subtotal</td>
            <td className="cart-summary__cell">{total.toLocaleString()} &#x20AB;</td>
          </tr>
          <tr className="cart-summary__row">
            <td className="cart-summary__cell">Total</td>
            <td className="cart-summary__cell">{total.toLocaleString()} &#x20AB;</td>
          </tr>
        </tbody>
      </table>
      <button className="cart-summary__button btn w-100" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
