import { useContext, useRef, useEffect, useState } from "react";
import { NewsContext } from "../../Context/NewsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "./Title";
import "./DailyBestSales.css";
import "swiper/css";
import "swiper/css/navigation";
import CardProduct from "./CardProduct";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonCardProduct from "./SkeletonCardProduct";

import { Autoplay, Navigation } from "swiper/modules";

function PopularProducts() {
  const { PopularProductsBannerData } = useContext(NewsContext);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resProducts = await fetch(
          `http://localhost:3000/api/v1/products`
        );

        const productsJson = await resProducts.json();
        setProductsData(productsJson.info);
      } catch (err) {
        console.error("Lỗi fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (swiperRef.current?.swiper && prevRef.current && nextRef.current) {
        const swiper = swiperRef.current.swiper;
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div className="daily-best-sales-container">
      <div className="daily-best-sales">
        <div className="daily-best-sales__title">
          <Title title="Daily Best Sales" />
        </div>
        <div className="daily-best-sales__cards">
          <Swiper
            className="daily-best-sales__cards--banner"
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {PopularProductsBannerData.map((index) => (
              <SwiperSlide key={index}>
                <img alt="" src={index} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            ref={swiperRef}
            className="daily-best-sales__cards--product"
            slidesPerView="auto"
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            style={{ marginLeft: "5rem" }}
          >
            {isLoading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ minWidth: "23rem", maxWidth: "33%" }}
                    >
                      <SkeletonCardProduct />
                    </SwiperSlide>
                  ))
              : productsData.slice(0, 5).map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ minWidth: "23rem", maxWidth: "33%" }}
                  >
                    <CardProduct item={item} />
                  </SwiperSlide>
                ))}
          </Swiper>
          <div className="daily-best-sales__cards--navigation">
            <FaChevronLeft ref={prevRef} className="pre-chevron" />
            <FaChevronRight ref={nextRef} className="next-chevron" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
