import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteDataAPI, getDataAPI, postDataAPI } from './../../utils/fetchData'
import { IDeleteUrl, IShortenUrl, IUrl } from './../../utils/Interface'
import { RootState } from './../store'

const initialState: IUrl[] = []

export const shortenUrl = createAsyncThunk(
  'url/shorten',
  async(data: IShortenUrl, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).url
      thunkAPI.dispatch({ type: 'alert/alert', payload: { loading: true } })

      const res = await postDataAPI('url', data.body, data.token)

      thunkAPI.dispatch({ type: 'alert/alert', payload: { success: 'URL has been shortened. Please check your URL list for further information.' } })

      return [res.data.data, ...state]
    } catch (err: any) {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { error: err.response.data.error } })
    }
  }
)

export const getUrls = createAsyncThunk(
  'url/get',
  async(token: string, thunkAPI) => {
    try {
      const res = await getDataAPI('url', token)
      return res.data.urls
    } catch (err: any) {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { error: err.response.data.error } })
    }
  }
)

export const deleteUrl = createAsyncThunk(
  'url/delete',
  async(data: IDeleteUrl, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).url
      const res = await deleteDataAPI(`url/${data.id}`, data.token)
      thunkAPI.dispatch({ type: 'alert/alert', payload: { success: res.data.msg } })
      
      return state.filter(item => item.shorterUrl !== data.id)
    } catch (err: any) {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { error: err.response.data.error } })
    }
  }
)

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('url/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default urlSlice.reducer