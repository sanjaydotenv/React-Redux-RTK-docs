import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addId,
  addTOCart,
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "../Redux/features/cartSlice";
import { NavLink, useNavigate } from "react-router";
import { Undo2 } from "lucide-react";

const ProductCart = () => {
  const { cartReducer, productReducer, loginReducer } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginReducer.loginUser) {
      navigate("/");
    }
  }, [loginReducer.loginUser, navigate]);

  if (!loginReducer.loginUser) {
    return null;
  }

  if (cartReducer.cart) {
    let cartItems = productReducer.productsData.find((product) => {
      return product.id === cartReducer.cart;
    });
    const finalCart = { ...cartItems, quantity: 1 };
    dispatch(addTOCart(finalCart));
    dispatch(addId(null));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <NavLink
              to="/home"
              className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all duration-300"
            >
              <Undo2 size={22} className="text-white" />
            </NavLink>

            <div>
              <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>

              <p className="text-slate-400 mt-1">
                {cartReducer.carts.length} Items in your cart
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white mb-10">
          Shopping Cart
          <span className="text-green-400 text-2xl ml-3">
            ({cartReducer.carts.length} Items)
          </span>
        </h1>

        <div className="flex flex-col gap-8">
          {cartReducer.carts.map((cart) => {
            return (
              <div
                key={cart.id}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-green-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  {/* Left */}

                  <div className="flex gap-6">
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={cart.image}
                        alt={cart.title}
                        className="w-40 h-40 object-cover rounded-2xl group-hover:scale-110 duration-500"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          {cart.category}
                        </span>

                        <h2 className="text-white text-3xl font-bold mt-4">
                          {cart.title}
                        </h2>

                        <p className="text-slate-400 mt-2">
                          Premium Quality Product
                        </p>
                      </div>

                      <div className="flex gap-3 mt-5">
                        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          🚚 Free Shipping
                        </span>

                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                          ⭐ Bestseller
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="flex flex-col justify-between items-end">
                    <div className="text-right">
                      <h2 className="text-slate-400 text-lg">Price</h2>

                      <h1 className="text-4xl font-bold text-green-400">
                        ₹{cart.price}
                      </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-800 rounded-full p-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(cart))}
                        className="w-11 h-11 rounded-full bg-slate-700 hover:bg-red-500 duration-300 text-white text-xl"
                      >
                        -
                      </button>

                      <span className="text-2xl text-white font-bold w-8 text-center">
                        {cart.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQuantity(cart))}
                        className="w-11 h-11 rounded-full bg-green-600 hover:bg-green-500 duration-300 text-white text-xl"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeCart(cart.id))}
                      className="mt-5 bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white duration-300"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>

                {/* Bottom */}

                <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-5">
                  <div>
                    <p className="text-slate-400">Total Amount</p>

                    <h2 className="text-4xl font-bold text-white">
                      ₹{cart.totalPrice}
                    </h2>
                  </div>

                  <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 duration-300 text-white text-lg font-semibold shadow-lg shadow-green-500/20">
                    Proceed To Checkout →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
