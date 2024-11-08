// src/services/propertyAPIService.js
import api from "../../utils/api";

// Get all properties
const getProperties = async () => {
	const response = await api.get("/api/v1/properties/all/");
	return response.data;
};

// Get property details by slug
const getPropertyDetail = async (slug) => {
	const response = await api.get(`/api/v1/properties/details/${slug}/`);
	return response.data;
};

const propertyAPIService = { getProperties, getPropertyDetail };

export default propertyAPIService;