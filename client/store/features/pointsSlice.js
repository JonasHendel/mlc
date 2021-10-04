import {createSlice} from '@reduxjs/toolkit'

export const pointsSlice = createSlice({
  name:"points",
  initialState: {
    latLng: []
  },
  reducers: {
    setPoints: (state, action) => {
      state.latLng = action.payload
    },
    addPoints: (state, action) => {
      state.latLng.push(action.payload)
    }
  }
})

export const {setPoints, addPoints} = pointsSlice.actions

export default pointsSlice.reducer