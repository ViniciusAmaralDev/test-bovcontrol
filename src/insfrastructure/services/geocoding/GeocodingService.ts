import { Coords } from "@/src/hooks/useGeolocation";
import GeocodingApi from "../../http/geocoding/GeocodingApi";
import IGeocodingService from "../../http/geocoding/IGeocodingService";
import IGoogleGeocodingResponse from "../../http/geocoding/IGoogleGeocodingResponse";

const geocodingService: IGeocodingService<IGoogleGeocodingResponse> = {
  convertCoordinatesToAddress: async ({ latitude, longitude }: Coords) => {
    return GeocodingApi.get(
      `/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
    );
  },
};

export default geocodingService;
