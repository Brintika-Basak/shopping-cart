import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducer";

const store = configureStore({
  reducer: {
    cart: cartReducer, //slice name
  },
});
export default store;
