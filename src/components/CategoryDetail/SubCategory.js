import { useNavigate } from "react-router-dom";
import "./SubCategory.css";

function SubCategory({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/categorydetail/${item.categorySlug}`, {
      state: { item },
    });
  };
  return (
    <div className="sub-category-container">
      <div className="sub-category" onClick={handleClick}>
        <div className="sub-category__item">{item.categoryName}</div>
      </div>
    </div>
  );
}

export default SubCategory;
