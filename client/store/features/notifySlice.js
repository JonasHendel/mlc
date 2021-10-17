import { createSlice } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
	name: 'notify',
  initialState: {
    success: '',
    error: ''
  },
  reducers: {
    notifySuccess: (state, action) => {
      state.success = action.payload
      state.error = ''
    },
    notifyError: (state, action) => {
      state.error = action.payload
      state.success = ''
    },
    clearNotify: (state, action) => {
      state.error = ''
      state.success = ''
    }
  }
});

export const {notifyError, notifySuccess, clearNotify} = notifySlice.actions

export default notifySlice.reducer