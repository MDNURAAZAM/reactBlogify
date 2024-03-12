import { blogPerPage } from "../../../../config";
import { axiosInstance } from "../../../axios/api";

export const getBlogs = async (page = 1) => {
  const response = await axiosInstance.get(
    `/blogs?page=${page}&limit=${blogPerPage}`
  );
  return response;
};
