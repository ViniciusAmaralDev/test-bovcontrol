import axios from "axios";

const GeocodingApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GEOCODING_API_URL,
});

export default GeocodingApi;
