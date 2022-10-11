import CategoriesPreview from "components/routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "components/routes/category/category.component";

import { useEffect } from "react";
import { getCategoriesAndDocuments } from "utils/firebase/firebase.utils";
import { setCategories } from "store/categories/categories.action";
import { useDispatch } from "react-redux";

import "./shop.styles.scss";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoryMap = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    };
    getCategoryMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
