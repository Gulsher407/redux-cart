import { createSlice } from "@reduxjs/toolkit";
import Product from "../Product";

const initialState = {
  cart: [],
  items: Product,
  TotalQuantity: 0,
  TotalPrice: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const find = state.cart.findIndex(item => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      
      state.TotalQuantity += 1;
      state.TotalPrice += action.payload.price;
    },
    removeitem: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.TotalQuantity -= state.cart[index].quantity;
        state.TotalPrice -= state.cart[index].price * state.cart[index].quantity;
        state.cart.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
        state.TotalQuantity += 1;
        state.TotalPrice += state.cart[index].price;
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        if (state.cart[index].quantity === 1) { // If quantity is 1, remove the item
          state.TotalQuantity -= 1;
          state.TotalPrice -= state.cart[index].price;
          state.cart.splice(index, 1);
        } else if (state.cart[index].quantity > 1) { // If quantity is greater than 1, decrement it
          state.cart[index].quantity -= 1;
          state.TotalQuantity -= 1;
          state.TotalPrice -= state.cart[index].price;
        }
      }
    }
  },
});

export const { addtocart, removeitem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
