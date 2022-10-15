import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// auth pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Welcome from './pages/Welcome'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          
          <Routes>
            {/* auth routes */}
            <Route path='/' element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Welcome' element={<Welcome />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
