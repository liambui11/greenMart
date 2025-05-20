import { React, useEffect } from "react";
import SlideSection1 from "../slideSection/SlideSection1";
import ContentHome2 from "../Popular/ContentHome2";
import HotProduct from "../HotProduct/HotProduct";
import Banner from "../Banner/Banner";
import CreateAccount from "../Createaccount/CreateAccount";
import MyCategory from "../myCategory/MyCategory";

import { NewsProvider } from "../../../Context/NewsContext";
import PopularProducts from "../../News/DailyBestSales";
import BigSale from "../BigSale/BigSale";
import Featuredproduct from "../Featuredproducts/Featuredproduct";

function HomeContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <NewsProvider>
      <SlideSection1 />
      <MyCategory />
      <Featuredproduct />
      <PopularProducts />
      <ContentHome2 />
      <Banner />
      <BigSale />
      <HotProduct />
      <CreateAccount />
    </NewsProvider>
  );
}

export default HomeContent;
