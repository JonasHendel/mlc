import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { addPoints } from "../store/features/pointsSlice";
import largeairports from "../public/largeairports.json";

const AirportSearch = ({
  geocode,
  setGeocode,
  setAirport,
  onClickFunction,
}) => {
  const dispatch = useDispatch();

  const { airports } = largeairports;

  const initalState = {
    loading: false,
    array: [],
    error: "",
  };

  const [airportArray, setAirportArray] = useState(initalState);
  const [city, setCity] = useState("");

  // useEffect(() => {
  // 	setAirports((prevState) => ({ ...prevState, loading: true }));
  // 	// const getLatLong = (e) => {
  // 	// 	if (city.length >= 1) {
  // 	// 		console.log(city);
  // 	// 		axios.get(`http://144.126.246.115/api/search?city=${city}`).then((res) => {
  // 	// 			console.log(res.data);
  // 	// 			// console.log(lat, lng);

  // 	// 			setAirports((prevState) => ({ ...prevState, array: res.data, loading: false }));
  // 	// 			// const pointObj = {
  // 	// 			// 	name: res.data[0].ap_name,
  // 	// 			// 	coordinates: [lat, lng],
  // 	// 			// };
  // 	// 			// dispatch(addPoints(pointObj));
  // 	// 			if (res.err) {
  // 	// 				setAirports((prevState) => ({ ...prevState, error: res.err, loading: false }));
  // 	// 				console.log(res.err);
  // 	// 			}
  // 	// 		});
  // 	// 	} else {
  // 	// 		setAirports(initalState);
  // 	// 	}
  // 	// };
  // 	getLatLong();
  // }, [city]);

  const searchAirport = (search) => {
    const filteredAirports = airports.filter((airport) =>
      airport.municipality?.toLowerCase().includes(search.toLowerCase())
    );
    filteredAirports.length = 10;
    setAirportArray(filteredAirports);
  };

  console.log(airportArray);
  return (
    <form className="flex justify-between w-full mb-6">
      <div className="relative mx-6 w-96">
        <input
          value={city}
          onChange={(e) => {
            searchAirport(e.target.value);
            setCity(e.target.value);
          }}
          placeholder="Enter city"
          className="w-full h-10 px-1 py-1 bg-transparent border-2 border-gray-500 outline-none rounded-md focus:border-gray-600"
        />
        {airportArray.length > 0 && city.length > 0 && (
          <div className="absolute z-50 w-full px-1 py-1 border-2 border-gray-600 outline-none bg-secondary min-h-10 rounded-md focus:border-gray-600">
            {airportArray.map((airport) => (
              <div
                className="mb-3 ml-2 font-bold cursor-pointer bottom-2"
                onClick={() => {
                  onClickFunction(airport);
                  setCity("");
                }}
              >
                <p className="font-bold text-white">{airport.iata}</p>
                <p className="text-gray-200">{airport.name}</p>
                {/*<div className="w-full mt-1 border-b-2 border-gray-500" />*/}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default AirportSearch;
