import WeeklyDeals from "./WeeklyDeals.js";
import Categories from "./Categories.js";
import PopularProducts from "./DailyBestSales.js";

import { NewsProvider } from "../../Context/NewsContext.js";
import { useEffect } from "react";
import SaleOffer from "./SaleOffer.js";
import ScrollFade from "../../components/ScrollFade/ScrollFade.js";

export default function News() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="news">
      <NewsProvider>
        <ScrollFade>
          <Categories />
        </ScrollFade>
        <ScrollFade>
          <SaleOffer />
        </ScrollFade>
        <ScrollFade>
          <PopularProducts />
        </ScrollFade>
        <ScrollFade>
          <WeeklyDeals />
        </ScrollFade>
      </NewsProvider>
    </div>
  );
}
