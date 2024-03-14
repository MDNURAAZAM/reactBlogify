import React from "react";
import { baseURL } from "../../../config";
import AuthorName from "../AuthorName/AuthorName";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.svg";
import { useAuth } from "../../contexts/AuthContext";

const SingleComment = ({ comment, onDelete }) => {
  const { auth } = useAuth();
  const { id, content, author, createdAt, isFavourite } = comment || {};
  const authorImage = `${baseURL}/uploads/avatar/${author?.avatar}`;

  const fullName = `${author?.firstName} ${author?.lastName}`;

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${author?.id}`);
  };

  const canDelete = auth?.user?.id == author?.id
  return (
    <div className="flex items-start space-x-4 my-8">
      <div
        className="avater-img bg-orange-600 text-white"
        onClick={handleClick}
      >
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
      <div className="w-full">
        <h5 className="text-slate -500 font-bold">
          <AuthorName id={author?.id} fullName={fullName} />
        </h5>
        <p className="text-slate-300">{content}</p>
      </div>
      {canDelete && (
        <button onClick={() => onDelete(id)}>
          <img src={deleteIcon} alt="delete" />
        </button>
      )}
    </div>
  );
};

export default SingleComment;
