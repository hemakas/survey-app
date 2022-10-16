import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// components
import Header from './components/Header'
// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css'

// auth pages
import Login from './pages/Login'
import Generate from './pages/Generate'
import Responses from './pages/Responses'

// surveyee pages
import Register from './pages/Register'
import Instructions from './pages/Instructions'
import Survey from './pages/Survey'

function App() {
  return (
    <>
      <Router>
        <div>
        <Header />
          
          <Routes>
            {/* auth routes */}
            <Route path='/' element={<Login />} />
            <Route path='/Generate' element={<Generate />} />
            <Route path='/Responses' element={<Responses />} />

            {/* surveyee routes */}
            <Route path='/Register' element={<Register />} />
            <Route path='/Instructions' element={<Instructions />} />
            <Route path='/Survey' element={<Survey />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
