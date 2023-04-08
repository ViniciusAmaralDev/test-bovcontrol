import styled from "styled-components";
import { FaDrawPolygon } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MapContainer as Map } from "react-leaflet";
import { AiOutlineInfoCircle } from "react-icons/ai";

type FloatingButtonProps = { isEditing?: boolean };

export const MapContainer = styled(Map).attrs({
  zoom: 16,
})`
  height: 100vh;
`;

export const PolygonButton = styled.div`
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  z-index: 1000;
  position: absolute;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  background-color: ${({ isCreating }: { isCreating: boolean }) =>
    isCreating ? "#007bff" : "#FFFFFF"};
`;

export const PolygonIcon = styled(FaDrawPolygon).attrs({
  size: 24,
})``;

export const EditButton = styled.div`
  top: 100px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  z-index: 1000;
  position: absolute;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  background-color: ${({ isEditing }: FloatingButtonProps) =>
    isEditing ? "#007bff" : "#FFFFFF"};
`;

export const EditIcon = styled(FiEdit).attrs({
  size: 24,
})``;

export const InfoButton = styled.div`
  top: 160px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  z-index: 1000;
  position: absolute;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  background-color: ${({ showInfo }: { showInfo: boolean }) =>
    showInfo ? "#FFFFFF" : "#E4B363"};
`;

export const InfoIcon = styled(AiOutlineInfoCircle).attrs({
  size: 24,
})``;
