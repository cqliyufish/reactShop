import { Fragment } from "react";
import CategoryPreview from "components/category-preview/category-preview.component";
import {
  selectCategoriesMap,
  selectIsLoading,
} from "store/categories/categories.selector";
import { useSelector } from "react-redux";
import Spinner from "components/spinner/spinner.component";

const CategoriesPreview = () => {
  const isLoading = useSelector(selectIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};
export default CategoriesPreview;
