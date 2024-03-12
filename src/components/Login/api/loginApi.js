import { axiosInstance } from "../../../axios/api";

export const login = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response;
};
