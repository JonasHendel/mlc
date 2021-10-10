import React from 'react';
import dynamic from 'next/dynamic';

const LoadedMap = dynamic(import('./LeafletMap'), {
  ssr: false,
  loading: () => <div><h1>Loading</h1></div>,
});

const Map = ({setTotalCO2}) => <LoadedMap setTotalCO2={setTotalCO2} />

export default Map;