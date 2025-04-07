import "./CategoriesCard.css";

function CategoriesCard({ item }) {
  return (
    <div className="categories-card-container">
      <a className="categories-card" href={item.productLink}>
        <div>
          <img
            className="categories-card__image"
            src={item.imageSrc}
            alt={item.categoriesTitle}
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="categories-card__name">{item.categoriesTitle}</div>
        <div className="categories-card__quantity">
          {item.categoriesQuantity}{" "}
          {item.categoriesQuantity === 1 ? "Item" : "Items"}
        </div>
      </a>
    </div>
  );
}

export default CategoriesCard;
