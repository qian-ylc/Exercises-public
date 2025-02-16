import './App.css'
import AnalogClock from './AnalogClock'
import DigiClock from './DigiClock'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { useState, useEffect } from 'react';

// トップレベルで管理
// time: 現在時刻
// alarmTime: アラーム時刻
function App() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  const handleSetAlarm = (timeToBeSet: string | null) => {
    if (timeToBeSet) {
      localStorage.setItem('alarmTime', timeToBeSet);
    } else {
      localStorage.removeItem('alarmTime');
    }
    setAlarmTime(timeToBeSet);
  };
  const handleStopAlarm = () => {
    setIsAlarmRinging(false);
    setAlarmTime(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (alarmTime) {
      const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
      if (time.getHours() === alarmHour && time.getMinutes() === alarmMinute) {
        setIsAlarmRinging(true);
      }
    }
  }, [time, alarmTime]);

  return (
    <BrowserRouter>
      <div id="alarm">
        <input
          type="time"
          onChange={(e) => handleSetAlarm(e.target.value)}
        />
        <button onClick={() => handleSetAlarm(null)}>Clear Alarm</button>
      </div>
      {isAlarmRinging && (
        <div className="modal">
          <div className="modal-content">
            <p>Alarm ringing!</p>
            <button onClick={handleStopAlarm}>OK</button>
          </div>
        </div>
      )}
      <Routes>
        <Route path='/' element={<AnalogClock time={time} alarmTime={alarmTime} />} />
        <Route path='/digi' element={<DigiClock time={time} alarmTime={alarmTime} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
