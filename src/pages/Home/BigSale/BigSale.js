import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import "./BigSale.css";
// import { fetchPopular } from "./PopularAPI";
import Pagination from "../Popular/Pagination";
import CardProduct from "../../News/CardProduct";
import OverlayLoading from "../../../components/OverlayLoading/OverlayLoading";

function ContentHome2() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = "http://localhost:3000/api/v1/products";

  //   useEffect(() => {
  //     const loadProducts = async () => {
  //       try {
  //         const data = await fetchPopular();
  //         setProducts(data);
  //       } catch (err) {
  //         console.error("Lỗi khi lấy sản phẩm:", err);
  //       }
  //     };
  //     loadProducts();
  //   }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      //   setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}?limitItems=8&sortKey=productDiscountPercentage&sortValue=desc`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.info);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="BigSale-container">
      <div className="bigsale row">
        <div className="bigsale--title col-12">
          <h1>
            <strong>BIG SALE PRODUCTS</strong>
          </h1>
        </div>
        <div className="bigsale__card">
          {currentPosts.map((item, index) => (
            <div key={index} className="bigsale__card__item">
              <CardProduct item={item} />
            </div>
          ))}
        </div>
        {/* <div className="bigsale--pagination">
            <Pagination
              totalPosts={products.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div> */}
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default ContentHome2;
