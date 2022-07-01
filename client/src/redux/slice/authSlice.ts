import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { IAuth, ILoginData } from '../../utils/Interface'

const initialState: IAuth = {}

export const login = createAsyncThunk(
  'auth/login',
  async(data: ILoginData, thunkAPI) => {
    try {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { loading: true } })

      const res = await postDataAPI('auth/login', data)
      localStorage.setItem('urlShortify_logged', 'true')

      thunkAPI.dispatch({ type: 'alert/alert', payload: { success: res.data.msg } })

      return {
        token: res.data.accessToken,
        user: res.data.user
      }
    } catch (err: any) {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { error: err.response.data.error } })
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async(_, thunkAPI) => {
    const logged = localStorage.getItem('urlShortify_logged')
    if (logged !== 'true') return

    try {
      const res = await getDataAPI('auth/refresh_token')
      return {
        token: res.data.accessToken,
        user: res.data.user
      }
    } catch (err: any) {
      console.log(err.response.data.err)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async(token: string, thunkAPI) => {
    try {
      const res = await getDataAPI('auth/logout', token)
      localStorage.removeItem('urlShortify_logged')

      thunkAPI.dispatch({ type: 'alert/alert', payload: { success: res.data.msg } })

      return {
        token: '',
        auth: ''
      }
    } catch (err: any) {
      thunkAPI.dispatch({ type: 'alert/alert', payload: { error: err.response.data.error } })
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('auth/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default authSlice.reducer