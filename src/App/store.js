import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/CartSlice";

export const store = configureStore({
  reducer: {
     allcart :CartReducer,
  },
});