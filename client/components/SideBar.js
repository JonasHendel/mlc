import axios from 'axios';
import qs from 'qs';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoints, setPoints } from '../store/features/pointsSlice';

import AirportSearch from './AirportSearch';

const SideBar = ({ totalCO2 }) => {
	const [geocode, setGeocode] = useState('');
  const [meetingPointType, setMeetingPointType] = useState('');

	const dispatch = useDispatch();
	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.latLng);
	const meetingPoint = useSelector((state) => state.meetingPoint.latLng);

	const getLatLong = (e) => {
		e.preventDefault();
		if (geocode.length > 1) {
			axios.get(`http://localhost:8000/search?city=${geocode}`).then((res) => {
				const lat = res.data[0].y;
				const lng = res.data[0].x;
				console.log(res.data);
				// console.log(lat, lng);
				const pointObj = {
					name: res.data[0].ap_name,
					coordinates: [lat, lng],
				};
				dispatch(addPoints(pointObj));

				if (res.err) {
					console.log(res.err);
				}
			});
		}
		setGeocode('');
	};

	const removeItem = (point) => {
		const filteredPoints = startPoints.filter((item) => item.coordinates !== point.coordinates);
		dispatch(setPoints(filteredPoints));
		if (filteredPoints.length === 0) {
		}
	};

	return (
		<div className='w-96 py-5 absolute bg-primary  z-9999 mt-10 ml-10 flex flex-col justify-start rounded-xl'>
			<p className='font-bold text-xl w-full text-center mb-2'>Add location</p>
			<AirportSearch getLatLong={getLatLong} setGeocode={setGeocode} geocode={geocode}/>
			<div className='flex flex-col'>
				{startPoints &&
					startPoints.map((point, i) => (
						<div key={i} className='flex justify-between items-center mx-6'>
							<div className=''>
								<p className='font-bold'>{point.name}</p>
								<p className='text-gray-300'>
									{Math.round(point.coordinates[0]*10000)/10000}, {Math.round(point.coordinates[1]*10000)/10000}
								</p>
							</div>
							<button onClick={() => removeItem(point)} className='bg-red-700 h-8 w-24 rounded-md px-2 text-red-300'>
								Remove
							</button>
						</div>
					))}
			</div>
			{meetingPoint.coordinates && (
				<>
					<div className='h-1px rounded-xl bg-gray-500 mx-6 my-4' />
					<div className='mx-6'>
						<p className='font-bold text-xl w-full text-center mb-2'>Meeting Point</p>
            <div>
              <button>Min. CO2</button>
              <button>Min. distance</button>
            </div>
						<div className='flex justify-between'>
							<div className='flex flex-col'>
								<p className='font-bold'>Location</p>
								<p className='text-gray-300'>
									{Math.round(meetingPoint.coordinates[0] * 1000) / 1000}, {Math.round(meetingPoint.coordinates[1] * 1000) / 1000}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='font-bold'>Total Distance</p>
								<p className='text-gray-300'>{meetingPoint.distance}km</p>
							</div>
						</div>
						<div className='mt-2 flex justify-between'>
							<div className='flex flex-col'>
								<p className='font-bold'>Total CO2</p>
								<p className='text-gray-300'>{Math.round(totalCO2 / 1000)}t</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SideBar;
