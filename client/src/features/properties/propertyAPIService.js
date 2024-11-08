import api from "../../utils/api";

//get properties
const getProperties = async () => {
	const response = await api.get("/api/v1/properties/all/");
	return response.data;
};

const propertyAPIService = { getProperties };

export default propertyAPIService;
