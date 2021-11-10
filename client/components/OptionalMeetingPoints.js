import {useDispatch} from 'react-redux'
import {setMeetingPoint} from "../store/features/meetingPointSlice";

const OptionalMeetingPoints = ({ meetingPoint, meetingPointsArray }) => {
  const dispatch = useDispatch()
  
  const newPoint = (airport) => {
    console.log({airport})
     
    const {ap, trip} = airport
 
    const p =  {
        "name": ap.name,
        "iata_code": ap.iata_code,
        "city": ap.city,
        "coordinates": ap.coordinates,
        "totalCO2": trip.totalCO2,
        "totalDistance": trip.totalDistance,
        "distanceArray": trip.distanceArray
    }
    dispatch(setMeetingPoint(p))
  }


  const Button = ({ airport }) => {
    console.log({airport})
    const roundedCo2NewMP = Math.round(airport.trip.totalCO2 / 1000);
    const roundedCo2MP = Math.round(meetingPoint.totalCO2 / 1000);

    const co2Diff = Math.round(roundedCo2NewMP-roundedCo2MP);
    return (
      <div onClick={()=>{newPoint(airport)}} className="relative w-16">
        {co2Diff > 0 ? (
          <span
            className={`absolute z-50 px-1 text-sm bg-gray-800 border-2
                 text-red-600 border-red-600
             left-10 rounded-md bottom-6`}
          >
            +{co2Diff}t
          </span>
        ) : (
          <span
            className={`absolute z-50 px-1 text-sm bg-gray-800 border-2  text-green-600 border-green-600
             left-10 rounded-md bottom-6`}
          >
            {co2Diff}t
          </span>
        )}
        <button className="w-16 py-1 font-semibold bg-gray-600 rounded-md">
          {airport.ap.iata_code}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-row justify-between w-full my-4">
      {meetingPointsArray.map((airport) => (
        <Button airport={airport} />
      ))}
    </div>
  );
};

export default OptionalMeetingPoints;
