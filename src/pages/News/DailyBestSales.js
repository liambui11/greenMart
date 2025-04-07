import { useContext, useRef, useEffect } from "react";
import { NewsContext } from "../../Context/NewsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "./Title";
import "./DailyBestSales.css";
import "swiper/css";
import "swiper/css/navigation";
import CardProduct from "./CardProduct";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Autoplay, Navigation } from "swiper/modules";

function PopularProducts() {
  const { PopularProductsBannerData, PopularProductsCardData } =
    useContext(NewsContext);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

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
          >
            {PopularProductsCardData.map((item, index) => (
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
