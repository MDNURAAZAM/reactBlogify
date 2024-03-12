import React, { useState } from "react";
import image from "../../assets/blogs/React-Roadmap.jpg"
import dotIcon from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

const BlogCard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDotClick = (e) => {
    e.stopPropagation();
    setShowModal((s) => !s);
  };
  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={image}
        alt=""
      />
      <div className="mt-2 relative">
        <a href="./single-blog.html">
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <a href="./single-blog.html">React Roadmap in 2024</a>
          </h3>
        </a>
        <p className="mb-6 text-base text-slate-500 mt-1">
          Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor
          pretium donec dictum. Vici consequat justo enim. Venenatis eget
          adipiscing luctus lorem.
        </p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <a href="./profile.html">Saad Hasan</a>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>100 Likes</span>
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
