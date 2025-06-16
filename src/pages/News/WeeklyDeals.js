import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
// import { NewsContext } from "../../Context/NewsContext";
import CardProduct from "./CardProduct";
import Title from "./Title";
import "./WeeklyDeals.css";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";
import SkeletonCardProduct from "../../pages/News/SkeletonCardProduct";

function WeeklyDeals() {
  // const [pageNumber, setPageNumber] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [productsData, setProductsData] = useState([]);
  const [productsPaginationData, setProductsPaginationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resProducts = await fetch(
          `${apiUrl}/api/v1/products?currentPage=1&limitItems=10`
        );

        const productsJson = await resProducts.json();
        setProductsData(productsJson.info);
        setProductsPaginationData(productsJson.pagination);
      } catch (err) {
        console.error("Lỗi fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const changePage = async ({ selected }) => {
    const newPage = selected + 1;
    setIsLoading(true);
    setProductsData([]);
    try {
      const resProducts = await fetch(
        `${apiUrl}/api/v1/products?currentPage=${newPage}&limitItems=10`
      );

      const productsJson = await resProducts.json();
      setProductsData(productsJson.info);
    } catch (err) {
      console.error("Lỗi fetch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(productsData);
  return (
    <div className="weekly-deals-container">
      <div className="weekly-deals">
        <div className="weekly-deals__title">
          <Title title="Weekly Deals" />
        </div>
        <div className="weekly-deals__cards">
          {isLoading ? (
            Array(10)
              .fill()
              .map((_, index) => <SkeletonCardProduct key={index} />)
          ) : productsData.filter((item) => item.productDiscountPercentage > 0)
              .length > 0 ? (
            productsData
              .filter((item) => item.productDiscountPercentage > 0)
              .map((item) => <CardProduct key={item._id} item={item} />)
          ) : (
            <p
              style={{
                color: "#2d6a4f",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              🛒 No Products Sale Found!
            </p>
          )}
        </div>
        <div className="weekly-deals__pagination">
          <ReactPaginate
            previousLabel={<BiSolidChevronLeft />}
            nextLabel={<BiSolidChevronRight />}
            pageCount={productsPaginationData.totalPage}
            onPageChange={changePage}
            containerClassName="paginationButtons"
            disabledClassName="paginationDisable"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    </div>
  );
}

export default WeeklyDeals;
