import React from "react";
import { NavLink } from "react-router";
import { useAuthHook } from "../hook/AuthHook";

const RegisterPage = () => {

  const {register , handleSubmit , registerForm , errors} = useAuthHook()


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mt-2">Register your account</p>

        <form
        onSubmit={handleSubmit(registerForm)} className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
            {...register("name" , {
              required: "Name is Required"
            })}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 font-semibold">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
            {...register("email" , {
              required: "Email is Required"
            })}
              type="email"
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
            {...register("password" , {
              required: "Password is Required"
            })}
              type="Password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 font-semibold">{errors.password.message}</p>}
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink to={"/"} className="text-green-600 font-semibold">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
