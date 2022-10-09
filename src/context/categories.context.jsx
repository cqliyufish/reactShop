import { createContext, useState, useEffect } from "react";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "utils/firebase/firebase.utils";

// import SHOP_DATA from "shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMaps] = useState({});
  const value = { categoriesMap };
  // // 设置firebase DB，只执行一次
  //   useEffect(() => {
  //     addCollectionAndDocuments("collections", SHOP_DATA);
  //   }, []);

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      // console.log(Object.keys(categoryMap));
      setCategoriesMaps(categoryMap);
    };
    getCategoryMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
