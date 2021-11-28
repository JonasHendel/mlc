import airportsArray from "../../server/public/largeairports.json";
import {useDispatch} from 'react-redux'
import {setPoints} from '../store/features/pointsSlice'

const Test = () => {
  // get 3-10 random airports
  // set as startpoints
  
  const dispatch = useDispatch()
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
    return(pointObj)
  };

  const getRandomAirports = () => {
    const airportsArrayLength = airportsArray.airports.length;


    const randNum = Math.random();
    const numberOfAirports = Math.round(randNum * 3 + randNum * 10);

    let airports = [];
    for (let i = 0; i <= numberOfAirports; i++) {
      const airportIndex = Math.round(Math.random() * airportsArrayLength);
      const airport = airportsArray.airports[airportIndex];
      airports.push(addAirport(airport));
    }
    console.log(airports)
      
    dispatch(setPoints(airports))
  };


  return (
    <button onClick={getRandomAirports} className={`bg-blue-600 w-full p-2 rounded-md font-bold`}>
      Test
    </button>
  );
};

export default Test;
