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
    addCO2: (state,action)=>{
      state.geoDesicMedian.co2 = action.payload
    }
	},
});

export const { setGeoDesicMedian, removeMeetingPoint, setClosestAirport, removeClosestAirport, addCO2 } = meetingPointSlice.actions;

export default meetingPointSlice.reducer;
