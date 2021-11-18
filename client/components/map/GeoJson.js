import { FeatureGroup, useMapEvents, Tooltip } from 'react-leaflet';
import { LayerGroup,  Marker, Polyline } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import styles from '../../styles/CustomMarker.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addCO2, setTrips, addPoints } from '../../store/features/pointsSlice';
import { setMeetingPoint, removeMeetingPoint, setMeetingPointsArr } from '../../store/features/meetingPointSlice';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

const GeoJson = ({ setTotalCO2 }) => {
	const dispatch = useDispatch();

	// const [airports, setAirports] = useState([]);
	// const [meetingAirport, setMeetingAirport] = useState(null);

	const startPoints = useSelector((state) => state.startPoints.points);
	const meetingPoint = useSelector((state) => state.meetingPoint.point);

	const meetingPointType = useSelector((state) => state.meetingPointType.meetingPointType);

	const getClosestAirport = async (lat, lng) => {
		try {
			return await axios.get(`http://localhost:8000/airports/coordinates?lat=${lat}&lng=${lng}`).then((res) => {
				return res.data;
			});
		} catch (err) {
			console.log(err);
		}
	};

	// new Point by click on map
	useMapEvents({
		click(e) {
      console.log(e.latlng.lat)
      getClosestAirport(e.latlng.lat, e.latlng.lng).then((res) => {
        console.log({res})
        const pointObj = {
          airport: {
            name: res[0].ap.name,
            iata_code: res[0].ap.iata_code ? res[0].ap.iata_code : "No code available",
            city: res[0].ap.municipality,
            coordinates: [res[0].ap.latitude_deg, res[0].ap.longitude_deg],
          },
        };
        console.log({pointObj})
        dispatch(addPoints(pointObj));
      });
		},
	});

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
        console.log(data.success)
				const { meetingPoint } = data.success;
				const { startPoints } = data.success;
				const { airports } = data.success;
        dispatch(setMeetingPoint(meetingPoint));
        dispatch(setMeetingPointsArr(airports));
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
					{meetingPoint.airport?.coordinates && (
						<LineToMeetingPoint
							startPoint={startPoint.airport.coordinates}
							meetingPoint={meetingPoint.airport.coordinates}
						/>
					)}
				</div>
			))}
			{meetingPoint.airport?.coordinates && (
        <MeetingPoint meetingPoint={meetingPoint.airport.coordinates}/>
			)}
      {/*{meetingPoint.coordinates && <MeetingPoint meetingPoint={meetingPointMedian.coordinates} type="median"/>}*/}
		</FeatureGroup>
	);
};

const MeetingPoint = ({ meetingPoint, type }) => {
	const customMarkerIcon = divIcon({
		className: styles.meetingPoint,
		iconSize: null,
		iconAnchor: [7.5, 7.5],
	});

	const customMarkerIcon2 = L.icon({
		iconAnchor: [7.5, 7.5],
    iconUrl: './x.svg',
    iconSize: [15, 15]
	});

	return (
		<LayerGroup>
      <Marker position={meetingPoint} icon={type === 'median' ? customMarkerIcon2 : customMarkerIcon} />
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
				position={startPoint.airport.coordinates}
				icon={svgIcon}>
				<Tooltip className='custom-popup' opacity={0.9} offset={[-50, -60]} autoclose={false}>
					<div>
						<p>{startPoint.airport.iata_code}</p>
						<p>{Math.round(startPoint.airport.coordinates[0]*100)/100}, {Math.round(startPoint.airport.coordinates[1]*100)/100}</p>
					</div>
				</Tooltip>
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
