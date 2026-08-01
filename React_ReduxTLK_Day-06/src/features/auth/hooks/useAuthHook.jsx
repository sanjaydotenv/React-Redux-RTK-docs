import { useForm } from "react-hook-form";

export const useAuth = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const regsiterForm = (data) => {
    console.log(data)
  };

  const loginForm = (data) => {
    console.log(data)
  };

  return {
    register,
    handleSubmit,
    errors,
    regsiterForm,
    loginForm,
  };
};
