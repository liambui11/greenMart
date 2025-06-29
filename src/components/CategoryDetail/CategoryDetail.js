import "./CategoryDetail.css";
import { LuChartBarDecreasing, LuChartBarIncreasing } from "react-icons/lu";
import { MdOutlineSell } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import CardProduct from "../../pages/News/CardProduct";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubCategory from "./SubCategory";
import SortByItem from "./SortByItem";
import SkeletonCardProduct from "../../pages/News/SkeletonCardProduct";
import SkeletonSubCategory from "./SkeletonSubCategory";
import ReactPaginate from "react-paginate";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import OverlayLoading from "../../components/OverlayLoading/OverlayLoading.js";
import { FaChevronRight } from "react-icons/fa";

function CategoryDetail() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { categorySlug } = useParams();

  const [productsData, setProductsData] = useState([]);
  const [productsPagination, setProductsPagination] = useState();
  const [categoryTree, setCategoryTree] = useState();
  const [sortOption, setSortOption] = useState({
    sortKey: "productPosition",
    sortValue: "desc",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(0);
  // const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    isFirstRender.current = true;
    setCurrentPage(0);
    setSortOption({
      sortKey: "productPosition",
      sortValue: "desc",
    });
    window.scrollTo(0, 0);
  }, [categorySlug]);

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstRender.current) {
        setIsLoading(true);
        setProductsData([]);
        isFirstRender.current = false;
        try {
          const [resProducts, resCategories] = await Promise.all([
            fetch(
              `${apiUrl}/api/v1/products/${categorySlug}?sortKey=${sortOption.sortKey}&sortValue=${sortOption.sortValue}`
            ),
            fetch(
              `${apiUrl}/api/v1/products-category/categorytree/${categorySlug}`
            ),
          ]);

          const productsJson = await resProducts.json();
          const categoriesJson = await resCategories.json();

          if (!productsJson.info && !categoriesJson.info) {
            navigate("/ErrorPage", { replace: true });
          }

          setProductsData(productsJson.info);
          setProductsPagination(productsJson.pagination);
          setCategoryTree(categoriesJson.info);
        } catch (err) {
          console.error("Lỗi fetch:", err);
        } finally {
          setIsLoading(false);
          setIsProductLoading(false);
        }
      } else {
        setIsProductLoading(true);
        setProductsData([]);
        setCurrentPage(0);
        try {
          const resProducts = await fetch(
            `${apiUrl}/api/v1/products/${categorySlug}?sortKey=${sortOption.sortKey}&sortValue=${sortOption.sortValue}`
          );

          const productsJson = await resProducts.json();
          if (!productsJson.info) {
            navigate("/ErrorPage", { replace: true });
          }
          setProductsData(productsJson.info);
        } catch (err) {
          console.error("Lỗi fetch:", err);
        } finally {
          setIsProductLoading(false);
        }
      }
    };

    fetchData();
  }, [categorySlug, sortOption, navigate, apiUrl]);

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
    ? getSubCategoryList(categoryTree?.children)
    : [];

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

  const changePage = async ({ selected }) => {
    setCurrentPage(selected);
    const newPage = selected + 1;
    setIsProductLoading(true);
    setProductsData([]);
    try {
      const resProducts = await fetch(
        `${apiUrl}/api/v1/products/${categorySlug}?currentPage=${newPage}&limitItems=10&sortKey=${sortOption.sortKey}&sortValue=${sortOption.sortValue}`
      );
      const productsJson = await resProducts.json();
      if (!productsJson.info) {
        navigate("/ErrorPage", { replace: true });
      }
      setProductsData(productsJson.info);
    } catch (err) {
      console.error("Lỗi fetch:", err);
    } finally {
      setIsProductLoading(false);
    }
  };

  console.log("productsPagination:", productsPagination);
  console.log("productsData:", productsData);
  console.log("categoryTree:", categoryTree);

  return (
    <div className="category-detail-container">
      <div className="category-detail">
        <div className="category-detail__bread-crumb">
          <span onClick={() => navigate(`/`)}>Home</span> <FaChevronRight />
          <span>{categoryTree?.categoryName}</span>
        </div>
        <div
          className="category-detail__title"
          style={{
            backgroundImage: `url(${categoryTree?.categoryImage})`,
          }}
        >
          {categoryTree?.categoryName}
        </div>
        <div className="category-detail__sublist">
          {subCategoryList.length > 0
            ? subCategoryList.map((item, index) => (
                <SubCategory key={item?._id} item={item} />
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
                : productsPagination?.totalItem === 0
                  ? "No Products Found"
                  : productsPagination?.totalItem === 1
                    ? "1 Product Found"
                    : `${productsPagination?.totalItem} Products Found`}
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
            {productsData?.length > 0 ? (
              productsData.map((item) => (
                <CardProduct key={item._id} item={item} />
              ))
            ) : isProductLoading ? (
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
          <div className="list-item__items--pagination"></div>
          <ReactPaginate
            previousLabel={<BiSolidChevronLeft />}
            nextLabel={<BiSolidChevronRight />}
            pageCount={productsPagination?.totalPage}
            onPageChange={changePage}
            containerClassName="paginationButtons"
            disabledClassName="paginationDisable"
            activeClassName="paginationActive"
            forcePage={currentPage}
          />
        </div>
      </div>
      {isLoading && <OverlayLoading />}
    </div>
  );
}

export default CategoryDetail;
