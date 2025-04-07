import { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { NewsContext } from "../../Context/NewsContext";
import CardProduct from "./CardProduct";
import Title from "./Title";
import "./WeeklyDeals.css";
import { BiSolidChevronRight, BiSolidChevronLeft } from "react-icons/bi";

function WeeklyDeals() {
  const { cardProductsData } = useContext(NewsContext);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (cardProductsData) {
      setCards(cardProductsData.slice(0, 50));
    }
  }, [cardProductsData]);

  const [pageNumber, setPageNumber] = useState(0);

  const cardsPerPage = 10;
  const pagesVisited = pageNumber * cardsPerPage;

  const displayCards = cards
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((item, index) => {
      return <CardProduct key={index} item={item} />;
    });

  const pageCount = Math.ceil(cards.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="weekly-deals-container">
      <div className="weekly-deals">
        <div className="weekly-deals__title">
          <Title title="Weekly Deals" />
        </div>
        <div className="weekly-deals__cards">{displayCards}</div>
        <div className="weekly-deals__pagination">
          <ReactPaginate
            previousLabel={<BiSolidChevronLeft />}
            nextLabel={<BiSolidChevronRight />}
            pageCount={pageCount}
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
