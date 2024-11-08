import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryAPIService from "./enquiryServices.js";

const initialState = {
  enquiries: [],
  enquiry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Submit an enquiry
export const submitEnquiry = createAsyncThunk(
  "enquiries/submit",
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryAPIService.submitEnquiry(enquiryData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    reset: (state) => {
      state.enquiries = [];
      state.enquiry = {};
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
        state.message = "Enquiry submitted successfully!";
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = enquirySlice.actions;
export default enquirySlice.reducer;