import React, { useState, useEffect } from "react";
import "./Featuredproductviewall.css";
import { useParams, Link } from "react-router-dom";
// import { FaSortAmountUp } from "react-icons/fa";
// import { FaSortAmountDown } from "react-icons/fa";
import CardProduct from "../../News/CardProduct";
import Pagination from "../Popular/Pagination";
import { IoIosArrowForward } from "react-icons/io";
import {
  fetchFeaturedproduct,
  // fetchProductsByName,
  // fetchProductsByPriceAscending,
  // fetchProductsByPriceDescending,
  // fetchProductsByPromotion,
} from "./FeaturedproductAPI";

function Featuredproductviewall() {
  // const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(16);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeaturedproduct();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="pageSearch-container">
      <div className="pageSearch__Tittle">
        <Link to="/">Home</Link>
        <IoIosArrowForward /> featured products
      </div>
      <div className="pagesearch-img">
        <p>Featured Products</p>
        <img src="/image/slideshow/online-shopping.png" alt="" />
      </div>
      <div className="pageSearch__info"></div>
      <div className="productList">
        {currentPosts.map((product) => (
          <div key={product._id} className="productItem">
            <CardProduct item={product} />
          </div>
        ))}
      </div>
      <div className="search--pagination">
        <Pagination
          totalPosts={products.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Featuredproductviewall;
