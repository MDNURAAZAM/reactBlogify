import React from "react";
import { useNavigate } from "react-router-dom";

const FavouriteBlogItem = ({ blog }) => {
  const { id, title, tags } = blog || {};

  const navigate = useNavigate()
  const handleBlogClick = () => {
    navigate(`/blogs/${id}`);
  };

  return (
    <li onClick={handleBlogClick}>
      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        {tags
          ?.split(",")
          .map((tag) => `#${tag}`)
          .join(", ")}
        {/* #tailwindcss, #server, #ubuntu */}
      </p>
    </li>
  );
};

export default FavouriteBlogItem;
