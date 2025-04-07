import "./CategoryDetail.css";
import { LuChartBarDecreasing, LuChartBarIncreasing } from "react-icons/lu";
import { MdOutlineSell } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import CardProduct from "../News/CardProduct";
import { useContext } from "react";
import { NewsContext } from "../../Context/NewsContext";

function SubCategory({ item }) {
  return (
    <div className="sub-category-container">
      <div className="sub-category">
        <div className="sub-category__item">{item}</div>
      </div>
    </div>
  );
}

function SortByItem({ item }) {
  return (
    <div className="sort-by-item-container">
      <div className="sort-by-item">
        <div className="sort-by-item__icon">{item.Icon}</div>
        <div className="sort-by-item__description">{item.Description}</div>
      </div>
    </div>
  );
}

function CategoryDetail({ title = "Category Title" }) {
  const list = [
    "Beef",
    "Chicken",
    "Pork",
    "Duck",
    "Rabbit",
    "Veal",
    "Fish",
    // "Pigeon Meat",
    // "Beef",
    // "Chicken",
    // "Pork",
    // "Duck",
    // "Rabbit",
    // "Veal",
    // "Fish",
    // "Pigeon Meat",
    // "Rabbit",
    // "Veal",
    // "Fish",
    // "Pigeon Meat",
  ];

  const filterOptions = [
    { Icon: <LuChartBarIncreasing />, Description: "Price: Low to High" },
    { Icon: <LuChartBarDecreasing />, Description: "Price: High to Low" },
    { Icon: <MdOutlineSell />, Description: "Best Selling" },
    { Icon: <TbChartBarPopular />, Description: "Most Popular" },
  ];

  const { cardProductsData } = useContext(NewsContext);

  return (
    <div className="category-detail-container">
      <div className="category-detail">
        <div className="category-detail__title">{title}</div>
        <div className="category-detail__sublist">
          {list.map((item, index) => (
            <SubCategory key={item} item={item} />
          ))}
        </div>
        <div className="category-detail__list-item">
          <div className="list-item__sort">
            <div className="sort__number-item">32 Products found</div>
            <div className="sort__title">Sort By</div>
            <div className="sort__options">
              {filterOptions.map((item, index) => (
                <SortByItem item={item} key={index} />
              ))}
            </div>
          </div>
          <div className="list-item__items">
            {cardProductsData.map((item, index) => (
              <CardProduct key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;
