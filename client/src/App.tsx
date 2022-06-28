import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageRender from './utils/PageRender'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App