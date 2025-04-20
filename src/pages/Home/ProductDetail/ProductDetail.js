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

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleClick =()=>{
    navigate(`/categorydetail/${productdetail?.category?.categorySlug}`,{
        state: productdetail.category
    });
  }

  const [quantity, setQuantity] = useState(1);
  const [productdetail, setProductdetail] = useState([]);
  const location = useLocation();
  const product = location.state?.item;
  const cartItems = useSelector((state) => state.cartReducer.items);
  const wishlistItems = useSelector((state) => state.wishlistReducer.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  console.log(`product:${product}`);
  const url = "https://localhost3000/api/v1/products/detail/";

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${url}${product?.productSlug}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProductdetail(data.info);
      } catch (error) {
        console.error('Fetch product detail failed:', error);
      }
    };
  
    fetchProductDetail();
  }, []);
  

  const handleSubtract = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
  const handlePlus = () => {
    setQuantity((prevQuantity) =>{
      if(prevQuantity<product?.productStock){
        return prevQuantity + 1;
      }
      else{
        return prevQuantity;
      }
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to cart!");
      return;
    }
    const existingItem = cartItems.find((i) => i.productID._id === product._id);
    const currentQuantity = existingItem?.quantity || 0;

    if (currentQuantity + quantity > product.productStock) {
      showAlert("error", "Quantity in cart exceeds stock.");
      return;
    }

    dispatch(addToCart(product._id, quantity));
    showAlert("success", "Added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      showAlert("error", "Please login to add items to wishlist!");
      return;
    }
  
    const exists = wishlistItems.find((i) => i.productID._id === product._id);
    if (exists) {
      showAlert("warning", "Product already exists in wishlist!");
    } else {
      dispatch(addWishlistItem(product._id));
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
              <Link>{product?.productName}</Link>
            </li>
          </ul>
        </div>
        <div className="ProductDetail row">
          <div className="imgSectionMain">
            <img src={product?.productImage} alt="" />
            <p className={product?.productDiscountPercentage===0 ? 'active':'discount'}>
              {product?.productDiscountPercentage}
              <MdOutlinePercent />
            </p>
          </div>
          <div className="contentSectionMain">
            <h1>{product?.productName}</h1>
            <hr />

            <div className="price">
              <p>Price:</p>
              <p className="Promotional"> {product?.productPrice} </p>
              <p className="List">${product?.priceNew}</p>
            </div>

            <div className="availability">
              <p>
                <span>In Stock:</span>
                {product?.productStock}
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
              {
                product?.productStock>0?
                  (<button className="btnAdd" onClick={handleAddToCart} type="button">
                    <i className="fa-solid fa-plus"></i>
                    Add to Cart
                  </button>)
                :
                (<button className="btnOutofStock" type="button">
                  Out of Stock
                </button>)
              }
              <div className="ProductDetail__heart">
                <div>
                  <FaRegHeart
                   onClick={handleAddToWishlist}
                   />
                </div>
              </div>
            </div>

            <div className="describe">
              <p>
                Describe:
                <span>{product?.productDescription}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProductDetail;
