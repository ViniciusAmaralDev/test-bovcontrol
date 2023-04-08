"use client";
import dynamic from "next/dynamic";
import useFarm from "../hooks/useFarm";
import usePolygon from "../hooks/usePolygon";
import useLocation from "../hooks/useGeolocation";
import { Container, LeftContainer, RightContainer } from "./styles";
import SearchBar from "../components/searchBar";
import FarmDropdownList from "../components/dropdown";
import { useEffect, useRef, useState } from "react";
import { Farm } from "../context/FarmContext";
import Maps, { MapsRefProps } from "../components/maps";

const Map = dynamic(() => import("../components/map_old"), { ssr: false });

export default function Home() {
  const { coords } = useLocation();
  const { getPolygonCenter } = usePolygon();
  const { farms, save, edit, remove } = useFarm();
  // console.log(farms)

  const [search, setSearch] = useState("");
  const filtered = farms.filter(({ name }) => name?.includes(search));

  const handleClickEditFarmButton = (farm: Farm) => {};

  return (
    <Container>
      <LeftContainer>
        <Map
          save={save}
          edit={edit}
          farms={farms}
          remove={remove}
          initialPosition={coords}
          getPolygonCenter={getPolygonCenter}
        />
      </LeftContainer>

      <RightContainer>
        <SearchBar onChange={(e) => setSearch(e.target.value)} />

        <FarmDropdownList
          farms={filtered}
          remove={remove}
          amountFarms={farms.length}
          handleClickEditFarmButton={handleClickEditFarmButton}
        />
      </RightContainer>
    </Container>
  );
}
