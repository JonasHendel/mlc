import React from 'react';
import dynamic from 'next/dynamic';
import Pdf from '../components/Pdf'

const LoadedMap = dynamic(import('../components/Pdf'), {
  ssr: false,
  loading: () => <div><h1>loading</h1></div>,
});

const Map = () => <LoadedMap/>

export default Map;