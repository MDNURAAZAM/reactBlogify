import React from "react";

const PopularBlogItem = ({ blog }) => {
  const { id, title, author, likes } = blog || {};
  const fullName = ` ${author?.firstName} ${author.lastName}`;
  return (
    <li>
      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        by
        <a href="./profile.html">{fullName}</a>
        <span>·</span> {likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
      </p>
    </li>
  );
};

export default PopularBlogItem;
