import { createContext } from "react";
import {
  categoriesData,
  cardProductsData,
  categoriesBannerData,
  PopularProductsBannerData,
  PopularProductsCardData
} from "../Context/data.js";

export const NewsContext = createContext([]);

export const NewsProvider = ({ children }) => {
  return (
    <NewsContext.Provider
      value={{
        categoriesData,
        cardProductsData,
        categoriesBannerData,
        PopularProductsBannerData,
        PopularProductsCardData
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
