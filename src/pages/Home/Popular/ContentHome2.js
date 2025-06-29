import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import "./ContentHome.css";
import { fetchPopular } from "./PopularAPI";
import Pagination from "./Pagination";
import CardProduct from "../../News/CardProduct";

function ContentHome2() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchPopular();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    loadProducts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  return (
    <section className="Popular">
      <div className="container">
        <div className="popular row">
          <div className="popular--title col-12">
            <h1>
              <strong>New Products</strong>
            </h1>
          </div>
          <div className="newproduct-banner">
            <div className="newproduct-banner-note">
              New products have just hit the shelves.
            </div>
            <img alt="" src="/image/bannner/new-product.png" />
          </div>
          <div className="popular__Card">
            {currentPosts.map((item, index) => (
              <div key={index} className="popular__Card__item">
                <CardProduct item={item} />
              </div>
            ))}
          </div>
          <div className="popular--pagination">
            <Pagination
              totalPosts={products.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContentHome2;
