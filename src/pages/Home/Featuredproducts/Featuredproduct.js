import React, { useState, useEffect, useRef } from "react";
import "./Featuredproduct.css";
import { fetchFeaturedproduct } from "./FeaturedproductAPI";
import CardProduct from "../../News/CardProduct";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Featuredproduct() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef(null);

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

  useEffect(() => {
    const handleResize = () => {
      if (itemRef.current && containerRef.current) {
        const itemWidth = itemRef.current.offsetWidth;
        const gap =
          parseInt(window.getComputedStyle(containerRef.current).gap) || 0;
        setCardWidth(itemWidth + gap);
      }
    };
    setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  const visibleCount = 4;
  const page = Math.max(0, products.length - visibleCount);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < page ? prev + 1 : page));
  };

  return (
    <section className="featuredproduct-container">
      <div className="featuredproduct row">
        <div className="featuredproduct--title col-12">
          <h1>
            <strong>Featured Products</strong>
          </h1>
          <div className="featuredproduct__tittle__arrow">
            <div
              onClick={prevSlide}
              className="featuredproduct__tittle__arrow__left"
            >
              <IoIosArrowBack />
            </div>

            <div
              onClick={nextSlide}
              className="featuredproduct__tittle__arrow__right"
            >
              <IoIosArrowForward />
            </div>

            <Link to="/featured" className="featuredproduct__tittle__viewall">
              ViewAll
            </Link>
            <img
              alt=""
              src="/image/bannner/featured-product-sign-round.png"
              className="featuredproduct__sign"
            />
          </div>
        </div>

        <div className="featuredproduct__card__wrapper">
          <div
            className="featuredproduct__card"
            ref={containerRef}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {products.map((item, index) => (
              <div
                key={index}
                className="featuredproduct__card__item"
                ref={index === 0 ? itemRef : null}
              >
                <CardProduct item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featuredproduct;
