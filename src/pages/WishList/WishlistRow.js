import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { deleteWishlistItem } from "../../actions/wishlist";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAlert } from "../../Context/AlertContext";
import "./css/WishlistRow.css";

const WishlistRow = ({ item }) => {
    const cart = useSelector(state => state.cartReducer.items);
    const dispatch = useDispatch();
    const { showAlert } = useAlert();

    const handleAddToCart = () => {
        const existingItem = cart.find(cartItem => cartItem.productID._id === item._id);
        const currentQty = existingItem?.quantity || 0;

        if (item.productStock <= 0 || currentQty >= item.productStock) {
            showAlert("error", "Not enough stock available.");
            return;
        }

        if (existingItem) {
            dispatch(updateQuantity(item._id, existingItem.quantity + 1));
            showAlert("success", "Quantity updated in cart.");
        } else {
            dispatch(addToCart(item._id, 1));
            showAlert("success", "Added to cart successfully!");
        }
    };
    
    return (
        <tr className="wishlist-row">
            <td className="wishlist-row__product">
                <img src={item.productImage} alt={item.productName} className="wishlist__image" />
                {item.productName}
            </td>
            <td className="wishlist-row__price">${item.productPrice}</td>
            <td className="wishlist-row__status">
                <span
                    className={`wishlist__status ${item.productStock > 0 ? "wishlist__status--in-stock" : "wishlist__status--out-stock"}`}
                >
                    {item.productStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </td>
            <td className="wishlist-row__button">
                {item.productStock > 0 ? (
                    <button className="wishlist__btn--primary" onClick={handleAddToCart}>Add to Cart</button>
                ) : (
                    <button className="wishlist__btn--contact">Contact us</button>
                )}
            </td>
            <td className="wishlist-row__actions"> 
                <button
                    onClick={() => dispatch(deleteWishlistItem(item._id))}
                    className="wishlist__btn wishlist__btn--delete"
                >
                    <FaRegTrashCan/>
                </button>
            </td>
        </tr>
    );
};

export default WishlistRow;
