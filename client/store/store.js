import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './features/pointsSlice';
import meetingPointReducer from './features/meetingPointSlice'

export default configureStore({
  reducer: {
    startPoints: pointsReducer,
    meetingPoint: meetingPointReducer,
  },
});