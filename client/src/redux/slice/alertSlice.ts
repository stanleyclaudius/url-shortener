import { createSlice } from '@reduxjs/toolkit'
import { IAlert } from '../../utils/Interface'

const initialState: IAlert = {}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alert: (state: IAlert, action) => {
      return action.payload
    }
  }
})

export default alertSlice.reducer