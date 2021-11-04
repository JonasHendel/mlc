import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "phosphor-react";

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
    (state) => state.meetingPoint.geoDesicMedian
  );
  const meetingAirport = useSelector(
    (state) => state.meetingPoint.closestAirport
  );
  const meetingPointType = useSelector(
    (state) => state.meetingPointType.meetingPointType
  );

  useEffect(() => {
    setMeetingPoint(
      meetingPointType === "co2" ? meetingAirport : meetingPointMedian
    );
  }, [meetingPointType, meetingAirport, meetingPointMedian]);

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
            <div className="flex flex-col ">
              <div key={i} className="flex items-center justify-between mx-6">
                <div className="">
                  <p className="font-bold">{point.airport.iata_code}</p>
                  <p className="text-gray-300">
                    {Math.round(point.airport.coordinates[0] * 10000) / 10000},{" "}
                    {Math.round(point.airport.coordinates[1] * 10000) / 10000}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      setStopOver(
                        Object.keys(stopOver).length === 0 ? point : {}
                      )
                    }
                    className="h-8 px-2 mr-3 font-semibold text-white text-gray-300 bg-gray-700 rounded-md"
                  >
                    Add stopover
                  </button>
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
      {meetingPoint?.coordinates && (
        <>
          <div className="mx-6 my-4 bg-gray-500 h-1px rounded-xl" />
          <div className="mx-6">
            <p className="w-full mb-2 text-xl font-bold text-center">
              Meeting Point
            </p>
            <div className="flex w-full justify-evenly">
              <button
                className="w-32 h-10 px-2 font-bold text-gray-300 bg-gray-700 rounded-md"
                onClick={() => {
                  dispatch(clearNotify());
                  dispatch(setMeetingPointTypeCO2());
                }}
              >
                Min. CO2
              </button>
              <button
                className="w-32 h-10 px-2 mb-2 font-bold text-gray-300 bg-gray-700 rounded-md"
                onClick={() => {
                  dispatch(setMeetingPointTypeDistance());
                  dispatch(
                    notifyError(
                      "Minimum distance does not equal minimum emissions."
                    )
                  );
                }}
              >
                Min. distance
              </button>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-bold">Location</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.coordinates[0] * 1000) / 1000},{" "}
                  {Math.round(meetingPoint.coordinates[1] * 1000) / 1000}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Total Distance</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.totalDistance)}km
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <p className="font-bold">Total CO2</p>
                <p className="text-gray-300">
                  {Math.round(meetingPoint.totalCO2) / 1000}t
                </p>
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
