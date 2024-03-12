import React from "react";
import { Link } from "react-router-dom";

const AuthorName = () => {
  return (
    <Link to={"/profile"}>
      <span className="text-white ml-2">Saad Hasan</span>
    </Link>
  );
};

export default AuthorName;
