import { FeatureGroup, useMapEvents, Popup } from 'react-leaflet';
import { LayerGroup, Circle, Marker, Polyline } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import styles from '../../styles/CustomMarker.module.css';
import colors from './utils/colors';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { geoDesicMedian, geoDist } from '../../utils/geodesicMedian';
import { useDispatch } from 'react-redux';
import { addPoints } from '../../store/features/pointsSlice';
import { setGeoDesicMedian, setClosestAirport, removeMeetingPoint, removeClosestAirport, addCO2 } from '../../store/features/meetingPointSlice';
import emissions from '../../public/emissions.json';
import { v4 as uuidv4 } from 'uuid';

import { closest, getCO2Array } from '../../utils/functions';

const GeoJson = ({ setTotalCO2 }) => {
	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.latLng);
	const meetingPointMedian = useSelector((state) => state.meetingPoint.geoDesicMedian);
	const meetingAirport = useSelector((state) => state.meetingPoint.closestAirport);
	const meetingPointType = useSelector((state) => state.meetingPointType.meetingPointType);

	const newMeetingPoint = () => {
		if (Boolean(meetingPointMedian.coordinates)) {
			const { distanceArray } = meetingPointMedian;

			const minDistIndex = distanceArray.indexOf(Math.min(...distanceArray));

			console.log('minDistIndex', startPoints[minDistIndex]);

			const coordinateArray = [];
			for (let i = 0; i < startPoints.length; i++) {
				coordinateArray.push(startPoints[i].coordinates);
			}

			console.log('coordinateArray', coordinateArray);
			// distance array to closest airport
			const distanceArrayNew = geoDist(coordinateArray, startPoints[minDistIndex]?.coordinates);

			const co2CCDArr1 = getCO2Array(distanceArray);
			const co2CCDArr2 = getCO2Array(distanceArrayNew);

			console.log('coarr', co2CCDArr1, co2CCDArr2);

			const co2Old = co2CCDArr1.reduce((a, b) => a + b, 0);
			const co2New = co2CCDArr2.reduce((a, b) => a + b, 0);
			console.log('c1', co2Old);
			console.log('c2', co2New);

			const newPoint = {
				coordinates: startPoints[minDistIndex].coordinates,
				distance: Math.round(distanceArrayNew.reduce((a, b) => a + b, 0)),
				distanceArray: distanceArrayNew,
				co2: co2New,
			};
			dispatch(addCO2(co2Old));
			if (co2Old >= co2New) {
				console.log('move to new point suggested');
				dispatch(setClosestAirport(newPoint));
			} else {
				dispatch(removeClosestAirport());
			}
			setTotalCO2(co2Old >= co2New ? co2New : co2Old);
		}
	};

	useEffect(() => {
		console.log('calc mp');
		newMeetingPoint();
	}, [meetingPointMedian]);

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

	console.log('m1', meetingPointMedian);
	console.log('m2', meetingAirport);

	useEffect(() => {
		let coordinateArray = [];
		startPoints.map((startPoint) => {
			coordinateArray.push(startPoint.coordinates);
		});
		if (coordinateArray.length >= 2) {
			console.log('new mp');
			dispatch(setGeoDesicMedian(geoDesicMedian(coordinateArray)));
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
							startPoint={startPoint.coordinates}
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
				position={startPoint.coordinates}
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
