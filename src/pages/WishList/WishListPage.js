import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearWishlist } from "../../actions/wishlist";
import { FaRegTrashCan } from "react-icons/fa6";
import WishlistTable from "./WishlistTable";
import "./css/WishListPage.css";

const WishlistPage = () => {
    const wishlist = useSelector((state) => state.wishlistReducer);
    const dispatch = useDispatch();
    return (
        <div className="container wishlist-page">
            <h3 className="wishlist__title">My Wishlist</h3>
            <div className="row">
                <div className="col-lg-12">
                    <div className="wishlist__header">
                        <h6 className="wishlist__count">There are <span>{wishlist.length}</span> products in this wishlist.</h6>
                        <button
                            onClick={() => dispatch(clearWishlist())}
                            className="wishlist__btn wishlist__btn--delete"
                        >
                            <FaRegTrashCan/> Clear All
                        </button>
                    </div>
                    <WishlistTable wishlist={wishlist} />
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
