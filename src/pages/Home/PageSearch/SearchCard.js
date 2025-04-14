import React from 'react'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SearchCard.css'
function SearchCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card-product"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-product__image">
                <img
                    src={product.productImage}
                    alt={product.productName}
                    width={120}
                    height={120}
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="card-product__name">
                {product.productName}
            </div>
            <div className="card-product__price">
                ${product.productPrice}
                <span>${product.priceNew}</span>
            </div>
            <div className={product.productDiscountPercentage == 0 ? 'active' : 'card-product__badge'}>
                {product.productDiscountPercentage}%
            </div>
            <a href="#!" className="card-product__add-button">
                + Add
            </a>
            <div className="card-product__hover">
                {isHovered && <CardProductHovered />}
            </div>
        </div>
    );
}
function CardProductHovered() {
    return (
        <div className="card-product-hovered-container">
            <div className="card-product-hovered">
                <FontAwesomeIcon className="fa-heart" icon={faHeart} />
            </div>
        </div>
    );
}
export default SearchCard