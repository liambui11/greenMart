import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ProductDetail.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlinePercent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import { useAlert } from "../../../Context/AlertContext";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams(); // lấy slug từ URL

  const [quantity, setQuantity] = useState(1);
  const [productdetail, setProductdetail] = useState(null);

  const cartItems = useSelector((state) => state.cartReducer.items);
  const wishlistItems = useSelector((state) => state.wishlistReducer.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const url = "http://localhost:3000/api/v1/products/detail/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${url}${productSlug}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data.info);
        setProductdetail(data.info);
      } catch (error) {
        console.error("Fetch product detail failed:", error);
      }
    };

    if (productSlug) fetchProductDetail();
  }, [productSlug]);

  const handleClick = () => {
    navigate(`/categorydetail/${productdetail?.category?.categorySlug}`);
  };

  const handleSubtract = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handlePlus = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < productdetail?.productStock) {
        return prevQuantity + 1;
      } else {
        return prevQuantity;
      }
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to cart!");
      return;
    }

    const existingItem = cartItems.find(
      (i) => i.productID._id === productdetail._id
    );
    const currentQuantity = existingItem?.quantity || 0;

    if (currentQuantity + quantity > productdetail.productStock) {
      showAlert("error", "Quantity in cart exceeds stock.");
      return;
    }

    dispatch(addToCart(productdetail._id, quantity));
    showAlert("success", "Added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to wishlist!");
      return;
    }

    const exists = wishlistItems.find(
      (i) => i.productID._id === productdetail._id
    );
    if (exists) {
      showAlert("warning", "Product already exists in wishlist!");
    } else {
      dispatch(addWishlistItem(productdetail._id));
      showAlert("success", "Added to wishlist!");
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="topSectionMain">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <i className="fa-solid fa-angle-right"></i>
            </li>
            <li>
              <Link>{productdetail?.productName}</Link>
            </li>
          </ul>
        </div>
        <div className="ProductDetail row">
          <div className="imgSectionMain">
            <img src={productdetail?.productImage} alt="" />
            <p
              className={
                productdetail?.productDiscountPercentage === 0
                  ? "active"
                  : "discount"
              }
            >
              {productdetail?.productDiscountPercentage}
              <MdOutlinePercent />
            </p>
          </div>
          <div className="contentSectionMain">
            <h1>{productdetail?.productName}</h1>
            <hr />

            <div className="price">
              <p>Price:</p>
              <p className="Promotional"> {productdetail?.priceNew} </p>
              <p className="List">${productdetail?.productPrice}</p>
            </div>

            <div className="availability">
              <p>
                <span>In Stock:</span>
                {productdetail?.productStock - quantity}
              </p>

              <p onClick={handleClick}>
                <span>Type:</span>
                {productdetail?.category?.categoryName}
              </p>
            </div>

            <div className="Quantity">
              <button
                type="button"
                className="subtract"
                onClick={handleSubtract}
              >
                -
              </button>
              <div className="Quantity__num">{quantity}</div>
              <button type="button" className="plus" onClick={handlePlus}>
                +
              </button>
            </div>

            <div className="btnAddHeart">
              {productdetail?.productStock > 0 ? (
                <button
                  className="btnAdd"
                  onClick={handleAddToCart}
                  type="button"
                >
                  <i className="fa-solid fa-plus"></i>
                  Add to Cart
                </button>
              ) : (
                <button className="btnOutofStock" type="button">
                  Out of Stock
                </button>
              )}
              <div className="ProductDetail__heart">
                <div>
                  <FaRegHeart onClick={handleAddToWishlist} />
                </div>
              </div>
            </div>

            <div className="describe">
              <p>
                Describe:
                <span>{productdetail?.productDescription}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductDetail;
