import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { addPoints } from '../store/features/pointsSlice';

const AirportSearch = ({ geocode, setGeocode }) => {
	const dispatch = useDispatch();

	const initalState = {
		loading: false,
		array: [],
		error: '',
	};

	const [airports, setAirports] = useState(initalState);
	const [city, setCity] = useState('');

	useEffect(() => {
		setAirports((prevState) => ({ ...prevState, loading: true }));
		const getLatLong = (e) => {
			if (city.length >= 1) {
				console.log(city);
				axios.get(`http://144.126.246.115:8000/search?city=${city}`).then((res) => {
					console.log(res.data);
					// console.log(lat, lng);

					setAirports((prevState) => ({ ...prevState, array: res.data, loading: false }));
					// const pointObj = {
					// 	name: res.data[0].ap_name,
					// 	coordinates: [lat, lng],
					// };
					// dispatch(addPoints(pointObj));
					if (res.err) {
						setAirports((prevState) => ({ ...prevState, error: res.err, loading: false }));
						console.log(res.err);
					}
				});
			} else {
				setAirports(initalState);
			}
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
		setCity('');
		dispatch(addPoints(pointObj));
	};

	console.log(city);
	return (
		<form className='flex justify-between mb-6 mx-6'>
			<div>
				<input
					value={city}
					onChange={(e) => {
						setCity(e.target.value);
					}}
					placeholder='Enter city'
					className='bg-transparent border-2 border-gray-700 rounded-md px-1 py-1 h-10 w-52 focus:border-gray-600 outline-none'
				/>
				{airports.array.length > 0 && city.length > 0 && (
					<div className='w-52 bg-secondary border-2 min-h-10 border-gray-600 rounded-md  px-1 py-1 focus:border-gray-600 outline-none absolute'>
						{airports.array.map((airport) => (
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
