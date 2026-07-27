import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import ProductCreateForm from "./components/ProductCreateForm";
import ProductCart from "./components/ProductCart";

const App = () => {
  const { registerReducer } = useSelector((state) => state);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createproduct" element={<ProductCreateForm />} />
        <Route path="/product/cart" element={<ProductCart />} />
      </Routes>
    </div>
  );
};

export default App;
