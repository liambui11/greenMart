import "./CategoryDetail.css";
import { LuChartBarDecreasing, LuChartBarIncreasing } from "react-icons/lu";
import { MdOutlineSell } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import CardProduct from "../../pages/News/CardProduct";
import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../Context/NewsContext";
import { useParams, useLocation } from "react-router-dom";

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

function CategoryDetail() {
  const list = ["Beef", "Chicken", "Pork", "Duck", "Rabbit", "Veal", "Fish"];

  const filterOptions = [
    { Icon: <LuChartBarIncreasing />, Description: "Price: Low to High" },
    { Icon: <LuChartBarDecreasing />, Description: "Price: High to Low" },
    { Icon: <MdOutlineSell />, Description: "Best Selling" },
    { Icon: <TbChartBarPopular />, Description: "Most Popular" },
  ];

  // const { cardProductsData } = useContext(NewsContext);

  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCategory, resProducts] = await Promise.all([
          fetch("https://greenmart-api.vercel.app/api/v1/products-category"),
          fetch("https://greenmart-api.vercel.app/api/v1/products"),
        ]);

        const categoryJson = await resCategory.json();
        const productsJson = await resProducts.json();

        setCategoryData(categoryJson.info);
        setProductData(productsJson.info);
      } catch (err) {
        console.error("Lỗi fetch:", err);
      }
    };

    fetchData();
  }, []);

  // const { categorySlug } = useParams();
  const location = useLocation();
  const categoryID = location.state?.id;

  const currentCategory = categoryData.find((item) => item._id === categoryID);
  console.log(currentCategory);

  const productList = productData.filter(
    (item) => item.categoryID === categoryID
  );
  console.log(productList);

  return (
    <div className="category-detail-container">
      <div className="category-detail">
        <div
          className="category-detail__title"
          style={{
            backgroundImage: `url(${currentCategory?.categoryImage})`,
          }}
        >
          {currentCategory?.categoryName}
        </div>
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
            {productList.length > 0 ? (
              productList.map((item) => (
                <CardProduct key={item._id} item={item} />
              ))
            ) : (
              <p style={{color: "#2d6a4f", fontWeight: "600", fontSize: "15px"}}>Không có sản phẩm nào!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;
