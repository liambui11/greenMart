import WeeklyDeals from "./WeeklyDeals.js";
import Categories from "./Categories.js";
import PopularProducts from "./DailyBestSales.js";

import { NewsProvider } from "../../Context/NewsContext.js";
import { useEffect } from "react";

export default function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="news">
      <NewsProvider>
        <Categories />
        <PopularProducts />
        <WeeklyDeals />
      </NewsProvider>
    </div>
  );
}
