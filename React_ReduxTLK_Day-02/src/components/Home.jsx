import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import ProductCreateForm from "./ProductCreateForm";
import { NavLink, useNavigate } from "react-router";
import { PackagePlus, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { searchProduct } from "../Redux/features/createProductSlice";
import { logout } from "../Redux/features/loginSlice";

const Home = () => {
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

  const searchRef = useRef();

  const dispatch = useDispatch();

  const {
    cartReducer: { carts },
  } = useSelector((state) => state);

  let count = 0;
  carts.forEach((val) => {
    count += 1;
  });

  const handleSearch = () => {
    dispatch(searchProduct(searchRef.current.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-5">
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
      >
        <LogOut size={18} />
        Logout
      </button>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            Product
            <span className="text-green-400">Store</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
            <NavLink to="/createproduct">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 duration-300 text-white shadow-lg shadow-green-500/20">
                <PackagePlus size={20} />
                Create Product
              </button>
            </NavLink>

            <NavLink to="/product/cart">
              <button className="relative flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 duration-300 text-white shadow-lg shadow-blue-500/20">
                <ShoppingCart size={20} />
                Cart
                <span className="bg-white text-slate-900 font-bold px-2 rounded-full text-sm">
                  {count}
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div>
            <h2 className="text-4xl font-bold text-white">Discover Products</h2>

            <p className="text-slate-400 mt-2">
              Browse premium collections with modern design.
            </p>
          </div>

          <input
            onInput={handleSearch}
            ref={searchRef}
            type="text"
            placeholder="🔍 Search products..."
            className="w-full md:w-96 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
          />
        </div>

        <ProductCard />
      </div>
    </div>
  );
};

export default Home;
