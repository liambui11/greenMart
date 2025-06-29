import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardProduct.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../Context/AlertContext";
import { addWishlistItem } from "../../actions/wishlist";
import { addToCart } from "../../actions/cart";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";

function CardProduct({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const cart = useSelector((state) => state.cartReducer.items || []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    navigate(`/productdetail/${item.productSlug}`);
  };

  const handleAddToCard = async () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to cart!");
      return;
    }
    const found = cart.find((i) => i.productID._id === item._id);
    const quantityInCart = found ? found.quantity : 0;

    if (quantityInCart >= item.productStock) {
      showAlert("error", "Exceeds available stock!");
      return;
    }

    try {
      await dispatch(addToCart(item._id));
      showAlert("success", "Added to cart!");
    } catch (err) {
      showAlert("error", err.message);
    }
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
        {item.productStock === 0 ? (
          <MdOutlineRemoveShoppingCart size={"2rem"} />
        ) : (
          <MdOutlineShoppingCart size={"2rem"} />
        )}
      </a>
      <div className="card-product__hover">
        {isHovered && <CardProductHovered item={item} />}
      </div>
    </div>
  );
}

function CardProductHovered(item) {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const wishlist = useSelector((state) => state.wishlistReducer.items || []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddWishList = async () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to wishlist!");
      return;
    }
    const exists = wishlist.some((p) => p.productID._id === item.item._id);
    if (exists) {
      showAlert("warning", "Product already in wishlist!");
      return;
    }

    try {
      await dispatch(addWishlistItem(item.item._id));
      showAlert("success", "Added to wishlist!");
    } catch (err) {
      showAlert("error", err.message);
    }
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
