import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { userRegister } from "../Redux/features/registerSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formData = (data) => {
    let register = { ...data, id: nanoid() };
    dispatch(userRegister(register));
    toast.success("Registered Successfully");
    naviagte("/home");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white">Register</h1>

        <p className="text-center text-slate-400 mt-2 mb-6">
          Create your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(formData)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>

            <input
              {...register("name", {
                required: "Name is Required",
              })}
              type="text"
              placeholder="Enter your name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 font-semibld">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>

            <input
              {...register("email", {
                required: "Email is reuqired",
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 font-semibld">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password is reuqired",
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 font-semibld">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already registered?{" "}
          <span className="text-blue-400 font-medium cursor-pointer hover:underline">
            <NavLink to={"/login"}>Login</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
