import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { showReserve: false },
  reducers: {
    //hiển thị form booking
    setShowReserve(state) {
      state.showReserve = !state.showReserve;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
