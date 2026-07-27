import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const initialState = {
  productsData: JSON.parse(localStorage.getItem("productsData")) || [],
  edit: null,
};

const productSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    addToProduct: (state, action) => {
      const index = state.productsData.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (index !== -1) {
        state.productsData[index] = action.payload;
        localStorage.setItem(
          "productsData",
          JSON.stringify(state.productsData),
        );
      } else {
        state.productsData.push(action.payload);
        localStorage.setItem(
          "productsData",
          JSON.stringify(state.productsData),
        );
      }
    },
    removeProduct: (state, action) => {
      state.productsData = state.productsData.filter((product) => {
        return product.id !== action.payload;
      });
      localStorage.setItem("productsData", JSON.stringify(state.productsData));
    },
    editProduct: (state, action) => {
      console.log("runnint", action);
      state.edit = state.productsData.find((product) => {
        return product.id === action.payload;
      });
    },
    searchProduct: (state, action) => {
      if (action.payload === "") {
        state.productsData = state.productsData
      } else {
        state.productsData = state.productsData.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        });
      }
    },
  },
});

export const { addToProduct, removeProduct, editProduct, searchProduct } =
  productSlice.actions;

export default productSlice.reducer;
