import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPoints } from '../store/features/pointsSlice';
import geoData from '../public/demoPoints.json';

import Map from '../components/map';
import SideBar from '../components/SideBar';

const Index = () => {
	return (
		<div>
			<SideBar />
			<Map />
		</div>
	);
};

export default Index;
