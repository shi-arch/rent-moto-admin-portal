import { createSlice } from "@reduxjs/toolkit";

const AdsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchAdsStart: (state) => {
      state.loading = true;
      state.downloadLoading = true;
      state.error = null;
    },
    fetchAdsSuccess: (state, action) => {
      state.loading = false;
      state.ads = action.payload;
    },
    fetchMoreAdsSuccess: (state, action) => {
      state.loading = false;
      state.ads.models = [...state.ads.models, ...action.payload.models];
      state.ads.lastVisible = action.payload.lastVisible;
      state.ads.totalApp = action.payload.totalApp;
    },
    fetchAdsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAdLimit: (state, action) => {
      const { id, newLimit, limitOff } = action.payload;
      const item = state.ads.models.find((item) => item.TransactionId === id);
      if (item) {
        item.enquiryLimit = newLimit;
        item.limitoff = limitOff;
      }
    },
    toggleClearAds: (state) => {
      state.ads = {};
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchAdsStart,
  fetchAdsSuccess,
  fetchMoreAdsSuccess,
  fetchAdsFailure,
  updateAdLimit,
  toggleClearAds,
} = AdsSlice.actions;
export default AdsSlice.reducer;
