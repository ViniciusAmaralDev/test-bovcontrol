import { AxiosPromise } from "axios";
import { Coords } from "@/src/hooks/useGeolocation";

export default interface IGeocodingService<T> {
  convertCoordinatesToAddress: (values: Coords) => AxiosPromise<T>;
}
