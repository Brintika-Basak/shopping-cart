import { createReducer } from "@reduxjs/toolkit";

//func to load intial state from local storage
const loadState = () => {
  try {
    const states = localStorage.getItem("cartState");
    if (states === null) {
      return undefined;
    }
    return JSON.parse(states);
  } catch (err) {
    return undefined;
  }
};
//save state into local storage whenever any function dispatched
const setState = (state) => {
  try {
    const states = JSON.stringify(state);
    localStorage.setItem("cartState", states);
  } catch (err) {
    console.log("error svaing state:", err);
  }
};
// initial state
const initialState = loadState() || {
  cartItems: [],
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};
const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
      setState(state);
    })
    .addCase("decrement", (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity -= 1;
        });
      }
      setState(state);
    })
    .addCase("deleteFromCart", (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      setState(state);
    })
    .addCase("calculatePrice", (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => (sum += i.price * i.quantity));
      state.subTotal = sum;
      state.shipping = state.subTotal > 1000 ? 0 : 200;
      state.tax = +(state.subTotal * 0.18).toFixed();
      state.total = state.subTotal + state.shipping + state.tax;
      setState(state);
    });
});
export default cartReducer;
