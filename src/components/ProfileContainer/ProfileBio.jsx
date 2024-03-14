import React, { useEffect, useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import closeIcon from "../../assets/icons/close.svg";
import useAxios from "../../hooks/useAxios";

const ProfileBio = ({ loggedIn, bio }) => {
  const [bioLocal, setBioLocal] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { axiosInstance } = useAxios();

  useEffect(() => {
    setBioLocal(bio);
  }, [bio]);

  const hanldeEditClick = async () => {
    setEditMode((e) => !e);
    if (editMode) {
      try {
        const formData = { bio: bioLocal };
        const response = await axiosInstance.patch("/profile", formData);
        if (response.status == 200) {
          setBioLocal(response?.data?.user?.bio);
        }
      } catch (error) {
        setBioLocal(bio);
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {editMode ? (
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="update bio"
              value={bioLocal}
              onChange={(e) => setBioLocal(e.target.value)}
            ></textarea>
          </div>
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bioLocal}</p>
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {loggedIn && (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={hanldeEditClick}
        >
          <img src={editMode ? closeIcon : editIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
};

export default ProfileBio;
