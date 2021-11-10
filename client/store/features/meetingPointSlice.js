import { createSlice } from '@reduxjs/toolkit';

export const meetingPointSlice = createSlice({
	name: 'meetingPoint',
	initialState: {
    point: {},
    array: []
	},
	reducers: {
		setMeetingPoint: (state, action) => {
			state.point = action.payload;
		},
		setMeetingPointsArr: (state, action) => {
			state.array = action.payload;
		},
		removeMeetingPoint: (state) => {
			state.point = {};
			state.array = {};
		},
    addCO2: (state,action)=>{
      state.geoDesicMedian.co2 = action.payload
    }
	},
});

export const { setMeetingPoint, setMeetingPointsArr, removeMeetingPoint, addCO2 } = meetingPointSlice.actions;

export default meetingPointSlice.reducer;
