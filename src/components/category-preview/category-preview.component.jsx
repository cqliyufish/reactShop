import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import "./category-preview.styles.scss";
const CategoryPreview = ({ title, products }) => (
  <div className="category-preview-container">
    {/* 只有文字clickable，如果不加span, h2所占的1行都是clickable */}
    <h2>
      <Link className="title" to={title}>
        {title.toUpperCase()}
      </Link>
    </h2>
    <div className="preview">
      {/* shop主页面， 每个category只显示4个商品 */}
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;
