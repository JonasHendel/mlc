import { createSlice } from '@reduxjs/toolkit';
export const meetingPointTypeSlice = createSlice({
	name: 'meetingPointType',
	initialState: {
		meetingPointType: 'co2',
		loading: false,
		error: null,
	},
	reducers: {
		setMeetingPointTypeDistance: (state) => {
			state.meetingPointType = 'distance';
		},
		setMeetingPointTypeCO2: (state) => {
			state.meetingPointType = 'co2';
		},
	},
});

export const { setMeetingPointTypeCO2, setMeetingPointTypeDistance } = meetingPointTypeSlice.actions;
export default meetingPointTypeSlice.reducer;
