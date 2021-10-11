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
import { setMeetingPoint, removeMeetingPoint } from '../../store/features/meetingPointSlice';
import emissions from '../../public/emissions.json';
import { v4 as uuidv4 } from 'uuid';

const GeoJson = ({ setTotalCO2 }) => {
	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.latLng);
	const meetingPoint = useSelector((state) => state.meetingPoint.latLng);

	const newMeetingPoint = () => {
		if (Boolean(meetingPoint.coordinates)) {
			const { distanceArray } = meetingPoint;
			const minDistIndex = distanceArray.indexOf(Math.min(...distanceArray));

			console.log('minDistIndex', startPoints[minDistIndex]);

			const coordinateArray = [];
			for (let i = 0; i < startPoints.length; i++) {
				coordinateArray.push(startPoints[i].coordinates);
			}

			const distanceArrayNew = geoDist(coordinateArray, startPoints[minDistIndex]?.coordinates);

			const totalDist1 = meetingPoint.distance;
			const totalDist2 = distanceArrayNew.reduce((a, b) => a + b, 0);

			const distArr = [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];

			const closest = (array, input) => {
				const value = array.reduce((prev, curr) => {
					return Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev;
				});

				return value;
			};

			const co2CCDArr1 = [];
			const co2CCDArr2 = [];
			distanceArray.map((item) => {
				const itemDistNm = item * 0.539957;
				const distVal = closest(distArr, itemDistNm);

				const co2for1NM = emissions.CCD.SMR[distVal].CO2 / distVal;

				let co2ForCCD = co2for1NM * itemDistNm;

				if (itemDistNm !== 0) co2ForCCD = co2ForCCD + 4000;

				co2CCDArr1.push(co2ForCCD);
			});

			distanceArrayNew.map((item) => {
				const itemDistNm = item * 0.539957;
				const distVal = closest(distArr, itemDistNm);

				const co2for1NM = emissions.CCD.SMR[distVal].CO2 / distVal;

				let co2ForCCD = co2for1NM * itemDistNm;
				console.log(itemDistNm);

				if (itemDistNm !== 0) co2ForCCD = co2ForCCD + 4000;

				co2CCDArr2.push(co2ForCCD);
			});

			console.log(co2CCDArr2);

			const co2Old = co2CCDArr1.reduce((a, b) => a + b, 0);
			const co2New = co2CCDArr2.reduce((a, b) => a + b, 0);

			const newPoint = {
				coordinates: startPoints[minDistIndex].coordinates,
				distance: Math.round(distanceArrayNew.reduce((a, b) => a + b, 0)),
				distanceArray: distanceArrayNew,
			};

			if (co2Old >= co2New) {
				console.log('move to new point suggested');
				setMeetingAirport(newPoint);
			}
			setTotalCO2(co2Old >= co2New ? co2New : co2Old);
		}
	};

	useEffect(() => {
		newMeetingPoint();
	}, [meetingPoint]);

	// useMapEvents({
	// 	click(e) {
	// 		let pointObj = {
	// 			name: 'Location',
	// 			coordinates: [Math.round(e.latlng.lat * 1000) / 1000, Math.round(e.latlng.lng * 1000) / 1000],
	// 		};
	// 		dispatch(addPoints(pointObj));
	// 	},
	// });

	console.log(meetingAirport);
	console.log(meetingPoint);

	useEffect(() => {
		// setAirports([]);
		// for (let i = 0; i < startPoints.length; i++) {
		// 	axios.get(`https://airlabs.co/api/v9/nearby?lat=${startPoints[i][0]}&lng=${startPoints[i][1]}&distance=100&api_key=b7c81cbe-2709-4ab2-a54e-ee640c3b95a7`).then((res) => {
		//     console.log(res)
		// 		const lat = res.data.response.airports[0].lat;
		// 		const lng = res.data.response.airports[0].lng;
		// 		setAirports((prevState) => [...prevState, [lat, lng]]);
		// 	});
		// }
		let coordinateArray = [];
		startPoints.map((startPoint) => {
			coordinateArray.push(startPoint.coordinates);
		});
		if (coordinateArray.length >= 2) {
			dispatch(setMeetingPoint(geoDesicMedian(coordinateArray)));
		}
		if (startPoints.length < 2) {
			dispatch(removeMeetingPoint());
		}
	}, [startPoints]);

	// useEffect(async () => {
	// 	if (airports.length > 0) {
	// 		setMeetingAirport(geoDesicMedian(airports));
	// 	}
	// }, [meetingPoint]);

	return (
		<FeatureGroup>
			{/* {airports.length > 0 &&
				airports.map((airport, index) => (
					<>
						<Airport airport={airport} key={index} />
					</>
				))} */}
			{startPoints.map((startPoint, index) => (
				<div key={uuidv4()}>
					<StartPoints startPoint={startPoint} />
					{meetingPoint.coordinates && <LineToMeetingPoint startPoint={startPoint.coordinates} meetingPoint={meetingAirport ? meetingAirport.coordinates : meetingPoint.coordinates} />}
				</div>
			))}
			{meetingPoint.coordinates && <MeetingPoint meetingPoint={meetingAirport ? meetingAirport.coordinates : meetingPoint.coordinates} />}
		</FeatureGroup>
	);
};

const Airport = ({ airport }) => {
	const svgIcon = L.icon({
		iconAnchor: [12, 24],
		iconUrl: './airport.svg',
	});
	return (
		<>
			<Marker position={airport} icon={svgIcon} />
		</>
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
