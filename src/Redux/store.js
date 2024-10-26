import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice/UserSlice";
import ErrorReducer from "./ErrorSlice/ErrorSlice";
import CurrentUserReducer from "./currentUserSlice/CurrentUserSlice";
import SideBarReducer from "./SideBarSlice/SideBarSlice";
import AdsReducer from "./AdsSlice/AdsSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    error: ErrorReducer,
    currentUser: CurrentUserReducer,
    sideBar: SideBarReducer,
    ads: AdsReducer,
  },
});
export default store;
