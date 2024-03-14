import React from "react";
import AuthorName from "../AuthorName/AuthorName";
import { baseURL } from "../../../config";

import { useAuth } from "../../contexts/AuthContext";
import ProfileBio from "./ProfileBio";
import ProfileImage from "./ProfileImage";

const ProfileInfo = ({ profile }) => {
  const { auth } = useAuth();
  const { id, email, firstName, lastName, avatar, bio } = profile || {};
  const fullName = `${firstName} ${lastName}`;
 
  const loggedIn = auth?.user?.id == id;
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* <!-- profile image --> */}
      <ProfileImage
        fullName={fullName}
        loggedIn={loggedIn}
        avatar={avatar}
      />
      {/* <!-- name , email --> */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          <AuthorName id={id} fullName={fullName} />
        </h3>
        <p className="leading-[231%] lg:text-lg">{email}</p>
      </div>

      {/* <!-- bio --> */}
      <ProfileBio loggedIn={loggedIn} bio={bio} />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
