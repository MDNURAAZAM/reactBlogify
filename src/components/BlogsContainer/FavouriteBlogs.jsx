import React from "react";
import useFavouriteBlogs from "../../hooks/useFavouriteBlogs";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import FavouriteBlogItem from "./FavouriteBlogItem";

const FavouriteBlogs = () => {
  const { favouriteBlogs, error, loading } = useFavouriteBlogs();

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="sidebar-card">
      {favouriteBlogs?.length > 0 && (
        <>
          <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
            Your Favourites ❤️
          </h3>

          <ul className="space-y-5 my-5">
            {favouriteBlogs?.map((blog) => (
              <FavouriteBlogItem key={blog.id} blog={blog} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FavouriteBlogs;
