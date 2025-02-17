import './App.css'
import AnalogClock from './AnalogClock'
import DigiClock from './DigiClock'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { useState, useEffect } from 'react';
import alarmSound from './assets/alarm.mp3';
import useSound from 'use-sound';

// トップレベルで管理
// time: 現在時刻
// alarmTime: アラーム時刻
function App() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [play, { stop }] = useSound(alarmSound);

  const handleSetAlarm = (timeToBeSet: string | null) => {
    if (timeToBeSet) {
      localStorage.setItem('alarmTime', timeToBeSet);
      setAlarmTime(timeToBeSet);
    } else {
      // clearボタンが押された場合
      localStorage.removeItem('alarmTime');
      const timeInput: HTMLInputElement | null = document.querySelector('input[type="time"]');
      if (timeInput) {
        timeInput.value = '';
        setAlarmTime(null);
      }
    }
  };

  const handleStopAlarm = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#alarmRinging');
    if (dialog) {
      dialog.close();
    }
    stop();
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
      const timeInput: HTMLInputElement | null = document.querySelector('input[type="time"]');
      if (timeInput) {
        timeInput.value = savedAlarmTime;
      }
    }
  }, []);

  // 1分ごとにアラームをチェック
  useEffect(() => {
    if (alarmTime) {
      const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
      if (time.getHours() === alarmHour && time.getMinutes() === alarmMinute) {
        const dialog: HTMLDialogElement | null = document.querySelector('#alarmRinging');
        if (dialog) {
          dialog.showModal();
        }
        play()
      }
    }
  }, [time.getMinutes(), alarmTime]);

  // 「open 属性ではなく .show() または .showModal() メソッドを使用することが推奨」
  // ので、stateでopenの設定をしなかった
  const openAlarmDialog = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#alarmSetting');
    if (dialog) {
      dialog.showModal();
    }
  };
  const closeAlarmDialog = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#alarmSetting');
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <BrowserRouter>
      <div className="alarm">
        <button onClick={openAlarmDialog}>アラーム</button>
        <dialog id="alarmSetting">
          <h2>アラーム設定</h2>
          <input
            type="time"
            onChange={(e) => handleSetAlarm(e.target.value)}
          />
          <button onClick={() => { handleSetAlarm(null) }}>clear</button>
          <button onClick={closeAlarmDialog}>閉じる</button>
        </dialog>
      </div>
      <dialog id="alarmRinging">
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
