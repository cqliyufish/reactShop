import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";
import { FC } from "react";
import { CategoryItem } from "store/categories/categories.types";
type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => (
  <CategoryPreviewContainer>
    {/* 只有文字clickable，如果不加span, h2所占的1行都是clickable */}
    <h2>
      <Title to={title}>{title.toUpperCase()}</Title>
    </h2>
    <Preview>
      {/* shop主页面， 每个category只显示4个商品 */}
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Preview>
  </CategoryPreviewContainer>
);

export default CategoryPreview;
