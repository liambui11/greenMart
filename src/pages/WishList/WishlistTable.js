import React from "react";
import WishlistRow from "./WishlistRow";
import "./css/WishlistTable.css";

const WishlistTable = ({ wishlist }) => {
    return (
        <div className="wishlist__table-wrapper">
            <table className="wishlist__table">
                <thead className="wishlish-table__header">
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist.map((item) => (
                        <WishlistRow key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishlistTable;
