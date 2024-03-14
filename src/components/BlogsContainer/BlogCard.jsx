import React, { useState } from "react";
import dotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { formatDate } from "../../utils/formatDate";
import { baseURL } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import AuthorName from "../AuthorName/AuthorName";

const BlogCard = ({ blogDetails }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    content,
    thumbnail,
    author,
    tags,
    likes,
    comments,
    createdAt,
  } = blogDetails || {};
  const blogImage = `${baseURL}/uploads/blog/${thumbnail}`;
  const authorImage = `${baseURL}/uploads/avatar/${author?.avatar}`;

  const fullName = `${author?.firstName} ${author?.lastName}`;
  const [showModal, setShowModal] = useState(false);

  const handleDotClick = (e) => {
    e.stopPropagation();
    setShowModal((s) => !s);
  };

  const handleBlogClick = () => {
    navigate(`/blogs/${id}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${author?.id}`);
  };

  return (
    <div className="blog-card" onClick={handleBlogClick}>
      <img
        className="blog-thumb"
        src={blogImage}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/150";
        }}
      />
      <div className="mt-2 relative">
        <Link to={`/blogs/${id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <Link to={`/blogs/${id}`}>{title}</Link>
          </h3>
        </Link>
        <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div
            className="flex items-center capitalize space-x-2"
            onClick={handleProfileClick}
          >
            <div className="avater-img bg-indigo-600 text-white">
              {author?.avatar ? (
                <img
                  className="avater-img"
                  src={authorImage}
                  alt={fullName}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <span className="">{fullName.charAt(0)}</span>
              )}
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <AuthorName id={author?.id} fullName={fullName} />
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>
              {likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
            </span>
          </div>
        </div>

        {/* <!-- action dot --> */}
        <div className="absolute right-0 top-0">
          <button onClick={handleDotClick}>
            <img src={dotIcon} alt="3dots of Action" />
          </button>

          {/* <!-- Action Menus Popup --> */}
          {showModal && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
};

export default BlogCard;
