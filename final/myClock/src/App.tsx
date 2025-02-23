import './App.css'
import AnalogClock from './AnalogClock'
import DigiClock from './DigiClock'
import Alarm from './Alarm';
import Timer from './Timer';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { useState, useEffect } from 'react';

// トップレベルで管理
// time: 現在時刻
function App() {
  const [time, setTime] = useState(new Date());

  // 1秒ごとに現在時刻を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <BrowserRouter>
      <div className="Apps">
        <Alarm time={time} />
        <Timer />
      </div>
      <Routes>
        <Route path='/' element={<AnalogClock time={time} />} />
        <Route path='/digi' element={<DigiClock time={time} />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App