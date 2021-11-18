import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "phosphor-react";
import OptionalMeetingPoints from './OptionalMeetingPoints'

import { addPoints, setPoints, addStopOver } from "../store/features/pointsSlice";
import {
  setMeetingPointTypeDistance,
  setMeetingPointTypeCO2,
} from "../store/features/meetingPointTypeSlice";
import AirportSearch from "./AirportSearch";
import { clearNotify, notifyError } from "../store/features/notifySlice";
import {} from "../store/features/meetingPointSlice";

const SideBar = ({ setShowReport }) => {
  const [geocode, setGeocode] = useState("");

  const dispatch = useDispatch();
  // const [airports, setAirports] = useState([]);
  // const [meetingAirport, setMeetingAirport] = useState(null);
  const [meetingPoint, setMeetingPoint] = useState();

  const [airport, setAirport] = useState();

  const [stopOver, setStopOver] = useState({});

  const startPoints = useSelector((state) => state.startPoints.points);
  const meetingPointMedian = useSelector(
    (state) => state.meetingPoint.point
  );
  const meetingPointType = useSelector(
    (state) => state.meetingPointType.meetingPointType
  );
  const meetingPointsArray = useSelector((state)=>state.meetingPoint.array)

  useEffect(() => {
    setMeetingPoint(
      meetingPointMedian
    );
  }, [meetingPointType,  meetingPointMedian]);

  // consol.log('dfjks', Object.keys(meetingAirport).length);
  // console.log('m', meetingPoint);

  const addAirport = (airport) => {
    const lat = airport.latitude_deg;
    const lng = airport.longitude_deg;
    const pointObj = {
      airport: {
        name: airport.name,
        iata_code: airport.iata_code,
        city: airport.municipality,
        coordinates: [lat, lng],
      },
    };
    dispatch(addPoints(pointObj));
  };

  const removeItem = (point) => {
    const filteredPoints = startPoints.filter(
      (item) => item.airport.coordinates !== point.airport.coordinates
    );
    dispatch(setPoints(filteredPoints));
    if (filteredPoints.length === 0) {
    }
  };

  const addStopOverFunc = (airport, i) => {
    const lat = airport.latitude_deg;
    const lng = airport.longitude_deg;
    const pointObj = {
      index: i,
      airport: {
        name: airport.name,
        iata_code: airport.iata_code,
        city: airport.municipality,
        coordinates: [lat, lng],
      },
    };
    dispatch(addStopOver(pointObj));
  };

  return (
    <div className="absolute flex flex-col justify-start py-5 mt-10 ml-10 w-96 bg-primary max-h-90 z-9999 rounded-xl">
      <p className="w-full mb-2 text-xl font-bold text-center">Add location</p>
      <AirportSearch
        setAirport={setAirport}
        setGeocode={setGeocode}
        geocode={geocode}
        onClickFunction={(airport) => {
          addAirport(airport);
        }}
      />
      <div className="flex flex-col">
        {startPoints &&
          startPoints.map((point, i) => (
            <div className="flex flex-col mb-2">
              <div key={i} className="flex items-center justify-between mx-6 ">
                <div className="leading-5">
                  <p className="font-bold">{point.airport.iata_code}</p>
                  <p className="text-gray-400">
                    {point.airport.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => removeItem(point)}
                    className="w-8 h-8 px-2 text-white bg-red-700 rounded-md"
                  >
                    <X weight="bold" />
                  </button>
                </div>
              </div>
              {stopOver === point && (
                <AirportSearch
                  setAirport={setAirport}
                  setGeocode={setGeocode}
                  geocode={geocode}
                  onClickFunction={(airport) => {
                    addStopOverFunc(airport, i);
                  }}
                />
              )}
            </div>
          ))}
      </div>
      {meetingPoint?.airport?.coordinates && (
        <>
          <div className="mx-6 my-4 bg-gray-500 h-1px rounded-xl" />
          <div className="mx-6">
            <p className="w-full mb-2 text-xl font-bold text-center">
              Meeting Point
            </p>
            <div className="flex w-full justify-evenly">
              {meetingPointsArray.length > 0&&<OptionalMeetingPoints meetingPoint={meetingPoint} meetingPointsArray={meetingPointsArray}/> }
            </div>
            <div className="flex justify-between">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col mb-4">
                <p className="font-bold">{meetingPoint.airport.iata_code}</p>
                <p className="text-gray-300">
                  {meetingPoint.airport.city}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Total Distance</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.tripToAirport.totalDistance)}km
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col mb-4">
                <p className="font-bold">Location</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.airport.coordinates[0] * 1000) / 1000},{" "}
                  {Math.round(meetingPoint.airport.coordinates[1] * 1000) / 1000}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Total CO2</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.tripToAirport.totalCO2) / 1000}t
                </p>
              </div>
            </div>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className={`bg-blue-600 w-full p-2 rounded-md font-bold`}
                onClick={() => {
                  setShowReport((prevState) => !prevState);
                }}
              >
                Show report
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
