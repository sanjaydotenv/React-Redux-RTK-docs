import { axiosInstance } from "../../../config/axiosInstance";

export const loginApi = async (credentials) => {
  try {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    console.log("erros in authApi", error);
  }
};

export const hydrateUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data
  } catch (error) {
    console.log("error is hydrateUser", error);
  }
};
