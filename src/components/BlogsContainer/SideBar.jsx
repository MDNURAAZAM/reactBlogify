import React from "react";
import PopularBlogs from "./PopularBlogs";
import useFavouriteBlogs from "../../hooks/useFavouriteBlogs";
import { useAuth } from "../../contexts/AuthContext";
import FavouriteBlogs from "./FavouriteBlogs";

const SideBar = () => {

  const { auth } = useAuth();

  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <PopularBlogs />

      {auth?.user?.id && (
        <FavouriteBlogs />
      )}
    </div>
  );
};

export default SideBar;
