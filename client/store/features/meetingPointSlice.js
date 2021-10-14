import { createSlice } from '@reduxjs/toolkit';

export const meetingPointSlice = createSlice({
	name: 'meetingPoint',
	initialState: {
		geoDesicMedian: {},
		closestAirport: {},
	},
	reducers: {
		setGeoDesicMedian: (state, action) => {
			state.geoDesicMedian = action.payload;
		},
		setClosestAirport: (state, action) => {
			state.closestAirport = action.payload;
		},
		removeMeetingPoint: (state) => {
			state.geoDesicMedian = {};
			state.closestAirport = {};
		},
		removeClosestAirport: (state) => {
			state.closestAirport = {};
		},
	},
});

export const { setGeoDesicMedian, removeMeetingPoint, setClosestAirport, removeClosestAirport } = meetingPointSlice.actions;

export default meetingPointSlice.reducer;
