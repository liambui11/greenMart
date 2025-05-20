import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAlert } from "../../Context/AlertContext";
import { useNavigate } from "react-router-dom";
import "./css/CartRow.css";

const CartRow = ({ item }) => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(item.quantity.toString());

  const discountedPrice = Number(
    (item.productID.productPrice * (1 - item.productID.productDiscountPercentage / 100)).toFixed(2)
  );

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const newQuantity = Number(value);

    if (value === "" || newQuantity < 1) {
      setInputValue(value); 
      return;
    }

    if (newQuantity > item.productID.productStock) {
      showAlert("error", `Only ${item.productID.productStock} in stock`);
      return;
    }

    setInputValue(value);
    dispatch(updateQuantity(item.productID._id, newQuantity));
  };

  const handleBlur = () => {
    if (inputValue === "" || Number(inputValue) < 1) {
      setInputValue("1");
      dispatch(updateQuantity(item.productID._id, 1));
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const goToProductDetail = () => {
    navigate(`/productdetail/${item.productID.productSlug}`);
  };

  return (
    <tr className="cart-row">
      <td className="cart-row__product" onClick={goToProductDetail} style={{ cursor: "pointer" }} >
        <img className="cart-row__image" src={item.productID.productImage} alt={item.productID.productName} />
        <span className="cart-row__name">{item.productID.productName}</span>
      </td>

      <td className="cart-row__price">
        {discountedPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        {item.productID.productDiscountPercentage > 0 && (
          <span className="cart-row__original-price">
            {" "}
            <del>{item.productID.productPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 })}</del>
          </span>
        )}
      </td>

      <td className="cart-row__quantity">
        <input
          type="text"
          value={inputValue}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          min="1"
          max={item.productID.productStock}
        />
      </td>

      <td className="cart-row__total">
        {Number((discountedPrice * item.quantity).toFixed(2)).toLocaleString("en-US", {
          style: "currency",
          currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2
        })}
      </td>

      <td className="cart-row__delete">
        <button onClick={() => dispatch(deleteItem(item.productID._id))}>
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default CartRow;
