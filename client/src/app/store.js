import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice"
import propertyReducer from "../features/properties/propertySlice"
import enquiryReducer from '../features/enquiry/enquirySlice';
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
    reducer: {
        properties: propertyReducer,
		auth: authReducer,
        enquiry: enquiryReducer,
        profile: profileReducer
    },
});