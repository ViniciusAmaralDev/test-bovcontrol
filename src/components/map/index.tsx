"use client";
import { MapContainer } from "./styles";
import { LatLng } from "@/src/hooks/usePolygon";
import { Farm } from "@/src/context/FarmContext";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

const drawConfig = {
  polygon: true,
  circle: false,
  circlemarker: false,
  marker: false,
  polyline: false,
  rectangle: false,
};

type Props = {
  farms: Farm[];
  userGeolocation: [number, number];
  handleRemove: (farmIds: string[]) => void;
  handleOpenFarmModal: (farmId: string) => void;
  handleCreatePolygon: (coordinates: LatLng[]) => Promise<void>;
  handleEditFarmPolygon: (farmId: string, coordinates: LatLng[]) => void;
};

const Map = ({
  farms,
  userGeolocation,
  handleRemove,
  handleOpenFarmModal,
  handleCreatePolygon,
  handleEditFarmPolygon,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onCreated = (event: any) => {
    const { layerType, layer } = event;
    if (layerType === "polygon") {
      handleCreatePolygon(
        layer.getLatLngs()[0].map(({ lat, lng }: any) => [lat, lng])
      );
    }
  };

  const onEdited = (event: any) => {
    const { _layers } = event.layers;
    const layers = Object.values(_layers) as any[];
    if (!layers || layers.length === 0) return;

    const farmIds = layers.map((layer) => layer.options.className);
    const coordinates = layers.map((layer) => layer.editing.latlngs[0][0]);

    farmIds.forEach((id, index) => {
      handleEditFarmPolygon(
        id,
        coordinates[index].map(({ lat, lng }: any) => [lat, lng])
      );
    });
  };

  const handleDeleted = (event: any) => {
    const { _layers } = event.layers;
    const layers = Object.values(_layers);
    if (!layers || layers.length === 0) return;
    handleRemove(layers.map((layer: any) => layer.options.className));
  };

  return (
    <MapContainer zoom={16} center={userGeolocation}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FeatureGroup>
        <EditControl
          draw={drawConfig}
          position="topright"
          onEdited={onEdited}
          onCreated={onCreated}
          onDeleted={handleDeleted}
          onDeleteStart={() => setIsDeleting(true)}
          onDeleteStop={() => setIsDeleting(false)}
        />

        {farms.map((farm) => (
          <Polygon
            key={farm.id}
            positions={farm.polygon.coordinates}
            pathOptions={{ className: farm.id }}
            eventHandlers={{
              click: () => {
                if (!isDeleting) handleOpenFarmModal(farm.id);
              },
            }}
          >
            <Marker position={farm.polygon.center}>
              <Popup>{farm.name}</Popup>
            </Marker>
          </Polygon>
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
