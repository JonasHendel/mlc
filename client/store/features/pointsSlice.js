import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
	name: 'points',
	initialState: {
		latLng: [
			{
				name: 'Berlin',
				coordinates: [52.51604, 13.37691],
			},
			{
				name: 'Oslo',
				coordinates: [59.91234, 10.75],
			},
			{
				name: 'London',
				coordinates: [51.50643, -0.12719],
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
