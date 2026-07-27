import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/features/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { registerReducer } = useSelector((state) => state);

  const loginSubmit = (data) => {
    const loggedInUser = registerReducer.RegisteredUsers.find((val) => {
      return data.email === val.email && data.password === val.password;
    });

    if (!loggedInUser) {
      return;
      reset()
    }

    dispatch(login(loggedInUser));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-white text-2xl font-semibold">Login to Continue</h1>
        <form onSubmit={handleSubmit(loginSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-slate-300 text-sm">Email</label>

            <input
              {...register("email", {
                required: "Email is Required",
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-slate-300 text-sm">Password</label>

            <input
              {...register("password", {
                required: "password is Required",
              })}
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-4 rounded-xl text-white font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          Don't have an account?
          <span className="text-indigo-400 cursor-pointer ml-2">
            <NavLink to={"/"}>Register</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
