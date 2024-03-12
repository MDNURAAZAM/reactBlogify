import React from "react";
import { useParams } from "react-router-dom";
import SingleBlogContainer from "../components/SingleBlog/SingleBlogContainer";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  return <SingleBlogContainer blogId={blogId} />;
};

export default SingleBlogPage;
