import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
	name: 'points',
	initialState: {
		points: [
			{
				airport: {
					name: 'OSL',
					city: 'Oslo',
					coordinates: ['60.121', '11.0502'],
					latitude: 12,
					longitude: 50,
				},
				trips: {
					toMedian: {
						distance: 423,
						co2: 10,
					},
					toClosestAirport: {
						distance: 423,
						co2: 10,
					},
				},
			},
			{
				airport: {
					name: 'LHR',
					city: 'London',
					coordinates: ['51.4706', '-0.461941'],
					latitude: 12,
					longitude: 50,
				},
				trips: {
					toMedian: {
						distance: 423,
						co2: 10,
					},
					toClosestAirport: {
						distance: 423,
						co2: 10,
					},
				},
			},
			{
				airport: {
					name: 'SXF',
					city: 'Berlin',
					coordinates: ['52.380001', '13.5225'],
					latitude: 12,
					longitude: 50,
				},
				trips: {
					toMedian: {
						distance: 423,
						co2: 10,
					},
					toClosestAirport: {
						distance: 423,
						co2: 10,
					},
				},
			},
		],
	},
	reducers: {
		setPoints: (state, action) => {
			state.latLng = action.payload;
		},
		addPoints: (state, action) => {
			state.latLng.push(action.payload);
		},
		addCO2: (state, action) => {
			state.latLng[action.payload.name].co2 = action.payload.co2;
		},
	},
});

export const { setPoints, addPoints, addCO2 } = pointsSlice.actions;

export default pointsSlice.reducer;