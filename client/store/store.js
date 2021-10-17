import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './features/pointsSlice';
import meetingPointReducer from './features/meetingPointSlice';
import meetingPointTypeReducer from './features/meetingPointTypeSlice';
import notifyReducer from './features/notifySlice';

export default configureStore({
	reducer: {
		startPoints: pointsReducer,
		meetingPoint: meetingPointReducer,
		meetingPointType: meetingPointTypeReducer,
		notify: notifyReducer,
	},
});
