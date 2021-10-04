import { createSlice } from "@reduxjs/toolkit";

export const meetingPointSlice = createSlice({
  name:'meetingPoint',
  initialState: {
    latLng: []
  },
  reducers: {
    setMeetingPoint: (state, action) => {
      state.latLng = action.payload
    },
    removeMeetingPoint: (state) => {
      state.latLng = []
    }
  }
})

export const {setMeetingPoint, removeMeetingPoint} = meetingPointSlice.actions

export default meetingPointSlice.reducer