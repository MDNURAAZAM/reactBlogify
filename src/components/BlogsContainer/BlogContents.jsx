import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { axiosInstance } from "../../axios/api";
import { blogsPerPage } from "../../../config";

const BlogContents = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axiosInstance.get(
        `/blogs?page=${currentPage}&limit=${blogsPerPage}`
      );
      const data = response?.data;

      const { total, blogs: loadedBlogs } = data || {};

      const hasNext = total > currentPage * blogsPerPage;

      if (!hasNext) {
        setBlogs((prevBlogs) => [...prevBlogs, ...loadedBlogs]);
        setHasMore(false);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...loadedBlogs]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, currentPage]);

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs?.length > 0 &&
        blogs?.map((blog) => <BlogCard key={blog.id} blogDetails={blog} />)}
      {hasMore && <div ref={loaderRef}>Loading more products...</div>}
      {!hasMore && (
        <div style={{ textAlign: "center" }}>All blogs are fetched</div>
      )}
    </div>
  );
};

export default BlogContents;
