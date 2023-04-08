import { Coords } from "@/src/hooks/useGeolocation";

type PlusCode = { compound_code: string; global_code: string };

export default interface IGoogleGeocodingResponse {
  plus_code: PlusCode;
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      location: Coords;
      location_type: string;
      viewport: Record<string, Coords>;
    };
    place_id: string;
    plus_code: PlusCode;
    types: string[];
  }[];
  status: string;
}
