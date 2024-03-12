import React from "react";
import BlogContents from "./BlogContents";
import SideBar from "./SideBar";

const BlogsContainer = () => {
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <BlogContents />
            <SideBar />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogsContainer;
