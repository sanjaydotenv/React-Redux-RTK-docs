import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addId, addTOCart } from "../Redux/features/cartSlice";
import {
  editProduct,
  removeProduct,
} from "../Redux/features/createProductSlice";
import { useNavigate } from "react-router";

const ProductCard = () => {
  const dispatch = useDispatch();

  const { loginReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginReducer.loginUser) {
      navigate("/");
    }
  }, [loginReducer.loginUser, navigate]);

  if (!loginReducer.loginUser) {
    return null;
  }

  const { productReducer } = useSelector((state) => state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
      {productReducer.productsData.map((data) => {
        return (
          <div
            key={data.id}
            className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(34,197,94,.15)]"
          >
            <div className="overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 object-cover group-hover:scale-110 duration-500"
              />
            </div>

            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                {data.category}
              </span>

              <h2 className="text-white text-2xl font-bold mt-4 line-clamp-1">
                {data.title}
              </h2>

              <div className="flex justify-between items-center mt-5">
                <h3 className="text-3xl font-bold text-green-400">
                  ₹{data.price}
                </h3>

                <div className="text-yellow-400">⭐ 4.8</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    dispatch(editProduct(data.id));
                    navigate("/createproduct");
                  }}
                  className="py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium duration-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(removeProduct(data.id))}
                  className="py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium duration-300"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => dispatch(addId(data.id))}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] duration-300 text-white font-semibold shadow-lg shadow-green-500/20"
              >
                🛒 Add To Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
