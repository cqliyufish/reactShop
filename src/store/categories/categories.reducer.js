import CATEGORIES_ACTION_TYPES from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// default action = {}
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      // only update categoriesMap
      return { ...state, categories: payload };
    default:
      return state;
  }
};
