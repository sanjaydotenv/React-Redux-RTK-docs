import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  carts: JSON.parse(localStorage.getItem("cartsData")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.cart = action.payload;
    },
    addTOCart: (state, action) => {
      const existingCart = state.carts.find(
        (cart) => cart.id === action.payload.id,
      );

      if (existingCart) {
        existingCart.quantity += 1;
        existingCart.totalPrice = existingCart.price * existingCart.quantity;
      } else {
        state.carts.push(action.payload);
      }

      localStorage.setItem("cartsData", JSON.stringify(state.carts));
    },



    
    increaseQuantity: (state, action) => {
      const cart = state.carts.find((cart) => {
        return cart.id === action.payload.id;
      });
      if (cart) {
        cart.quantity += 1;
        cart.totalPrice = cart.price * cart.quantity;
        localStorage.setItem("cartsData", JSON.stringify(state.carts));
      }
    },
    decreaseQuantity: (state, action) => {
      const cart = state.carts.find((cart) => {
        return cart.id === action.payload.id;

        if (cart.quantity > 0) {
          state.carts;
        }
      });

      if (cart) {
        if (cart.quantity > 1) {
          cart.quantity -= 1;
          cart.totalPrice = cart.price * cart.quantity;
        } else {
          state.carts = state.carts.filter((item) => {
            return item.id !== action.payload.id;
          });
        }

        localStorage.setItem("cartsData", JSON.stringify(state.carts));
      }
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter((cart) => {
        return cart.id !== action.payload;
      });
      localStorage.setItem("cartsData", JSON.stringify(state.carts));
    },
  },
});

export const {
  addId,
  addTOCart,
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
