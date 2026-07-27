import React, { useEffect } from "react";
import { Undo2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addToProduct } from "../Redux/features/createProductSlice";
import { nanoid } from "nanoid";
import {toast} from "react-toastify"

const ProductCreateForm = () => {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: productReducer.edit,
  });

  const createProductForm = (data) => {
    const createProduct = {
      ...data,
      id: productReducer.edit ? productReducer.edit.id : nanoid(),
      price: data.totalPrice,
    };

    dispatch(addToProduct(createProduct));
    toast.success("Product Created Successfully");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <NavLink
            to="/home"
            className="w-11 h-11 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all duration-300"
          >
            <Undo2 className="text-white" size={20} />
          </NavLink>

          <div>
            <h1 className="text-3xl font-bold text-white">Create Product</h1>

            <p className="text-slate-400 text-sm mt-1">
              Add a new product to your store
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 shadow-2xl">
          <form
            onSubmit={handleSubmit(createProductForm)}
            className="space-y-5"
          >
            <div>
              <label className="text-slate-300 text-sm font-medium">
                Product Title
              </label>

              <input
                {...register("title", {
                  required: "Title is Required",
                })}
                type="text"
                placeholder="Nike Air Max"
                className="w-full mt-2 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />

              {errors.title && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium">
                Price
              </label>

              <input
                {...register("totalPrice", {
                  required: "Price is Required",
                })}
                type="number"
                placeholder="2499"
                className="w-full mt-2 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />

              {errors.totalPrice && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.totalPrice.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium">
                Category
              </label>

              <select
                {...register("category", {
                  required: "Category is Required",
                })}
                className="w-full mt-2 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Sports">Sports</option>
                <option value="Accessories">Accessories</option>
              </select>

              {errors.category && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium">
                Image URL
              </label>

              <input
                {...register("image", {
                  required: "Image is Required",
                })}
                type="text"
                placeholder="https://image.com/product.jpg"
                className="w-full mt-2 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />

              {errors.image && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-white font-semibold text-lg hover:scale-[1.02] active:scale-100 transition-all duration-300 shadow-lg shadow-green-500/20"
            >
              🚀 Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreateForm;
