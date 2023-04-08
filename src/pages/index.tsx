import uuid from "react-uuid";
import { useState } from "react";
import dynamic from "next/dynamic";
import useFarm from "../hooks/useFarm";
import useGeolocation from "../hooks/useGeolocation";
import usePolygon, { LatLng } from "../hooks/usePolygon";
import FarmModal, { FarmData } from "../components/farmModal";
import { Address, Farm, PolygonData } from "../context/FarmContext";

const Map = dynamic(() => import("../components/map"), { ssr: false });

export default function Home() {
  const { getCenterCoordinates } = usePolygon();
  const { farms, save, edit, remove } = useFarm();
  const { coords, convertCoordinatesToAddress } = useGeolocation();

  const [address, setAddress] = useState<Address>();
  const [selectedFarm, setSelectedFarm] = useState<Farm>();
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [polygon, setPolygon] = useState({} as PolygonData);

  const handleCreatePolygon = async (coordinates: LatLng[]) => {
    const center = getCenterCoordinates(coordinates);
    setPolygon({ center, coordinates });
    setShowFarmModal(true);

    try {
      const address = await convertCoordinatesToAddress({
        latitude: center[0],
        longitude: center[1],
      });
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFarm = (farm: FarmData) => {
    if (selectedFarm) {
      edit(selectedFarm.id, {
        id: selectedFarm.id,
        ...farm,
        polygon: selectedFarm.polygon,
      });
    } else save({ id: uuid(), ...farm, polygon });

    handleCloseFarmModal();
  };

  const handleRemove = (farmIds: string[]) => {
    farmIds.forEach((id) => remove(id));
  };

  const handleCloseFarmModal = () => {
    setShowFarmModal(false);
    setSelectedFarm(undefined);
    setAddress(undefined);
  };

  const handleEditFarmPolygon = (farmId: string, coordinates: LatLng[]) => {
    const center = getCenterCoordinates(coordinates);
    const farm = farms.find((farm) => farm.id === farmId)!;
    edit(farmId, { ...farm, polygon: { center, coordinates } });
  };

  const handleOpenFarmModal = (farmId: string) => {
    setSelectedFarm(farms.find((farm) => farm.id === farmId));
    setShowFarmModal(true);
  };

  return (
    <>
      <Map
        farms={farms}
        userGeolocation={coords}
        handleRemove={handleRemove}
        handleOpenFarmModal={handleOpenFarmModal}
        handleCreatePolygon={handleCreatePolygon}
        handleEditFarmPolygon={handleEditFarmPolygon}
      />

      <FarmModal
        address={address}
        farm={selectedFarm}
        isVisible={showFarmModal}
        handleFarm={handleFarm}
        onClose={handleCloseFarmModal}
      />
    </>
  );
}
