import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardProduct.css";
import { useNavigate } from "react-router-dom";
import { RiProhibited2Line } from "react-icons/ri";

function CardProduct({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/productdetail/${item.productSlug}`, {
      state: { item },
    });
  };

  const handleAddToCard = () => {
    console.log("add to cart");
  };

  return (
    <div
      className="card-product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="card-product__image">
        <img
          src={item?.productImage}
          alt={item?.productName}
          width={120}
          height={120}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="card-product__name">{item?.productName}</div>
      <div className="card-product__price">
        ${item?.priceNew}
        {item?.priceNew === item?.productPrice ? null : (
          <span>${item?.productPrice}</span>
        )}
      </div>
      {item?.productDiscountPercentage === 0 ? null : (
        <div className="card-product__badge">
          {item?.productDiscountPercentage}%
        </div>
      )}
      <a
        href="#!"
        className={`card-product__add-button ${
          item.productStock === 0 ? "out-of-stock" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (item.productStock === 0) return;
          handleAddToCard();
        }}
      >
        {item.productStock === 0 ? <RiProhibited2Line /> : "+ Add"}
      </a>
      <div className="card-product__hover">
        {isHovered && <CardProductHovered />}
      </div>
    </div>
  );
}

function CardProductHovered() {
  const handleAddWishList = () => {
    console.log("add wishlist");
  };
  return (
    <div className="card-product-hovered-container">
      <div className="card-product-hovered">
        <FontAwesomeIcon
          className="fa-heart"
          icon={faHeart}
          onClick={(e) => {
            e.stopPropagation();
            handleAddWishList();
          }}
        />
      </div>
    </div>
  );
}

export default CardProduct;
