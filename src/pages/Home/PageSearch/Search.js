import React, { useState, useEffect } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import CardProduct from "../../News/CardProduct";

import {
  fetchProducts,
  fetchProductsByName,
  fetchProductsByPriceAscending,
  fetchProductsByPriceDescending,
  fetchProductsByPromotion,
} from "./SearchAPI";

function Search() {
  const { query } = useParams();
  const [activeSort, setActiveSort] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(query);
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    loadProducts();
  }, [query]);

  const handleSort = async (sortFunc, sortKey) => {
    try {
      const data = await sortFunc(query);
      setProducts(data);
      setActiveSort(sortKey);
    } catch (err) {
      console.error("Lỗi khi sắp xếp sản phẩm:", err);
    }
  };
  return (
    <div className="pageSearch-container">
      <div className="pageSearch__Tittle">
        <IoHome size={20} /> HOME / {query}
      </div>
      <div className="pageSearch__info">
        <div className="pageSearch__Filter">
          <div className="pageSearch__Filter__content">Sort Product</div>

          <button
            className={`pageSearch__Filter__btn ${activeSort === "asc" ? "active" : ""}`}
            onClick={() => handleSort(fetchProductsByPriceAscending, "asc")}
          >
            <FaSortAmountUp />
            Ascending
          </button>
          <button
            className={`pageSearch__Filter__btn ${activeSort === "desc" ? "active" : ""}`}
            onClick={() => handleSort(fetchProductsByPriceDescending, "desc")}
          >
            <FaSortAmountDown />
            Descending
          </button>
          <button
            onClick={() => handleSort(fetchProductsByName, "name")}
            className={`pageSearch__Filter__btn ${activeSort === "name" ? "active" : ""}`}
          >
            By Name
          </button>
          <button
            onClick={() => handleSort(fetchProductsByPromotion, "promotion")}
            className={`pageSearch__Filter__btn ${activeSort === "promotion" ? "active" : ""}`}
          >
            By Promition
          </button>
        </div>
      </div>
      <div className="productList">
        {products.map((product) => (
          <div key={product._id} className="productItem">
            <CardProduct item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
