import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/api";

const usePopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `/blogs/popular`;
    setLoading(true);
    axiosInstance
      .get(url)
      .then((response) => {
        setBlogs(response?.data?.blogs);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError("error");
      });
  }, []);

  return { blogs, error, loading };
};

export default usePopularBlogs;
