import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { removeFromWishlist } from "../../actions/wishlist";
import { FaRegTrashCan } from "react-icons/fa6";
import "./css/WishlistRow.css";

const WishlistRow = ({ item }) => {
    const cart = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if(cart.some(itemCart => itemCart.id === item.info.productID)){
            dispatch(updateQuantity(item.info.productID));
        } else {
            dispatch(addToCart(item.info.productID, item.info));
        }
    }
    
    return (
        <tr className="wishlist-row">
            <td className="wishlist-row__product">
                <img src={item.info.productImage} alt={item.info.productName} className="wishlist__image" />
                {item.info.productName}
            </td>
            <td className="wishlist-row__price">${item.info.productPrice}</td>
            <td className="wishlist-row__status">
                <span
                    className={`wishlist__status ${item.info.productStock > 0 ? "wishlist__status--in-stock" : "wishlist__status--out-stock"}`}
                >
                    {item.info.productStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </td>
            <td className="wishlist-row__button">
                {item.info.productStock > 0 ? (
                    <button className="wishlist__btn--primary" onClick={handleAddToCart}>Add to Cart</button>
                ) : (
                    <button className="wishlist__btn--contact">Contact us</button>
                )}
            </td>
            <td className="wishlist-row__actions"> 
                <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="wishlist__btn wishlist__btn--delete"
                >
                    <FaRegTrashCan/>
                </button>
            </td>
        </tr>
    );
};

export default WishlistRow;
