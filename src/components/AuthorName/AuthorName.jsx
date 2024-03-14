import React from "react";
import { useNavigate } from "react-router-dom";

const AuthorName = ({ id, fullName }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${id}`);
  };

  return <button onClick={handleClick}>{ fullName}</button>;
};

export default AuthorName;
