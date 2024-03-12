import React from "react";
import BlogCard from "./BlogCard";
import useBlogs from "../../hooks/useBlogs";

const BlogContents = () => {
  const { data, error, loading } = useBlogs(1);
  const { total, page, limit, blogs } = data || {};
  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.length > 0 &&
        blogs.map((blog) => <BlogCard key={blog.id} blogDetails={blog} />)}
    </div>
  );
};

export default BlogContents;
