import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/general/NotFound'
import Home from './pages/home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App