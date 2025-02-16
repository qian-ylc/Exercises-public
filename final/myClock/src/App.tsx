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
  const [alarmDialogOpen, setAlarmDialogOpen] = useState(false);

  const handleSetAlarm = (timeToBeSet: string | null) => {
    if (timeToBeSet) {
      localStorage.setItem('alarmTime', timeToBeSet);
      setAlarmTime(timeToBeSet);
    } else {
      // clearボタンが押された場合
      localStorage.removeItem('alarmTime');
      const timeInput = document.querySelector('input[type="time"]');
      if (timeInput) {
        timeInput.value = '';
        setAlarmTime(null);
      }
    }
  };

  const handleStopAlarm = () => {
    setIsAlarmRinging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ページ読み込み時にlocalStorageからアラーム時刻を取得
  useEffect(() => {
    const savedAlarmTime = localStorage.getItem('alarmTime');
    if (savedAlarmTime) {
      setAlarmTime(savedAlarmTime);
      const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
      if (timeInput) {
        timeInput.value = savedAlarmTime;
      }
    }
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
      <div className="alarm">
        <button onClick={() => { setAlarmDialogOpen(true) }}>アラーム</button>
        <dialog open={alarmDialogOpen}>
          <h2>アラーム設定</h2>
          <input
            type="time"
            onChange={(e) => handleSetAlarm(e.target.value)}
          />
          <button onClick={() => { handleSetAlarm(null) }}>clear</button>
          <button onClick={() => { setAlarmDialogOpen(false) }}>閉じる</button>
        </dialog>
      </div>
      <dialog open={isAlarmRinging}>
        <p>Alarm ringing!</p>
        <button onClick={handleStopAlarm}>OK</button>
      </dialog>
      <Routes>
        <Route path='/' element={<AnalogClock time={time} alarmTime={alarmTime} />} />
        <Route path='/digi' element={<DigiClock time={time} alarmTime={alarmTime} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
