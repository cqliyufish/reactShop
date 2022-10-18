import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "store/store";
export const selectUserReducer = (state: RootState): UserState => state.user;

// reducerName.properties
export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
