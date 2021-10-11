import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
	name: 'points',
	initialState: {
		latLng: [
			{
				name: 'OSL',
				coordinates: ['60.121', '11.0502'],
			},
			{
				name: 'LHR',
				coordinates: ['51.4706', '-0.461941'],
			},
			{
				name: 'SXF',
				coordinates: ['52.380001', '13.5225'],
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
	},
});

export const { setPoints, addPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
