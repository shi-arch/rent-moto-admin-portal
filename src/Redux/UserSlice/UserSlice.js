import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/index";
import { doc, getDoc } from "firebase/firestore";
import { handleAsyncError } from "../../utils/Helper/handleAsyncError";
// Define the async thunk for fetching product data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (phone, { dispatch }) => {
    try {
      if (!phone) return handleAsyncError(dispatch, "No User Found");
      const userDoc = doc(db, "users", phone);
      const UserSnap = await getDoc(userDoc);
      if (UserSnap.exists()) {
        // return { id: UserSnap.id, ...UserSnap.data() };
        return UserSnap.data();
      } else {
        console.log("error");
        return handleAsyncError(dispatch, "User Not Exist's");
      }
    } catch (error) {
      console.log(error);
      return handleAsyncError(dispatch, error.message);
    }
  }
);
// Define the product slice
export const UserSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default UserSlice.reducer;
