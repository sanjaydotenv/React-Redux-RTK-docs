import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { loginUserAction } from "../state/authAction";

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
    dispatch(loginUserAction(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    regsiterForm,
    loginForm,
  };
};
