import React from 'react'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link } from 'react-router-dom';
import './PopularCard.css'
function PopularCard({ item }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to="productdetail"
            className="card-product"
            state={{ product: item }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                // Ngăn việc chuyển trang nếu click vào nút + Add
                if (e.target.closest('.card-product__add-button') ||
                    e.target.closest('.card-product-hovered-container')) {
                    e.preventDefault();
                }
            }}
        >
            <div className="card-product__image">
                <img
                    src={item.productImage}
                    alt={item.productName}
                    width={120}
                    height={120}
                    style={{ objectFit: "contain" }}
                />
            </div>
            <div className="card-product__name">
                {item.productName}
            </div>
            <div className="card-product__price">
                ${item.productPrice}
                <span>${item.priceNew}</span>
            </div>
            {/* <div className="card-product__badge"> */}
            <div className={item.productDiscountPercentage == 0 ? 'active' : 'card-product__badge'}>
                {item.productDiscountPercentage}%
            </div>
           
            <button type="button" className="card-product__add-button">
                + Add
            </button>
            <div className="card-product__hover">
                {isHovered && <CardProductHovered />}
            </div>
        </Link>
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

export default PopularCard