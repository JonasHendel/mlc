import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPoints } from '../store/features/pointsSlice';
import geoData from '../public/demoPoints.json';

import Map from '../components/map';
import SideBar from '../components/SideBar';

const Index = () => {
  const [totalCO2, setTotalCO2] = useState('')
  console.log('x',totalCO2)
	return (
		<div>
			<SideBar totalCO2={totalCO2} />
			<Map setTotalCO2={setTotalCO2} />
		</div>
	);
};

export default Index;
