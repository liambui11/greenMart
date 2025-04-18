import { React, useEffect } from "react";

import SlideSection1 from "../slideSection/SlideSection1";
import ContentHome2 from "../Popular/ContentHome2";
import Line from "../Line";
// import BestSeller from "../BestSeller/BestSeller";
import HotProduct from "../HotProduct/HotProduct";
import Banner from "../Banner/Banner";
import CreateAccount from "../Createaccount/CreateAccount";
import MyCategory from "../myCategory/MyCategory";
import { NewsProvider } from "../../../Context/NewsContext";
import PopularProducts from "../../News/DailyBestSales";

function HomeContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <NewsProvider>
      <SlideSection1 />
      <Line />
      <MyCategory />
      <PopularProducts />
      <ContentHome2 />
      <Banner />
      {/* <BestSeller /> */}

      <HotProduct />
      <CreateAccount />
    </NewsProvider>
  );
}

export default HomeContent;
