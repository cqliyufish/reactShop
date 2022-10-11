import { combineReducers } from "redux";

import { userReducer } from "store/user/user.reducer";

import { cartReducer } from "store/cart/cart.reducer";
import { categoriesReducer } from "store/categories/categories.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
