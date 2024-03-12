import React from "react";
import BlogCard from "./BlogCard";

const BlogContents = () => {
  return (
    <div className="space-y-3 md:col-span-5">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default BlogContents;
