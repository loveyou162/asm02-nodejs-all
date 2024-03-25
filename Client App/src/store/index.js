import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./resultSearchSlice";
import uiReducer from "./ui-slice";
import transactionReducer from "./transaction";
const store = configureStore({
  reducer: {
    search: searchReducer,
    ui: uiReducer,
    transaction: transactionReducer,
  },
});
export default store;
