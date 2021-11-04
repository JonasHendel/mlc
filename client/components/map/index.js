import React from "react";
import dynamic from "next/dynamic";
import Loading from "../Loading";

const LoadedMap = dynamic(import("./LeafletMap"), {
  ssr: false,
  loading: () => <Loading />
});

const Map = ({ setTotalCO2, totalCO2 }) => (
  <LoadedMap totalCO2={totalCO2} setTotalCO2={setTotalCO2} />
);

export default Map;
