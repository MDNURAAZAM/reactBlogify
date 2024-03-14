import React from "react";
import ProfileBlogs from "./ProfileBlogs";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../../hooks/useProfile";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const ProfileContainer = ({ profileId }) => {
  const { profile, error, loading } = useProfile(profileId);

  const { blogs } = profile || {};

  if(loading){
    return <LoadingComponent />
  }

  return (
    <main class="mx-auto max-w-[1020px] py-8">
      <div class="container">
        {/* <!-- profile info --> */}
        <ProfileInfo profile={profile}/>
        {/* <!-- end profile info --> */}

        {blogs?.length > 0 && <ProfileBlogs blogs={blogs} />}
      </div>
    </main>
  );
};

export default ProfileContainer;
