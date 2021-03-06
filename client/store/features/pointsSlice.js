import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
	name: 'points',
	initialState: {
		points: [
			{
				airport: {
					name: 'OSL',
          iata_code: 'OSL', 
					city: 'Oslo',
					coordinates: ['60.121', '11.0502'],
				},
			},
			{
				airport: {
					name: 'John F Kennedy',
          iata_code: 'JFK',
					city: 'New York',
					coordinates: ['40.64094', '-73.77948'],
				},
			},
			{
				airport: {
					name: 'SXF',
          iata_code: 'SXF',
					city: 'Berlin',
					coordinates: ['52.380001', '13.5225'],
				},
			},
		],
    trips: [],
    stopOver: {}
	},
	reducers: {
		setPoints: (state, action) => {
			state.points = action.payload;
		},
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
		addPoints: (state, action) => {
			state.points.push(action.payload);
		},
    addStopOver: (state, action) => {
      console.log(action.payload)
      const {index, airport} = action.payload
      console.log(index)
      state.points[0].stopOver = airport 

    }
	},
});

export const { setPoints, addPoints, setTrips, addStopOver } = pointsSlice.actions;

export default pointsSlice.reducer;
