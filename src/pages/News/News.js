import WeeklyDeals from "./WeeklyDeals.js";
import Categories from "./Categories.js";
import PopularProducts from "./DailyBestSales.js";

import { NewsProvider } from "../../Context/NewsContext.js";

export default function News() {
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
