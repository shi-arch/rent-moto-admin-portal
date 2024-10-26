import { createSlice } from "@reduxjs/toolkit";

const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("currentUser");
    },
    signInUpdate: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...state.currentUser, ...action.payload })
      );
    },
    handleProfileUpdate: (state, action) => {
      const { userName, userProfileImage } = action.payload;
      if (userName) {
        state.currentUser.userName = userName;
      }
      if (userProfileImage) {
        state.currentUser.userProfileImage = userProfileImage;
      }
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    SignInUpdateProfile: (state, action) => {
      state.currentUser = { ...state, ...action.payload };
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...state, ...action.payload })
      );
    },
    getSignInUser: (state) => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        state.currentUser = JSON.parse(user);
      }
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
  signInUpdate,
  getSignInUser,
  SignInUpdateProfile,
  handleProfileUpdate,
} = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
