import CategoriesCard from "./CategoriesCard";
import CategoriesBanner from "./CategoriesBanner";
import { useContext, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewsContext } from "../../Context/NewsContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Title from "./Title";
import "swiper/css";
import "swiper/css/navigation";
import "./Categories.css";

import { Navigation, Autoplay } from "swiper/modules";

function Categories() {
  const { categoriesData, categoriesBannerData } = useContext(NewsContext);

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
    <div className="categories-container">
      <div className="categories">
        <div className="categories__title">
          <Title title="Featured Categories" />
          <div className="categories__navigation">
            <FaChevronLeft ref={prevRef} className="pre-chevron" />
            <FaChevronRight ref={nextRef} className="next-chevron" />
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          className="categories__cards"
          slidesPerView="auto"
          spaceBetween={13}
          // centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
        >
          {categoriesData.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "200px" }}>
              <CategoriesCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="categories__banner">
          {categoriesBannerData.map((item, index) => (
            <CategoriesBanner key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
