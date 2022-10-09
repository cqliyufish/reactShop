import CategoriesPreview from "components/routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "components/routes/category/category.component";
import "./shop.styles.scss";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
