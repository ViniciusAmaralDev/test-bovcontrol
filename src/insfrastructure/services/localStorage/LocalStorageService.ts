import { Farm } from "@/src/context/FarmContext";
import IStorageService from "../../storage/IStorageService";

const keyStorage = "farms";

const getAll = (): Farm[] => {
  const storage = localStorage.getItem(keyStorage);
  if (storage) return JSON.parse(storage);
  else return [];
};

const save = (farm: Farm): void => {
  const farms = getAll();
  localStorage.setItem(keyStorage, JSON.stringify([...farms, farm]));
};

const saveAll = (farms: Farm[]): void => {
  localStorage.setItem(keyStorage, JSON.stringify(farms));
};

const remove = (id: string): void => {
  const farms = getAll();
  saveAll(farms.filter((farm) => farm.id !== id));
};

const edit = (id: string, values: Farm): void => {
  const farms = getAll();
  saveAll(farms.map((farm) => (farm.id === id ? values : farm)));
};

const localStorageService: IStorageService = {
  getAll,
  save,
  remove,
  edit,
  saveAll,
};

export default localStorageService;
