import React from "react";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthorName from "../AuthorName/AuthorName";
import { useAuth } from "../../contexts/AuthContext";
import { baseURL } from "../../../config";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { id, firstName, lastName, avatar } = auth?.user || {};
  const fullName = `${firstName} ${lastName}`;

  const authorImage = `${baseURL}/uploads/avatar/${avatar}`;

  const handleLogClick = () => {
    if (auth?.accessToken) {
      //user logged in
      setAuth({});
    } else {
      //user logged out
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <header>
      <nav className="container">
        {/* <!-- Logo --> */}
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search -->
        <!-- Notes for Developers -->
        <!-- For Logged in User - Write, Profile, Logout Menu -->
        <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create-blog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {id && (
              <li>
                <button
                  disabled={true}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img src={searchIcon} alt="Search" />
                  <span>Search</span>
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleLogClick}
                className="text-white/50 hover:text-white transition-all duration-200"
              >
                {id ? "Logout" : "Login"}
              </button>
            </li>
            {id && (
              <li className="flex items-center" onClick={handleProfileClick}>
                {/* <!-- Circular Div with background color --> */}
                <div className="avater-img bg-orange-600 text-white">
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
                    <span className="">{fullName.charAt(0)}</span>
                  )}
                </div>

                <span className="text-white ml-2">
                  <AuthorName id={id} fullName={fullName} />
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
