import { useForm } from "react-hook-form";
import { loginApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";
import { Navigate } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const regsiterForm = (data) => {
    console.log(data);
  };

  const loginForm = async (data) => {
    const res = await loginApi(data);
    dispatch(addUser(res));
  };

  return {
    register,
    handleSubmit,
    errors,
    regsiterForm,
    loginForm,
  };
};
