import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, reset, updateProfile } from "../features/profile/profileSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { authenticate } from "../features/auth/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { profile} = useSelector(
    (state) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [profileData, setProfileData] = useState({
    about_me: "",
    phone_number: "",
    city: "",
    country: "",
    license: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    dispatch(fetchProfile());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess, message]);

  useEffect(() => {
    // Log the profile data whenever the `user` state changes
    // console.log('Updated User Profile:', user);
    if (user) {
      setProfileData({
        about_me: user.about_me || '',
        phone_number: user.phone_number || '',
        city: user.city || '',
        country: user.country || '',
        license: user.license || '',
      });
    }
  }, [user]); // Re-run this when `user` changes

  if (isLoading) {
    return <Spinner />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user.username, profileData);
  
    // Dispatch updateProfile and then fetch the updated profile
    dispatch(updateProfile({ username: user.username, profileData }))
      .then(() => {
        // After the profile is updated, re-fetch the profile to get the updated state
        dispatch(authenticate());
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Profile</h1>
      {user ? (
        <div className="card profile-card p-4">
          <div className="profile-header d-flex align-items-center mb-3">
            <img
              src={user.profile_photo || "/profile_default.png"}
              alt="Profile"
              className="rounded-circle profile-photo me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h3>{user.username}</h3>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="about_me">About Me</label>
                <textarea
                  id="about_me"
                  name="about_me"
                  value={profileData.about_me}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={profileData.phone_number}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="license">License</label>
                <input
                  type="text"
                  id="license"
                  name="license"
                  value={profileData.license}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary mt-3 ms-2"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="profile-details">
              <p><strong>About Me:</strong> {user.about_me}</p>
              <p><strong>Phone Number:</strong> {user.phone_number}</p>
              <p><strong>City:</strong> {user.city}</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>License:</strong> {user.license || "N/A"}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Buyer:</strong> {user.is_buyer ? "Yes" : "No"}</p>
              <p><strong>Seller:</strong> {user.is_seller ? "Yes" : "No"}</p>
              <p><strong>Agent:</strong> {user.is_agent ? "Yes" : "No"}</p>
              <p><strong>Top Agent:</strong> {user.top_agent ? "Yes" : "No"}</p>
              <p><strong>Rating:</strong> {user.rating || "N/A"} / 5</p>
              <p><strong>Number of Reviews:</strong> {user.num_reviews || 0}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary mt-3"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;