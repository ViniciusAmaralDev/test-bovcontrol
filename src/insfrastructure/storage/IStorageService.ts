import { Farm } from "@/src/context/FarmContext";

export default interface IStorageService {
  getAll: () => Farm[];
  save: (farm: Farm) => void;
  remove: (id: string) => void;
  saveAll: (farms: Farm[]) => void;
  edit: (id: string, values: Farm) => void;
}
