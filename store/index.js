import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";

const rootReducer = combineReducers({
  userSlice: userSlice,
});

export default configureStore({
  reducer: rootReducer,
});
