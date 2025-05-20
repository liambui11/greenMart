import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, updateQuantity } from "../../actions/cart";
import { deleteWishlistItem } from "../../actions/wishlist";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAlert } from "../../Context/AlertContext";
import "./css/WishlistRow.css";

const WishlistRow = ({ item }) => {
    const cart = useSelector(state => state.cartReducer.items);
    const dispatch = useDispatch();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

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

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price * 100) / 100;
        return roundedPrice % 1 === 0 ? roundedPrice.toFixed(0) : roundedPrice.toFixed(2);
    };


    const hasDiscount = item.productDiscountPercentage > 0;
    const discountedPrice = item.productPrice * (1 - item.productDiscountPercentage / 100);

    const goToProductDetail = () => {
        navigate(`/productdetail/${item.productSlug}`);
    };
    
    return (
        <tr className="wishlist-row">
            <td className="wishlist-row__product" onClick={goToProductDetail} style={{ cursor: "pointer" }} >
                <img src={item.productImage} alt={item.productName} className="wishlist__image" />
                {item.productName}
            </td>
            <td className="wishlist-row__price">
                {hasDiscount ? (
                    <>
                        <span className="wishlist__price--old">
                            ${formatPrice(item.productPrice)}
                        </span>
                        <span className="wishlist__price--new">
                            ${formatPrice(discountedPrice)}
                        </span>
                    </>
                ) : (
                    <span className="wishlist__price--regular">
                        ${formatPrice(item.productPrice)}
                    </span>
                )}
            </td>

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
                    <button className="wishlist__btn--contact">Add to Cart</button>
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
