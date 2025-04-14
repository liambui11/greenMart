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
// import { useNavigate } from "react-router-dom";

function Categories() {
  const { categoriesBannerData } = useContext(NewsContext);
  const [isLoading, setIsLoading] = useState(true);

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

  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://greenmart-api.vercel.app/api/v1/products-category"
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

  console.log(categoriesData);

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
