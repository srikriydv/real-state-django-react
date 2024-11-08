import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import propertyAPIService from "./propertyAPIService";

const initialState = {
	properties: [],
	property: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// Get all properties
export const getProperties = createAsyncThunk(
	"properties/getAll",
	async (_, thunkAPI) => {
		try {
			return await propertyAPIService.getProperties();
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

// Get property details by slug
export const getPropertyDetail = createAsyncThunk(
	"properties/getDetail",
	async (slug, thunkAPI) => {
		try {
			return await propertyAPIService.getPropertyDetail(slug);
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

export const propertySlice = createSlice({
	name: "property",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Handle getProperties actions
			.addCase(getProperties.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProperties.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.properties = action.payload.results;
			})
			.addCase(getProperties.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// Handle getPropertyDetail actions
			.addCase(getPropertyDetail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPropertyDetail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.property = action.payload;
			})
			.addCase(getPropertyDetail.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;