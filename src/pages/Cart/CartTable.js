import React from "react";
import CartRow from "./CartRow";
import "./css/CartTable.css"; // Import CSS riêng

const CartTable = ({ cart }) => {
  return (
    <div className="cart-table table-responsive">
      <table className="cart-table__table table">
        <thead className="cart-table__header">
          <tr>
            <th className="cart-table__cell">Product</th>
            <th className="cart-table__cell">Price</th>
            <th className="cart-table__cell">Quantity</th>
            <th className="cart-table__cell">Total</th>
            <th className="cart-table__cell">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <CartRow item = {item}  key={item._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
