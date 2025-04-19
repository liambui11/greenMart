import { useSelector } from "react-redux";
import CartItemMini from "./CartItemMini";
import React from 'react';

function CartList(props) {
    const {cart} = props;
    return (
        <>
          <div className="cart">
            {cart.map((item) => (
              <CartItemMini item = {item}  key={item._id}/>
            ))}
          </div>
        </>
    );
  }
  
export default React.memo(CartList);
  