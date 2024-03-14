import React from "react";
import { useParams } from "react-router-dom";
import ProfileContainer from "../components/ProfileContainer/ProfileContainer";

const ProfilePage = () => {
  const { profileId } = useParams();
  return profileId && <ProfileContainer profileId={profileId} />;
};

export default ProfilePage;
