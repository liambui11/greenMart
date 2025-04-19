import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./css/CartSummary.css"; 

const CartSummary = ({ cart }) => {
  const navigate = useNavigate(); 

  const total = cart.reduce((sum, item) => {
    const price = item.productID.productPrice;
    const discount = item.productID.productDiscountPercentage || 0;
    const discountedPrice = price * (1 - discount / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const formatUSD = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const handleCheckout = () => {
    navigate("/checkout"); 
  };

  return (
    <div className="cart-summary border p-md-4">
      <table className="cart-summary__table table">
        <tbody>
          <tr className="cart-summary__row">
            <td className="cart-summary__cell">Subtotal</td>
            <td className="cart-summary__cell">{formatUSD(total)}</td>
          </tr>
          <tr className="cart-summary__row">
            <td className="cart-summary__cell">Total</td>
            <td className="cart-summary__cell">{formatUSD(total)}</td>
          </tr>
        </tbody>
      </table>
      <button className="cart-summary__button btn w-100" onClick={handleCheckout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
