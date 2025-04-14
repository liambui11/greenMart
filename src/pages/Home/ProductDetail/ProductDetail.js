import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ProductDetail.css";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlinePercent } from "react-icons/md";

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [quantity, setQuantity] = useState(0);

  const [productdetail, setProductdetail] = useState([]);
  const location = useLocation();
  const product = location.state?.item;

  console.log(`product:${product}`);
  const url = "https://greenmart-api.vercel.app/api/v1/products/detail/";

  useEffect(() => {
    fetch(`${url}${product?.productSlug}`)
      .then((res) => res.json())
      .then((data) => {
        setProductdetail(data.info);
      });
  }, []);

  const handleSubtract = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
  const handlePlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <nav>
      <div className="container">
        <div className="topSectionMain">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
            </li>
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <i class="fa-solid fa-angle-right"></i>
            </li>
            <li>
              <a>{product?.productName}</a>
            </li>
          </ul>
        </div>
        <div className="ProductDetail row">
          <div className="imgSectionMain">
            <img src={product?.productImage} alt="" />
            <p className="discount">
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

              <p>
                <span>Type:</span>
                {productdetail?.category?.categorySlug}
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
              <button className="btnAdd" type="button">
                <i className="fa-solid fa-plus"></i>
                Add to Cart
              </button>
              <div className="ProductDetail__heart">
                <a href="#">
                  {/* <i className="fa-regular fa-heart"></i> */}
                  <FaRegHeart />
                </a>
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
