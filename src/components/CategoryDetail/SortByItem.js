import "./SortByItem.css";

function SortByItem({ item, isActive, onClick }) {
  return (
    <div className="sort-by-item-container">
      <div
        className={`sort-by-item ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="sort-by-item__icon">{item.Icon}</div>
        <div className="sort-by-item__description">{item.Description}</div>
      </div>
    </div>
  );
}

export default SortByItem;
