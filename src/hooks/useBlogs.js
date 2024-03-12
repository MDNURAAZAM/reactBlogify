import { useState, useEffect } from "react";
import { blogsPerPage } from "../../config";
import { axiosInstance } from "../axios/api";

const useBlogs = (page = 1) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const url = `/blogs?page=${page}&limit=${blogsPerPage}`;
      setLoading(true);
      axiosInstance
        .get(url)
        .then((response) => {
          setData(response?.data);
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError('error');
        });
    
  }, [page, blogsPerPage]);

  return { data, error, loading };
};

export default useBlogs;
