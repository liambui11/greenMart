import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardProduct.css";

function CardProduct({item}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card-product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-product__image">
        <img
          src={item.imageSrc}
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
        ${item.originalPrice}
        <span>${item.discountedPrice}</span>
      </div>
      <div className="card-product__badge">
        {item.saleBadge}%
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

export default CardProduct;
