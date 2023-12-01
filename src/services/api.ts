import axios from "axios";

const instance = axios.create({
  baseURL: "https://airbnb13.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI,
  },
});

export const searchByLocation = async (params: {
  location: string;
  checkin: string;
  checkout: string;
  adults: string;
  children: string;
  infants: string;
  pets: string;
  page: string;
  currency: string;
}) => {
  console.log("Request parameters:", params); // Log the request parameters
  try {
    const response = await instance.get("/search-location", { params });
    console.log("API response:", response.data); // Log the full API response
    return response.data.results; // Return only the results array
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
