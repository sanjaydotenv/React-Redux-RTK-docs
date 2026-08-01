import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuthHook";

const LoginPage = () => {
  const { register, handleSubmit, errors ,loginForm } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-2">Login to your account</p>

        <form onSubmit={handleSubmit(loginForm)} className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("username", {
                required: "Username is Required",
              })}
              type="text"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 font-semibold">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is Required",
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 font-semibold">{errors.password.message}</p>}
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-blue-600 font-semibold">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
