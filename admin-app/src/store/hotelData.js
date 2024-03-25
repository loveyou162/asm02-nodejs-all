import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: { inputHotel: null, inputRooms: null },
  reducers: {
    setInputHotel(state, action) {
      state.inputHotel = action.payload;
    },
    setInputRoom(state, action) {
      state.inputRooms = action.payload;
    },
  },
});
export const hotelDataAction = hotelSlice.actions;
export default hotelSlice.reducer;
