import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // ดึง ID จาก URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${id}`);
        setProfile(response.data[0]);
      } catch (err) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div>
      <h2>Profile of {profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
    </div>
  );
};

export default Profile;
