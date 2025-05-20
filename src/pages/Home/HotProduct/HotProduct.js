import React, { useEffect, useState } from "react";
import "./HotProduct.css";
import { useNavigate } from "react-router-dom";
import { fetchProductCategory, HotProductAPI } from "./HotProductAPI";

function HotProduct() {
  const [productHot, setProductHot] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchProductCategory();
        setProductHot(data.info);
        console.log("Dataaaaaaa", data.info);
      } catch (err) {
        console.error("Lỗi khi lấy category:", err);
      }
    };
    loadCategory();
  }, []);

  const navigate = useNavigate();
  const handleProductdetail = (e, item) => {
    e.preventDefault();
    navigate(`/productdetail/${item.productSlug}`);
  };
  return (
    <div className="Hotproduct-container">
      <div className="hotproduct row">
        <div className="hotproduct__Tittle">
          <h1>
            <strong>Hot Products Of Week</strong>
          </h1>
        </div>

        <div className="hotproduct__Card">
          {productHot.slice(3, 5).map((item, index) => (
            <div key={index} className="hotproduct__Card__item">
              <img
                alt=""
                className="hotproduct__Card__item__img"
                src={item.productImage}
              />
              <div className="hotproduct__Card__item__title">
                <h4>Shocking discount of {item.productDiscountPercentage}%</h4>
                <h1>{item.productName}</h1>
                <p>{item.productDescription}</p>
                <button
                  type="button"
                  onClick={(e) => handleProductdetail(e, item)}
                >
                  Go Now{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotProduct;
