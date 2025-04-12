import "./SubCategory.css"

function SubCategory({ item }) {
  return (
    <div className="sub-category-container">
      <div className="sub-category">
        <div className="sub-category__item">{item.categoryName}</div>
      </div>
    </div>
  );
}

export default SubCategory;
