import React, { useEffect, useState } from "react";
import ProfileBlogs from "./ProfileBlogs";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../../hooks/useProfile";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import useAxios from "../../hooks/useAxios";

const ProfileContainer = ({ profileId }) => {
  const { profile, error, loading } = useProfile(profileId);
  const { axiosInstance } = useAxios();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (profile?.blogs?.length > 0) {
      setBlogs([...profile?.blogs]);
    }
  }, [profile]);

  const handleDelete = async (id) => {
    let result = window.confirm("Are you sure?");
    if (result) {
      const url = `/blogs/${id}`;
      try {
        const response = await axiosInstance.delete(url);
        if (response.status === 200) {
          const updatedBlogs = blogs?.filter((blog) => blog.id != id);
          setBlogs([...updatedBlogs]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <ProfileInfo profile={profile} />
        {/* <!-- end profile info --> */}

        {blogs?.length > 0 && (
          <ProfileBlogs blogs={blogs} handleDelete={handleDelete} />
        )}
      </div>
    </main>
  );
};

export default ProfileContainer;
