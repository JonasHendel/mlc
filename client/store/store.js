import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './features/pointsSlice';
import meetingPointReducer from './features/meetingPointSlice'
import meetingPointTypeSlice from './features/meetingPointTypeSlice';

export default configureStore({
  reducer: {
    startPoints: pointsReducer,
    meetingPoint: meetingPointReducer,
    meetingPointType: meetingPointTypeSlice
  },
});