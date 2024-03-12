import React from "react";
import usePopularBlogs from "../../hooks/usePopularBlogs";
import PopularBlogItem from "./PopularBlogItem";

const PopularBlogs = () => {
  const { blogs } = usePopularBlogs();
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {blogs?.length > 0 &&
          blogs?.map((blog) => <PopularBlogItem key={blog.id} blog={blog} />)}
      </ul>
    </div>
  );
};

export default PopularBlogs;
