import { useContext, useEffect } from "react";
import { Farm, FarmContext } from "../context/FarmContext";
import localStorageService from "../insfrastructure/services/localStorage/LocalStorageService";

const useFarm = () => {
  const { farms, setFarms } = useContext(FarmContext);

  const save = (farm: Farm) => {
    setFarms((farms) => [...farms, farm]);
    localStorageService.save(farm);
  };

  const edit = (id: string, values: Farm) => {
    setFarms((farms) => farms.map((farm) => (farm.id === id ? values : farm)));
    localStorageService.edit(id, values);
  };

  const remove = (id: string) => {
    setFarms((farms) => farms.filter((farm) => farm.id !== id));
    localStorageService.remove(id);
  };

  useEffect(() => {
    setFarms(localStorageService.getAll());
  }, []);

  return { farms, save, edit, remove };
};

export default useFarm;
