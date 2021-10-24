import { FeatureGroup, useMapEvents, Popup } from 'react-leaflet';
import { LayerGroup, Circle, Marker, Polyline } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import styles from '../../styles/CustomMarker.module.css';
import colors from './utils/colors';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { geoDesicMedian, geoDist } from '../../utils/geodesicMedian';
import { useDispatch } from 'react-redux';
import { addCO2 } from '../../store/features/pointsSlice';
import { setGeoDesicMedian, setClosestAirport, removeMeetingPoint, removeClosestAirport } from '../../store/features/meetingPointSlice';
import emissions from '../../public/emissions.json';
import { v4 as uuidv4 } from 'uuid';

import { closest, getCO2Array } from '../../utils/functions';

const GeoJson = ({ setTotalCO2, setTrips }) => {
	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.points);
	const meetingPointMedian = useSelector((state) => state.meetingPoint.geoDesicMedian);
	const meetingAirport = useSelector((state) => state.meetingPoint.closestAirport);
	const meetingPointType = useSelector((state) => state.meetingPointType.meetingPointType);

	startPoints.map((startPoint) => {
		console.log(startPoint.airport.coordinates);
	});

	const newMeetingPoint = () => {
		if (Boolean(meetingPointMedian.coordinates)) {
			const { distanceArray } = meetingPointMedian;

			const minDistIndex = distanceArray.indexOf(Math.min(...distanceArray));

			const coordinateArray = [];
			for (let i = 0; i < startPoints.length; i++) {
				coordinateArray.push(startPoints[i].coordinates);
			}

			// distance array to closest airport
			const distanceArrayNew = geoDist(coordinateArray, startPoints[minDistIndex]?.coordinates);

			const co2CCDArr1 = getCO2Array(distanceArray);
			const co2CCDArr2 = getCO2Array(distanceArrayNew);

			const co2Old = co2CCDArr1.reduce((a, b) => a + b, 0);
			const co2New = co2CCDArr2.reduce((a, b) => a + b, 0);

			const newPoint = {
				coordinates: startPoints[minDistIndex].coordinates,
				distance: Math.round(distanceArrayNew.reduce((a, b) => a + b, 0)),
				distanceArray: distanceArrayNew,
				co2CCDArray: co2CCDArr2,
				co2: co2New,
			};
			if (co2Old >= co2New) {
				dispatch(setClosestAirport(newPoint));
			} else {
				dispatch(removeClosestAirport());
			}
			setTotalCO2(co2Old >= co2New ? co2New : co2Old);
		}
	};

	useEffect(() => {
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

	useEffect(() => {
		let coordinateArray = [];
		startPoints.map((startPoint) => {
			coordinateArray.push(startPoint.airport.coordinates);
		});
		if (coordinateArray.length >= 2) {
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
