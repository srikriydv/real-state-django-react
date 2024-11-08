import api from "../../utils/api";

const REGISTER_URL = "/api/v1/auth/users/";
const LOGIN_URL = "/api/v1/auth/jwt/create/";
const ACTIVATE_URL = "/api/v1/auth/users/activation/";

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

    // Send POST request to the login API to get tokens (access and refresh)
    const response = await api.post(LOGIN_URL, userData, config);
    
    // If login is successful and response contains the tokens
    if (response.data) {
        const { access, refresh } = response.data;  // Assuming the tokens are in the response

        // Save the tokens to local storage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Use the access token to make an authenticated request to the profile endpoint
        const profileConfig = {
            headers: {
                "Authorization": `Bearer ${access}`,  // Use the access token for Authorization
            },
        };

        // Request user profile information using the access token
        const profileResponse = await api.get("/api/v1/profile/me", profileConfig);

        // Return the profile data along with the tokens
        return profileResponse.data.profile;
    }
    
    // If login fails, return null
    return null;
};

const logout = () => localStorage.removeItem("user");

const activate = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await api.post(ACTIVATE_URL, userData, config);
	return response.data;
};

const authService = { register, login, logout, activate };

export default authService;