import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Alert from './components/general/Alert'
import NotFound from './components/general/NotFound'
import Home from './pages/home'
import { refreshToken } from './redux/slice/authSlice'
import { AppDispatch } from './redux/store'

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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App