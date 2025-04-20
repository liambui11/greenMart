import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAlert } from "../../Context/AlertContext";
import "./CartItem.css";

function CartItemMini({ item }) {
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const [inputValue, setInputValue] = useState(item.quantity.toString());

    useEffect(() => {
        setInputValue(item.quantity.toString());
    }, [item.quantity]);

    if (!item?.productID) return null;

    const price = item.productID.productPrice;
    const discount = item.productID.productDiscountPercentage || 0;
    const discountedPrice = Number((price * (1 - discount / 100)).toFixed(2));

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setInputValue("");
            return;
        }

        // Kiểm tra số
        if (!/^\d+$/.test(value)) return;

        const parsed = parseInt(value);

        if (parsed > 0 && parsed <= item.productID.productStock) {
            setInputValue(value);
            dispatch(updateQuantity(item.productID._id, parsed));
        } else if (parsed > item.productID.productStock) {
            showAlert("error", `Only ${item.productID.productStock} in stock`);
        }
    };

    const handleBlur = () => {
        if (inputValue === "" || parseInt(inputValue) < 1) {
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

    const handleUp = () => {
        if (item.quantity < item.productID.productStock) {
            dispatch(updateQuantity(item.productID._id, item.quantity + 1));
        } else {
            showAlert("error", "The product has reached the maximum quantity in stock!");
        }
    };

    const handleDown = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity(item.productID._id, item.quantity - 1));
        }
    };

    const handleDelete = () => {
        dispatch(deleteItem(item.productID._id));
    };

    return (
        <div className="cart__item">
            <div className="cart__image">
                <img src={item.productID.productImage} alt={item.productID.productName} />
            </div>

            <div className="cart__content">
                <h4 className="cart__title">{item.productID.productName}</h4>
                <div className="cart__price">
                    {discountedPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    })}
                    {discount > 0 && (
                        <span className="cart__price--original">
                            {" "}
                            <del>{price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            })}</del>
                        </span>
                    )}
                </div>
            </div>

            <div className="cart__quantity">
                <button onClick={handleDown}>-</button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleUp}>+</button>
            </div>

            <button className="cart__delete-btn" onClick={handleDelete}>
                <FaRegTrashCan />
            </button>
        </div>
    );
}

export default CartItemMini;
