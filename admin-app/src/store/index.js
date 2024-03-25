import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotelData";

const store = configureStore({
  reducer: { hotel: hotelReducer },
});
export default store;
