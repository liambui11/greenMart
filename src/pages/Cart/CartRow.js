import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import "./css/CartRow.css"; // Import file CSS riêng

const CartRow = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <tr className="cart-row">
      <td className="cart-row__product">
        <img className="cart-row__image" src={item.info.productImage} alt={item.info.productName} />
        <span className="cart-row__name">{item.info.productName}</span>
      </td>
      <td className="cart-row__price">{item.info.productPrice.toLocaleString()} &#x20AB;</td>
      <td className="cart-row__quantity">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => dispatch(updateQuantity(item.id, Number(e.target.value) - item.quantity))}
          min="1"
        />
      </td>
      <td className="cart-row__total">{(item.info.productPrice * item.quantity).toLocaleString()} &#x20AB;</td>
      <td className="cart-row__delete">
        <button onClick={() => dispatch(deleteItem(item.id))}><FaRegTrashCan/></button>
      </td>
    </tr>
  );
};

export default CartRow;
