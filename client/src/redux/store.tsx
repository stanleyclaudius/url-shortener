import { configureStore } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import alert from './slice/alertSlice'
import auth from './slice/authSlice'

interface IProps {
  children: ReactNode
}

const store = configureStore({
  reducer: {
    alert,
    auth
  }
})

const DataProvider = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default DataProvider

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>