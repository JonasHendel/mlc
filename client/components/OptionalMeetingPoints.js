import {useDispatch} from 'react-redux'
import {setMeetingPoint} from "../store/features/meetingPointSlice";

const OptionalMeetingPoints = ({ meetingPoint, meetingPointsArray }) => {
  const dispatch = useDispatch()
  
  const newPoint = (otherAirport) => {
    dispatch(setMeetingPoint(otherAirport))
  }


  const Button = ({ otherAirport }) => {
    console.log(otherAirport)
    const roundedCo2NewMP = Math.round(otherAirport.tripToAirport.totalCO2 / 1000);
    const roundedCo2MP = Math.round(meetingPoint.tripToAirport.totalCO2 / 1000);

    const co2Diff = Math.round(roundedCo2NewMP-roundedCo2MP);
    return (
      <div onClick={()=>{newPoint(otherAirport)}} className="relative w-16">
        {co2Diff > 0 ? (
          <span
            className={`absolute z-40 px-1 text-sm bg-gray-800 border-2
                 text-red-600 border-red-600
             left-10 rounded-md bottom-6`}
          >
            +{co2Diff}t
          </span>
        ) : (
          <span
            className={`absolute z-40 px-1 text-sm bg-gray-800 border-2  text-green-600 border-green-600
             left-10 rounded-md bottom-6`}
          >
            {co2Diff}t
          </span>
        )}
        <button className="w-16 py-1 font-semibold bg-gray-600 rounded-md">
          {otherAirport.airport.iata_code}
        </button>
      </div>
    );
  };

  console.log({meetingPointsArray})

  return (
    <div className="flex flex-row justify-between w-full my-4">
      {meetingPointsArray.map((airport) => (
        <Button otherAirport={airport} />
      ))}
    </div>
  );
};

export default OptionalMeetingPoints;
