import CategoriesPreview from "components/routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "components/routes/category/category.component";

import { useEffect } from "react";
import { fetchCategoriesStart } from "store/categories/categories.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
