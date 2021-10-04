import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoints, setPoints } from '../store/features/pointsSlice';

const SideBar = () => {
	const [geocode, setGeocode] = useState('');

	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.latLng);
	const meetingPoint = useSelector((state) => state.meetingPoint.latLng);

	const getLatLong = (e) => {
		e.preventDefault();
		if (geocode.length > 1) {
			axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${geocode}&apiKey=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`).then((res) => {
				const lat = res.data.items[0].position.lat;
				const lng = res.data.items[0].position.lng;
				console.log(res.data.items);
				console.log(lat, lng);
				const pointObj = {
					name: res.data.items[0].address.city,
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
		<div className='w-96 py-5 absolute bg-primary shadow-even z-9999 mt-10 ml-10 flex flex-col justify-start rounded-xl'>
			<p className='font-bold text-xl w-full text-center mb-2'>Add location</p>
			<form className='flex justify-between mb-6 mx-6' onSubmit={getLatLong}>
				<input
					value={geocode}
					onChange={(e) => {
						setGeocode(e.target.value);
					}}
					placeholder='Enter city'
					className='bg-transparent border-2 border-gray-700 rounded-md px-1 py-1 h-10 w-52 focus:border-gray-400 outline-none'
				/>
				<button type='submit' className='bg-gray-700 h- w-24 rounded-md px-2 text-gray-300'>
					Add Point
				</button>
			</form>
			<div className='flex flex-col'>
				{startPoints &&
					startPoints.map((point) => (
						<div className='flex justify-between items-center mx-6'>
							<div className=''>
								<p className='font-bold'>{point.name}</p>
								<p className='text-gray-300'>
									{point.coordinates[0]}, {point.coordinates[1]}
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
								<p className='text-gray-300'>{Math.round(meetingPoint.distance * 15.5995305164) / 1000}t</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SideBar;
