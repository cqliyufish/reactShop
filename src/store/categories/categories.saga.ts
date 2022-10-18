import { takeLatest, call, put, all } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    // yield = await
    // call(funName, params for fun)
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    // put = dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailure(error as Error));
  }
}

// takeLatest(参数1， 参数2) 接受最新action
// 参数1: 监听的action
// 参数2: 监听到action， what will happen
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // 执行完all里面的所有events
  yield all([call(onFetchCategories)]);
}
