import { NavLink, useNavigate } from "react-router-dom";
import "./CategoriesCard.css";

function CategoriesCard({ item }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { id: item._id },
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
          />
        </div>
        <div className="categories-card__name">{item.categoryName}</div>
        <div className="categories-card__quantity">
          {item.categoriesQuantity}{" "}
          {item.categoriesQuantity === 1 ? "Item" : "Items"}
        </div>
      </div>
    </div>
  );
}

export default CategoriesCard;
