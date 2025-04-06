import {useDispatch, useSelector} from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { addToWishlist } from "../../actions/wishlist";
import React from 'react';

function ProductItem(props) {
    const {item} = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer);
    const wishlist = useSelector(state => state.wishlistReducer);

    const handleAddToCart = () => {
        if(cart.some(itemCart => itemCart.id === item.productID)){
            dispatch(updateQuantity(item.productID));
        } else {
            dispatch(addToCart(item.productID, item));
        }
    }

    const handleAddToWishlist = () => {
        if (!wishlist.some(wishlistItem => wishlistItem.productID === item.productID)) {
            dispatch(addToWishlist(item.productID, item));
        } else {
            alert("Sản phẩm đã có trong danh sách yêu thích!");
        }
    };

    return (
        <>
            <div className="product__item" key={item.productID}>
                <img className="product__image" src={item.productImage} alt={item.productName} />
                <h3 className="product__title">{item.productName}</h3>
                <div className="product__price">
                    {item.productPrice}$
                </div>
                <div className="product__stock">
                   còn lại {item.productStock}
                </div>
                <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                <button onClick={handleAddToWishlist}>❤️ Thêm vào yêu thích</button>
            </div>
        </>
    )
}

export default React.memo(ProductItem);