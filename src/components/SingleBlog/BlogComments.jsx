import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/AuthContext";

const BlogComments = ({ comments, loggedIn }) => {
  const { auth } = useAuth();
  const [comment, setComment] = useState("");
  const location = useLocation();
  const { axiosInstance } = useAxios();
  const [commentsLocal, setCommentsLocal] = useState([...comments]);

  const { avatar, firstName, id } = auth?.user || {};

  const handleCommentClick = async () => {
    const url = `${location.pathname}/comment`;
    const formData = { content: comment };
    try {
      const response = await axiosInstance.post(url, formData);
      if (response.status === 200) {
        setCommentsLocal(response?.data?.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDeleteClick = async (id) => {
    let result = window.confirm("Are you sure?");
    if (result) {
      const url = `${location.pathname}/comment/${id}`;
      try {
        const response = await axiosInstance.delete(url);
        if (response.status === 200) {
          setCommentsLocal(response?.data?.comments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({commentsLocal?.length})
        </h2>
        {loggedIn && (
          <div className="flex items -center space-x-4">
            <div
              className="avater-img bg-indigo-600 text-white"
              onClick={handleProfileClick}
            >
              {avatar ? (
                <img
                  className="avater-img"
                  src={authorImage}
                  alt={fullName}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <span className="">{firstName?.charAt(0)}</span>
              )}
            </div>
            <div className="w-full">
              <textarea
                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCommentClick}
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <!-- Comment One --> */}
        {commentsLocal?.length > 0 &&
          commentsLocal?.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              onDelete={(id) => handleDeleteClick(id)}
            />
          ))}
      </div>
    </section>
  );
};

export default BlogComments;
