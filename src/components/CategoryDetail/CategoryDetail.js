import "./CategoryDetail.css";
import { LuChartBarDecreasing, LuChartBarIncreasing } from "react-icons/lu";
import { MdOutlineSell } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import CardProduct from "../../pages/News/CardProduct";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SubCategory from "./SubCategory";
import SortByItem from "./SortByItem";
import SkeletonCardProduct from "../../pages/News/SkeletonCardProduct";
import SkeletonSubCategory from "./SkeletonSubCategory";

function CategoryDetail() {
  const [productsData, setProductsData] = useState([]);
  const [productsPagination, setProductsPagination] = useState([]);
  const [categoryTree, setCategoryTree] = useState();
  const [sortOption, setSortOption] = useState({
    sortKey: "productPosition",
    sortValue: "desc",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { categorySlug } = useParams();
  const location = useLocation();
  const currentCategory = location.state?.item;

  useEffect(() => {
    setIsLoading(true);
    setProductsData([]);

    const fetchData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          fetch(
            `https://greenmart-api.vercel.app/api/v1/products/${categorySlug}?sortKey=${sortOption.sortKey}&sortValue=${sortOption.sortValue}`
          ),
          fetch(
            `https://greenmart-api.vercel.app/api/v1/products-category/categorytree/${categorySlug}`
          ),
        ]);

        const productsJson = await resProducts.json();
        const categoriesJson = await resCategories.json();

        setProductsData(productsJson.info);
        setProductsPagination(productsJson.pagination);
        setCategoryTree(categoriesJson.info);
      } catch (err) {
        console.error("Lỗi fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, sortOption]);

  const getSubCategoryList = (nodes) => {
    let result = [];

    nodes.forEach((node) => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        const childList = getSubCategoryList(node.children);
        result = result.concat(childList);
      }
    });

    return result;
  };

  const subCategoryList = categoryTree?.children
    ? getSubCategoryList(categoryTree.children)
    : [];

  console.log(currentCategory);
  console.log(productsData);

  const filterOptions = [
    {
      Icon: <TbChartBarPopular />,
      Description: "Most Popular",
      sortKey: "productPosition",
      sortValue: "desc",
    },
    {
      Icon: <MdOutlineSell />,
      Description: "Best Promotion",
      sortKey: "productDiscountPercentage",
      sortValue: "desc",
    },
    {
      Icon: <LuChartBarIncreasing />,
      Description: "Price: Low to High",
      sortKey: "productPrice",
      sortValue: "asc",
    },
    {
      Icon: <LuChartBarDecreasing />,
      Description: "Price: High to Low",
      sortKey: "productPrice",
      sortValue: "desc",
    },
  ];

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
          {subCategoryList.length > 0
            ? subCategoryList.map((item, index) => (
                <SubCategory key={item} item={item} />
              ))
            : isLoading
            ? Array(4)
                .fill()
                .map((_, index) => <SkeletonSubCategory key={index} />)
            : null}
        </div>
        <div className="category-detail__list-item">
          <div className="list-item__sort">
            <div className="sort__number-item">
              {isLoading
                ? "Loading..."
                : productsPagination.totalItem === 0
                ? "No Products Found"
                : productsPagination.totalItem === 1
                ? "1 Product Found"
                : `${productsPagination.totalItem} Products Found`}
            </div>
            <div className="sort__title">Sort By</div>
            <div className="sort__options">
              {filterOptions.map((item, index) => (
                <SortByItem
                  item={item}
                  key={index}
                  isActive={
                    sortOption.sortKey === item.sortKey &&
                    sortOption.sortValue === item.sortValue
                  }
                  onClick={() =>
                    setSortOption({
                      sortKey: item.sortKey,
                      sortValue: item.sortValue,
                    })
                  }
                />
              ))}
            </div>
          </div>
          <div className="list-item__items">
            {productsData.length > 0 ? (
              productsData.map((item) => (
                <CardProduct key={item._id} item={item} />
              ))
            ) : isLoading ? (
              Array(10)
                .fill()
                .map((_, index) => <SkeletonCardProduct key={index} />)
            ) : (
              <p
                style={{
                  color: "#2d6a4f",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                🛒 No Products Found!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;
