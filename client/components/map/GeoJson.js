import { FeatureGroup, useMapEvents, Popup } from 'react-leaflet';
import { LayerGroup, Circle, Marker, Polyline } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import styles from '../../styles/CustomMarker.module.css';
import colors from './utils/colors';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { geoDesicMedian, geoDist } from '../../utils/geodesicMedian';
import { useDispatch } from 'react-redux';
import { addCO2, setTrips } from '../../store/features/pointsSlice';
import { setGeoDesicMedian, setClosestAirport, removeMeetingPoint, removeClosestAirport } from '../../store/features/meetingPointSlice';
import emissions from '../../public/emissions.json';
import { v4 as uuidv4 } from 'uuid';

import { closest, getCO2Array } from '../../utils/functions';
import axios from 'axios';

const GeoJson = ({ setTotalCO2}) => {
	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.points);
	const meetingPointMedian = useSelector((state) => state.meetingPoint.geoDesicMedian);
	const meetingAirport = useSelector((state) => state.meetingPoint.closestAirport);
	const meetingPointType = useSelector((state) => state.meetingPointType.meetingPointType);

	// new Point by click on map
	// useMapEvents({
	// 	click(e) {
	// 		let pointObj = {
	// 			name: 'Location',
	// 			coordinates: [Math.round(e.latlng.lat * 1000) / 1000, Math.round(e.latlng.lng * 1000) / 1000],
	// 		};
	// 		dispatch(addPoints(pointObj));
	// 	},
	// });

	const getDataFromStartPoints = async (startPoints) => {
		try {
			return await axios.post(`http://localhost:8000/meetingpoint`, startPoints).then((response) => {
				return { success: response.data };
			});
		} catch (err) {
			console.log({ error: err.message });
		}
	};


	useEffect(async () => {
		let coordinateArray = [];
		startPoints.map((startPoint) => {
			coordinateArray.push(startPoint.airport.coordinates);
		});
		if (coordinateArray.length >= 2) {
			const data = await getDataFromStartPoints(startPoints);
			if (data.success) {
				const { meetingPoints } = data.success;
				const { startPoints } = data.success;
				console.log(meetingPoints);
				dispatch(setClosestAirport(meetingPoints.startPointAirport));
				dispatch(setGeoDesicMedian(meetingPoints.medianAirport));
        dispatch(setTrips(startPoints));
			}
			// dispatch(setPoints());
		}
		if (startPoints.length < 2) {
			dispatch(removeMeetingPoint());
		}
	}, [startPoints]);

	return (
		<FeatureGroup>
			{startPoints.map((startPoint) => (
				<div key={uuidv4()}>
					<StartPoints startPoint={startPoint} />
					{meetingPointMedian.coordinates && (
						<LineToMeetingPoint
							startPoint={startPoint.airport.coordinates}
							meetingPoint={meetingPointType === 'co2' ? (meetingAirport.coordinates ? meetingAirport.coordinates : meetingPointMedian.coordinates) : meetingPointMedian.coordinates}
						/>
					)}
				</div>
			))}
			{meetingPointMedian.coordinates && (
				<MeetingPoint meetingPoint={meetingPointType === 'co2' ? (meetingAirport.coordinates ? meetingAirport.coordinates : meetingPointMedian.coordinates) : meetingPointMedian.coordinates} />
			)}
			{/* {meetingPointMedian.coordinates && <MeetingPoint meetingPoint={meetingPointMedian.coordinates} />} */}
		</FeatureGroup>
	);
};

const MeetingPoint = ({ meetingPoint }) => {
	const customMarkerIcon = divIcon({
		className: styles.meetingPoint,
		iconSize: null,
		iconAnchor: [7.5, 7.5],
	});

	return (
		<LayerGroup>
			<Marker position={meetingPoint} icon={customMarkerIcon} />
		</LayerGroup>
	);
};

const StartPoints = ({ startPoint }) => {
	const customMarkerIcon = divIcon({
		className: styles.marker,
		iconSize: null,
		iconAnchor: [7.5, 7.5],
	});

	const svgIcon = L.icon({
		iconAnchor: [12, 24],
		iconUrl: './airport.svg',
	});

	return (
		<LayerGroup>
			<Marker
				onMouseOver={(e) => {
					e.target.openPopup();
				}}
				onMouseOut={(e) => {
					e.target.closePopup();
				}}
				position={startPoint.airport.coordinates}
				icon={svgIcon}>
				<Popup className='custom-popup'>{startPoint.name}</Popup>
			</Marker>
		</LayerGroup>
	);
};

const LineToMeetingPoint = ({ startPoint, meetingPoint, index }) => {
	const pathOptions = {
		color: '#a3a3a3',
	};
	return <Polyline pathOptions={pathOptions} positions={[startPoint, meetingPoint]} key={index} />;
};

export default GeoJson;
