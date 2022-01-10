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
			{startPoints.map((startPoint, index) => (
				<div key={uuidv4()}>
					<StartPoints startPoint={startPoint} />
					{meetingPoint.airport?.coordinates && (
            <>
						<LineToMeetingPoint
							startPoint={startPoint.airport.coordinates}
							meetingPoint={meetingPoint}
              index={index}
						/>
            </>
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
            <p>{startPoint.airport.city}</p>
            {/*<p>{Math.round(startPoint.airport.coordinates[0]*100)/100}, {Math.round(startPoint.airport.coordinates[1]*100)/100}</p>*/}
					</div>
				</Tooltip>
			</Marker>
		</LayerGroup>
	);
};

const LineToMeetingPoint = ({ startPoint, meetingPoint, index }) => {
	const mediumDistPath = {
		color: '#a3a3a3',
	};
  const longDistPath = {
    color: 'red',
  };

  const coordinates = meetingPoint.airport.coordinates

  const longDistance = meetingPoint.tripToAirport.distanceArray[index]/1.852 > 2000 ? true : false

  console.log(longDistance)
    
  return <Polyline pathOptions={longDistance ? longDistPath : mediumDistPath} positions={[startPoint, coordinates]} key={index} />;
};

//const LineToMeetingPoint = ({ startPoint, meetingPoint }) => {
	//const mediumDistPath = {
		//color: 'a3a3a3',
	//};
	//const longDistPath = {
		//color: 'a3a3a3',
	//};

  ////console.log({index})
  ////console.log(meetingpoints.triptoairport.distancearray[index])

  ////const longdistance = meetingpoints.triptoairport.distancearray[index] > 2000 ? true : false

  ////console.log({longdistance})


  //return <Polyline pathOptions={mediumDistPath} positions={[startPoint, meetingPoint]}  />;
//};

export default GeoJson;
