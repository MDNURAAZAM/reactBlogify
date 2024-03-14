import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const useFavouriteBlogs = () => {
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {axiosInstance} = useAxios()

  useEffect(() => {
    const url = `/blogs/favourites`;
    setLoading(true);
    axiosInstance
      .get(url)
      .then((response) => {
        setFavouriteBlogs(response?.data?.blogs);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError("error");
      });
  }, []);

  return { favouriteBlogs, error, loading };
};

export default useFavouriteBlogs;
