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
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [productdetail, setProductdetail] = useState(null);

  const cartItems = useSelector((state) => state.cartReducer.items);
  const wishlistItems = useSelector((state) => state.wishlistReducer.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const url = `${process.env.REACT_APP_API_URL}/api/v1/products/detail/`;

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

  const handleAddToCart = async () => {
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

    try {
      await dispatch(addToCart(productdetail._id, quantity));
      showAlert("success", "Added to cart!");
    } catch (err) {
      showAlert("error", err.message);
    }
  };

  const handleAddToWishlist = async () => {
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
      try {
        await dispatch(addWishlistItem(productdetail._id));
        showAlert("success", "Added to wishlist!");
      } catch (err) {
        showAlert("error", err.message);
      }
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
              <IoIosArrowForward className="topSectionMain-icon" />
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
              <p className="price-label">Price:</p>
              <p className="Promotional"> ${productdetail?.priceNew} </p>
              {productdetail?.productDiscountPercentage !== 0 && (
                <p className="List">${productdetail?.productPrice}</p>
              )}
            </div>

            <div className="availability">
              <p className="availability-stock-status">
                <span>In Stock:</span>
                {Math.max(0, productdetail?.productStock)}
              </p>

              <p onClick={handleClick} className="availability-type">
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
                <FaMinus />
              </button>
              <div className="Quantity__num">{quantity}</div>
              <button type="button" className="plus" onClick={handlePlus}>
                <FaPlus />
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
                <div onClick={handleAddToWishlist}>
                  <FaRegHeart />
                </div>
              </div>
            </div>

            <div className="describe">
              <p className="describe-label">
                Describe:
                <span className="describe-content">
                  {productdetail?.productDescription}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductDetail;
