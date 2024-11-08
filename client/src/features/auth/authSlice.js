// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { parse } from 'cookie';

// Utility function to get cookies
const getCookie = (name) => {
  const cookies = parse(document.cookie);
  return cookies[name];
};

const initialState = {
  user: null,
  accessToken: getCookie("access_token") || null,
  refreshToken: getCookie("refresh_token") || null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  isAuthenticated: false, // Track authentication status
};

// Register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    return response; // Return user data after login
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Refresh the access token using the refresh token
export const refreshAccessToken = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const refreshToken = getCookie("refresh_token");

  if (!refreshToken) {
    return thunkAPI.rejectWithValue("No refresh token found");
  }

  try {
    const response = await authService.refreshAccessToken(refreshToken);
    return response; // Return the new access token
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Authenticate user (check if user is authenticated)
export const authenticate = createAsyncThunk("auth/authenticate", async (_, thunkAPI) => {
  try {
    const user = await authService.authenticate();
    return user; // Return authenticated user data if available
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || error.toString());
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// Activate user
export const activate = createAsyncThunk("auth/activate", async (user, thunkAPI) => {
  try {
    return await authService.activate(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.accessToken = action.payload.access_token; // Store access token
        state.refreshToken = action.payload.refresh_token; // Store refresh token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false; // Reset authentication status
      })
      .addCase(activate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(activate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; // Set authenticated flag to true
        state.user = action.payload; // Set authenticated user data
      })
      .addCase(authenticate.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false; // Set authenticated flag to false
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;