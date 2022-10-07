import SHOP_DATA from "shop-data.json";
import { ProductsContext } from "context/products..context";
import ProductCard from "components/product-card/product-card.component";
import { useContext } from "react";

import "./shop.styles.scss";
const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {SHOP_DATA.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default Shop;