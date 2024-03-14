import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/api";

const useProfile = (profileId = "") => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileId?.length > 0) {
      const url = `/profile/${profileId}`;
      setLoading(true);
      axiosInstance
        .get(url)
        .then((response) => {
          setProfile(response?.data);
          setError("");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError("error");
        });
    }
  }, [profileId]);

  return { profile, error, loading };
};

export default useProfile;
