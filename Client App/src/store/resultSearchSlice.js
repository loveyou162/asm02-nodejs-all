import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchHotel: null,
    detailHotel: null,
  },
  reducers: {
    setDataSearch: (state, action) => {
      state.searchHotel = action.payload;
    },
    setDetailHotel: (state, action) => {
      state.detailHotel = action.payload;
    },
  },
});
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
