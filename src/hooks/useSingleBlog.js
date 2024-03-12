import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/api";

const useSingleBlog = (blogId = "") => {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blogId?.length > 0) {
      const url = `/blogs/${blogId}`;
      setLoading(true);
      axiosInstance
        .get(url)
        .then((response) => {
          setBlog(response?.data);
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError("error");
        });
    }
  }, [blogId]);

  return { blog, error, loading };
};

export default useSingleBlog;
