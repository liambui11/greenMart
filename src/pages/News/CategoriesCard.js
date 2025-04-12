import { useNavigate } from "react-router-dom";
import "./CategoriesCard.css";

function CategoriesCard({ item }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { item },
    });
  };


  return (
    <div className="categories-card-container">
      <div className="categories-card" onClick={handleClick}>
        <div>
          <img
            className="categories-card__image"
            src={item.categoryImage}
            alt={item.categoryName}
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </div>
        <div className="categories-card__name">{item.categoryName}</div>
      </div>
    </div>
  );
}

export default CategoriesCard;
