import ShopNowButton from "./ShopNowButton";
import "./CategoriesBanner.css";

function CategoriesBannerContent({ item }) {
  return (
    <div className="categories-banner-content-container">
      <div className="categories-banner-content">
        <div className="banner-content__title">{item.title}</div>
        <div className="banner-content__detail">{item.details}</div>
        <div className="banner-content__button">
          <ShopNowButton />
        </div>
      </div>
    </div>
  );
}

function CategoriesBanner({ item }) {
  return (
    <div className="categories-banner-container">
      <div className="categories-banner">
        <div className="categories-banner-image">
          <img
            src={item.imageSrc}
            alt="Banner"
            height={210}
            style={{ objectFit: "cover" }}
          />
        </div>
        <CategoriesBannerContent item={item} />
      </div>
    </div>
  );
}

export default CategoriesBanner;
