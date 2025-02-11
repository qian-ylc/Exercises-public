import './App.css'
import AnalogClock from './AnalogClock'
import DigiClock from './DigiClock'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AnalogClock />} />
        <Route path='/digi' element={<DigiClock />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
