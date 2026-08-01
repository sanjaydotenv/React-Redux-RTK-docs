import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, removeUser } from "../features/AuthSlice";

export const useAuthHook = () => {
  const dispatch = useDispatch();

  const [registerUsers, setRegisterUsers] = useState(
    JSON.parse(localStorage.getItem("registerUsers")) || [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerForm = (data) => {
    let arr = [...registerUsers, data];
    setRegisterUsers(arr);
    localStorage.setItem("registerUsers", JSON.stringify(arr));
    reset();
    toast.success("Registered Successfully Go and Login");
  };

  const loginForm = (data) => {
    console.log(data);
    console.log(registerUsers);
    const isValidUser = registerUsers.find((user) => {
      return user.email === data.email && user.password === data.password;
    });

    console.log(isValidUser);

    if (!isValidUser) {
      toast.error("Invalid Credentials");
      return;
    }

    dispatch(loginUser(data));
    localStorage.setItem("loggedInUser", JSON.stringify(data));
    toast.success("User LoggedIn");
  };

  const logoutUser = () => {
    dispatch(removeUser());
  };

  return {
    register,
    handleSubmit,
    errors,
    registerForm,
    loginForm,
    logoutUser,
  };
};
