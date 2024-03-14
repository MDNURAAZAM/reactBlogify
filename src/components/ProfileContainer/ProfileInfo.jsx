import React from "react";
import AuthorName from "../AuthorName/AuthorName";
import { baseURL } from "../../../config";
import editIcon from "../../assets/icons/edit.svg";

const ProfileInfo = ({ profile }) => {
  const { id, email, firstName, lastName, avatar, bio } = profile || {};
  const fullName = `${firstName} ${lastName}`;
  const authorImage = `${baseURL}/uploads/avatar/${avatar}`;
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* <!-- profile image --> */}
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          {avatar ? (
            <img
              className="w-full h-full rounded-full"
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

        <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
          <img src={editIcon} alt="Edit" />
        </button>
      </div>
      {/* <!-- name , email --> */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          <AuthorName id={id} fullName={fullName} />
        </h3>
        <p className="leading-[231%] lg:text-lg">{email}</p>
      </div>

      {/* <!-- bio --> */}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        </div>
        {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
        <button className="flex-center h-7 w-7 rounded-full">
          <img src={editIcon} alt="Edit" />
        </button>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileInfo;
