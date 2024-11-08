import api from "../../utils/api";
import Cookies from "js-cookie"; // Import the js-cookie library

const REGISTER_URL = "/api/v1/auth/users/";
const LOGIN_URL = "/api/v1/auth/jwt/create/";
const REFRESH_URL = "/api/v1/auth/jwt/refresh/";
const ACTIVATE_URL = "/api/v1/auth/users/activation/";
const PROFILE_URL = "/api/v1/profile/me";

// Register user
const register = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await api.post(REGISTER_URL, userData, config);
    return response.data;
};

// Login user
const login = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        // Send POST request to the login API to get tokens (access and refresh)
        const response = await api.post(LOGIN_URL, userData, config);

        // If login is successful and response contains the tokens
        if (response.data) {
            const { access, refresh } = response.data;

            // Save the tokens to cookies
            Cookies.set("access_token", access, { expires: 1 }); // expires in 1 day
            Cookies.set("refresh_token", refresh, { expires: 7 }); // expires in 7 days

            // Use the access token to make an authenticated request to the profile endpoint
            const profileConfig = {
                headers: {
                    "Authorization": `Bearer ${access}`,
                },
            };

            const profileResponse = await api.get(PROFILE_URL, profileConfig);

            // Return the profile data along with the tokens
            return profileResponse.data.profile;
        }

        // If login fails, return null
        return null;
    } catch (error) {
        console.error("Login failed", error);
        return null;
    }
};

// Refresh the access token using the refresh token
const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refresh_token"); // Retrieve refresh token from cookies

    if (!refreshToken) {
        return null;
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await api.post(REFRESH_URL, { refresh: refreshToken }, config);

        if (response.data) {
            const { access } = response.data;

            // Save the new access token to cookies
            Cookies.set("access_token", access, { expires: 1 });

            return access;
        }
        return null;
    } catch (error) {
        console.error("Error refreshing access token", error);
        return null;
    }
};

// Check if the user is authenticated (checks if the access token is present)
const authenticate = async () => {
    const accessToken = Cookies.get("access_token"); // Retrieve access token from cookies

    if (accessToken) {
        // Try to fetch the profile using the access token
        const profileConfig = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        };

        try {
            const profileResponse = await api.get(PROFILE_URL, profileConfig);
            return profileResponse.data.profile;
        } catch (error) {
            // If the access token is invalid or expired, attempt to refresh it
            console.log("Access token expired or invalid, trying to refresh.");

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                // Retry fetching the profile with the new access token
                const profileResponse = await api.get(PROFILE_URL, {
                    headers: {
                        "Authorization": `Bearer ${newAccessToken}`,
                    },
                });

                return profileResponse.data.profile;
            }
        }
    }

    return null;
};

// Logout user
const logout = () => {
    Cookies.remove("access_token"); // Remove access token from cookies
    Cookies.remove("refresh_token"); // Remove refresh token from cookies
};

// Activate user
const activate = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await api.post(ACTIVATE_URL, userData, config);
    return response.data;
};

const authService = { register, login, logout, authenticate, activate };

export default authService;