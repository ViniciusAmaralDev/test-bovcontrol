import { ReactNode } from "react";
import { LatLng } from "../hooks/usePolygon";
import { useState, createContext } from "react";

export type PolygonData = {
  center: LatLng;
  coordinates: LatLng[];
};

type Children = { children: ReactNode };

export type Address = {
  city: string;
  state: string;
  street: string;
  country: string;
  neighborhood: string;
};

export type Farm = {
  id: string;
  name: string;
  owner: string;
  address: Address;
  polygon: PolygonData;
};

export type TFarmContext = {
  farms: Farm[];
  setFarms: React.Dispatch<React.SetStateAction<Farm[]>>;
};

export const FarmContext = createContext({} as TFarmContext);

export const FarmProvider = ({ children }: Children) => {
  const [farms, setFarms] = useState<Farm[]>([]);

  return (
    <FarmContext.Provider value={{ farms, setFarms }}>
      {children}
    </FarmContext.Provider>
  );
};
