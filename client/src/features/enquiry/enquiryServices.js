// enquiryAPIService.js
import api from "../../utils/api";

// Define API endpoints
const SUBMIT_ENQUIRY_URL = "/api/v1/enquiries/";  // Adjust URL as needed

// Submit an enquiry
const submitEnquiry = async (enquiryData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await api.post(SUBMIT_ENQUIRY_URL, enquiryData, config);
  return response.data;
};

const enquiryAPIService = { submitEnquiry };
export default enquiryAPIService;