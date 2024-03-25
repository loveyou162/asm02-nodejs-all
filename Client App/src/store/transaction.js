import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    dataTransaction: null,
  },
  reducers: {
    setTransaction(state, action) {
      state.dataTransaction = action.payload;
    },
  },
});
export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer;
