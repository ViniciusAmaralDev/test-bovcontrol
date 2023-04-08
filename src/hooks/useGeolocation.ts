import { useEffect, useState } from "react";
import { Address } from "../context/FarmContext";
import geocodingService from "../insfrastructure/services/geocoding/GeocodingService";

export type Coords = { latitude: number; longitude: number };

export default function useGeolocation() {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  const convertCoordinatesToAddress = async (values: Coords) => {
    try {
      const address = {} as Address;
      const { data } = await geocodingService.convertCoordinatesToAddress(
        values
      );

      data.results[0].address_components.forEach((item) => {
        if (item.types.includes("route")) address.street = item.long_name;
        if (item.types.includes("sublocality"))
          address.neighborhood = item.long_name;
        if (item.types.includes("administrative_area_level_2"))
          address.city = item.long_name;
        if (item.types.includes("administrative_area_level_1"))
          address.state = item.short_name;
        if (item.types.includes("country")) address.country = item.long_name;
      });

      return address;
    } catch (error) {
      console.log('ERROR =>', error);
    }
  };

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setCoords([latitude, longitude]);
        },
        () => console.error("ERROR")
      );
    } catch (error) {}
  }, []);

  return { coords, convertCoordinatesToAddress };
}
