import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import {addPoints} from '../store/features/pointsSlice'

const AirportSearch = ({ geocode, setGeocode }) => {
	const dispatch = useDispatch();

	const startPoints = useSelector((state) => state.startPoints.latLng);

	const [airportArray, setAirportArray] = useState([]);
	const [city, setCity] = useState('');

	useEffect(() => {
		const getLatLong = (e) => {
			if (city.length >= 1) {
				console.log(city);
				axios.get(`http://localhost:8000/search?city=${city}`).then((res) => {
					console.log(res.data);
					// console.log(lat, lng);

					setAirportArray(res.data);
					// const pointObj = {
					// 	name: res.data[0].ap_name,
					// 	coordinates: [lat, lng],
					// };
					// dispatch(addPoints(pointObj));
					if (res.err) {
						console.log(res.err);
					}
				});
			}
			setAirportArray([]);
		};
		getLatLong();
	}, [city]);

	const addAirport = (airport) => {
		const lat = airport.y;
		const lng = airport.x;
		const pointObj = {
			name: airport.iata,
			coordinates: [lat, lng],
		};
		dispatch(addPoints(pointObj));
    setCity('')
	};

  console.log(city)
	return (
		<form className='flex justify-between mb-6 mx-6'>
			<div>
				<input
					onChange={(e) => {
						setCity(e.target.value);
					}}
					placeholder='Enter city'
					className='bg-transparent border-2 border-gray-700 rounded-md px-1 py-1 h-10 w-52 focus:border-gray-600 outline-none'
				/>
				{city.length > 0 && (
					<div className='w-52 bg-secondary border-2 min-h-10 border-gray-600 rounded-md  px-1 py-1 focus:border-gray-600 outline-none absolute'>
						{airportArray.map((airport) => (
							<div className='cursor-pointer' onClick={() => addAirport(airport)}>
								<p className='text-white font-bold'>{airport.iata}</p>
								<p className='text-gray-200'>{airport.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<button type='submit' className='bg-gray-700 h-10 w-24 rounded-md px-2 text-gray-300'>
				Add Point
			</button>
		</form>
	);
};

export default AirportSearch;
