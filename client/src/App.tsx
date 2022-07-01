import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { refreshToken } from './redux/slice/authSlice'
import { AppDispatch } from './redux/store'
import RedirectPage from './pages/[id]'
import Alert from './components/general/Alert'
import Home from './pages/home'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Alert />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<RedirectPage />} />
      </Routes>
    </Router>
  )
}

export default App