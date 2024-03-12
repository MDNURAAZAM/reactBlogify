import { axiosInstance } from "../../../axios/api";

export const register = async (formData) => {
  const response = await axiosInstance.post("/auth/register", formData);
  return response;
};