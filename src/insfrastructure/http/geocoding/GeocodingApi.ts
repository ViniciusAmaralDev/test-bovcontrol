import axios from "axios";

const GeocodingApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode",
});

export default GeocodingApi;
