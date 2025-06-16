import { useEffect, useState } from "react";
import "./SaleOffer.css";
import { useNavigate } from "react-router-dom";

function SaleOffer() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topSaleProducts, setTopSaleProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTopProduct = await fetch(
          `${apiUrl}/api/v1/products?currentPage=1&limitItems=3&sortKey=productDiscountPercentage&sortValue=desc`
        );
        const jsonTopProduct = await resTopProduct.json();
        setTopSaleProducts(jsonTopProduct.info);
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchData();
  }, [apiUrl]);
  console.log(topSaleProducts);
  return (
    <div className="sale-offer-container">
      <div className="sale-offer">
        <div className="sale-offer__title">
          <div className="sale-offer__title--image">
            <img
              alt=""
              src="https://res.cloudinary.com/doaswiru0/image/upload/v1746437062/312366d93228b0a0a837c090efc6b740_vmcf99.png"
            />
          </div>
          <div className="sale-offer__title--name">
            <span style={{ color: "#37723a" }}>DON'T MISS OUT</span>
            <span style={{ color: "#eab84b" }}>FRESH DEALS JUST DROPPED</span>
          </div>
        </div>
        <div className="sale-offer__cards">
          {topSaleProducts.map((item) => (
            <div key={item._id} className="sale-offer__cards-container">
              <div className="sale-offer-card__tag">
                {item.productDiscountPercentage}%
              </div>
              <div className="sale-offer-card__image">
                <img alt={item.productName} src={item.productImage} />
              </div>
              <div className="sale-offer-card__name">{item.productName}</div>
              <div className="sale-offer-card__description">
                {item.productDescription}
              </div>
              <div className="sale-offer-card__price">
                <span style={{ color: "#db3030", marginRight: "1.5rem" }}>
                  ${item.priceNew}
                </span>
                <span style={{ textDecoration: "line-through" }}>
                  ${item.productPrice}
                </span>
              </div>
              <div
                className="sale-offer-card__button"
                onClick={() => navigate(`/productdetail/${item.productSlug}`)}
              >
                Shop Now
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SaleOffer;
