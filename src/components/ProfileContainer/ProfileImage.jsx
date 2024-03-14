import React, { useRef, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { baseURL } from "../../../config";

const ProfileImage = ({ fullName, loggedIn, avatar }) => {
  const imageRef = useRef(null);
  const { axiosInstance } = useAxios();
  const [imageUrl, setImageUrl] = useState(
    `${baseURL}/uploads/avatar/${avatar}`
  );

  const handleImageUpload = (event) => {
    event.preventDefault();

    imageRef.current.addEventListener("change", updateImageDisplay);
    imageRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of imageRef.current?.files) {
        formData.append("avatar", file);
      }

      const response = await axiosInstance.post(`/profile/avatar`, formData);
      if (response.status === 200) {
        const updatedAvatar = response?.data?.user?.avatar;
        setImageUrl(`${baseURL}/uploads/avatar/${updatedAvatar}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
        {avatar ? (
          <img
            className="w-full h-full rounded-full"
            src={imageUrl}
            alt={fullName}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150";
            }}
          />
        ) : (
          <span className="">{fullName.charAt(0)}</span>
        )}
      </div>

      {loggedIn && (
        <button
          onClick={handleImageUpload}
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      )}
      <input id="file" type="file" ref={imageRef} hidden />
    </div>
  );
};

export default ProfileImage;
