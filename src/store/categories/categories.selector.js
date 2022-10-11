import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

//当selectCategoryReducer得到的categories不一样时，调用categoriesSlice) => categoriesSlice.categories)
//获得新的categories
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//当categories变化
//重新reduce
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
