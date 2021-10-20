import React from 'react';
import dynamic from 'next/dynamic';
import Pdf from '../components/Pdf'

const LoadedPdf = dynamic(import('../components/Pdf'), {
  ssr: false,
  loading: () => <div><h1>loading</h1></div>,
});

const Map = () => <LoadedPdf/>

export default Map;