// import ProfileUpdatePage from "../../pages/ProfileUpdatePage";
import api from "../../utils/api";
import Cookies from "js-cookie"; // Import js-cookie

// Define API endpoints
const GET_PROFILE_URL = "/api/v1/profile/me/";
const UPDATE_PROFILE_URL = "/api/v1/profile/update/";

const getProfile = async () => {
  const token = Cookies.get("access_token"); // Get the access token from cookies

  if (!token) {
    throw new Error("No access token found");
  }

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await api.get(GET_PROFILE_URL, config); // Send request with headers
  console.log(response.data);
  return response.data;
};

// Update profile
const updateProfile = async (username, profileData) => {
  console.log("profile", username, profileData);
  const token = Cookies.get("access_token");
  console.log(token) // Get the access token from cookies

  if (!token) {
    throw new Error("No access token found");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const response = await api.patch(`${UPDATE_PROFILE_URL}${username}/`, profileData, config);
  return response.data;
};

const profileAPIService = { getProfile, updateProfile };
export default profileAPIService;