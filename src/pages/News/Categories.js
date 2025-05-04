import CategoriesCard from "./CategoriesCard";
import CategoriesBanner from "./CategoriesBanner";
import { useContext, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewsContext } from "../../Context/NewsContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Title from "./Title";
import "swiper/css";
import "swiper/css/navigation";
import "./Categories.css";

import { Navigation, Autoplay } from "swiper/modules";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading";

function Categories() {
  const { categoriesBannerData } = useContext(NewsContext);
  const [isLoading, setIsLoading] = useState(true);

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/products-category"
        );
        const json = await res.json();
        setCategoriesData(json.info);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (
      swiperRef.current?.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [categoriesData]);

  return (
    <div className="categories-container">
      <div className="categories">
        <div className="categories__title">
          <Title title="Featured Categories" />
          <div className="categories__navigation">
            <div ref={prevRef} className="pre-chevron swiper-nav-button">
              <FaChevronLeft />
            </div>
            <div ref={nextRef} className="next-chevron swiper-nav-button">
              <FaChevronRight />
            </div>
          </div>
        </div>

        <Swiper
          ref={swiperRef}
          className="categories__cards"
          slidesPerView="auto"
          spaceBetween={13}
          loop={categoriesData.length > 2} 
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Autoplay, Navigation]}
        >
          {categoriesData.map((item) => (
            <SwiperSlide key={item._id} style={{ width: "200px" }}>
              <CategoriesCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="categories__banner">
          {categoriesBannerData.map((item, index) => (
            <CategoriesBanner key={index} item={item} />
          ))}
        </div>

        {isLoading && <OverlayLoading />}
      </div>
    </div>
  );
}

export default Categories;
