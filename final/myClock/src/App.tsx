import './App.css'
import AnalogClock from './AnalogClock'
import DigiClock from './DigiClock'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import alarmSound from './assets/alarm.mp3';
import useSound from 'use-sound';
import token from './assets/token.json';
import { Tooltip } from 'react-tooltip'

// トップレベルで管理
// time: 現在時刻
// alarmTime: アラーム時刻
// isTooltipOpen: 「予定がありません」の表示
// timer: タイマーの秒数
// countdown: タイマーのカウントダウン秒数表示
// timerCountdowning: タイマーがカウントダウン中かどうか
function App() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [play, { stop }] = useSound(alarmSound);
  const [timer, setTimer] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<string>('00:00:00');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timerCountdowning, setTimerCountdowning] = useState(false);

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
    const timeInput: HTMLInputElement | null = document.querySelector('input[type="time"]');
    // handleSetAlarmByCalendarの場合、時刻の入力の値を予定から取得された値に変更
    if (timeInput && timeInput.value != timeToBeSet) {
      timeInput.value = timeToBeSet ? timeToBeSet : '';
    }
  };

  const handleStopAlarm = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#alarmRinging');
    if (dialog) {
      dialog.close();
    }
    stop();
  };

  // 1秒ごとに現在時刻を更新
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

  const openTimerDialog = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#timerSetting');
    if (dialog) {
      dialog.showModal();
    }
  };
  const closeTimerDialog = () => {
    const dialog: HTMLDialogElement | null = document.querySelector('#timerSetting');
    if (dialog) {
      dialog.close();
    }
  };

  const handleSetAlarmByCalendar = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDateTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0).toISOString();
    const endDateTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 59).toISOString();

    const query = `https://graph.microsoft.com/v1.0/me/calendarView/delta?startDateTime=${startDateTime}&endDateTime=${endDateTime}`;
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();
    if (data.value.length === 0) {
      const setAlarmByCalendarButton: HTMLButtonElement | null = document.querySelector('[data-tooltip-id="setAlarmByCalendar"]');
      const tooltip = document.querySelector('#setAlarmByCalendar');
      if (setAlarmByCalendarButton) {
        // TooltipのisOpenを直接変更するのはだめ、setIsOpenで
        if (tooltip) {
          setIsTooltipOpen(true);
          setTimeout(() => {
            setIsTooltipOpen(false);
          }, 3000);
        }
      }
    } else {
      // Recurrenceで定期イベントかどうかを判断
      if (!data.value[0].recurrence) {
        // 取得したのはUTCなので、日本時間に変換
        const alarmTime = new Date(data.value[0].start.dateTime);
        alarmTime.setHours(alarmTime.getHours() + 9);
        const alarmTimeStr = `${String(alarmTime.getHours()).padStart(2, '0')}:${String(alarmTime.getMinutes()).padStart(2, '0')}`;
        handleSetAlarm(alarmTimeStr);
      } else {
        const alarmTime = new Date(data.value[1].start.dateTime);
        alarmTime.setHours(alarmTime.getHours() + 9);
        const alarmTimeStr = `${String(alarmTime.getHours()).padStart(2, '0')}:${String(alarmTime.getMinutes()).padStart(2, '0')}`;
        handleSetAlarm(alarmTimeStr);
      }
    }
  }

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (timer !== null) {
      const hours = Math.floor(timer / 3600);
      const minutes = Math.floor((timer % 3600) / 60);
      const seconds = timer % 60;
      setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    } else {
      setCountdown('00:00:00');
    }
  }, [timer]);

  useEffect(() => {
    if (countdown === '00:00:00' && timerCountdowning) {
      const dialog: HTMLDialogElement | null = document.querySelector('#alarmRinging');
      if (dialog) {
        dialog.showModal();
      }
      play();
    }
  }, [countdown])

  const handleTimerButtonClick = (seconds: number) => {
    setTimer(seconds);
  };

  const handleTimerStart = () => {
    if (timer !== null) {
      startTimer();
      setTimerCountdowning(true);
    }
  };

  const handleTimerPause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTimerClear = () => {
    setTimerCountdowning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(null);
  };

  return (
    <BrowserRouter>
      <div className="Apps">
        <div className="alarm">
          <button onClick={openAlarmDialog}>アラーム</button>
          <dialog id="alarmSetting">
            <h2>アラーム設定</h2>
            <input
              type="time"
              onChange={(e) => handleSetAlarm(e.target.value)}
            />
            <button data-tooltip-id="setAlarmByCalendar" data-tooltip-content="予定がありません" onClick={handleSetAlarmByCalendar}>明日の朝</button>
            <Tooltip id="setAlarmByCalendar" place="top" isOpen={isTooltipOpen} />
            <button onClick={() => { handleSetAlarm(null) }}>clear</button>
            <button onClick={closeAlarmDialog}>閉じる</button>
          </dialog>
        </div>
        <div className="timer">
          <button onClick={openTimerDialog}>タイマー</button>
          <dialog id="timerSetting">
            <h2>タイマー設定</h2>
            <div id="timers">
              <button onClick={() => handleTimerButtonClick(30)}>30sec</button>
              <button onClick={() => handleTimerButtonClick(60)}>1min</button>
              <button onClick={() => handleTimerButtonClick(120)}>2min</button>
              <button onClick={() => handleTimerButtonClick(300)}>5min</button>
              <button onClick={() => handleTimerButtonClick(600)}>10min</button>
            </div>
            <div id="countdown">
              {countdown}
            </div>
            <button onClick={handleTimerStart}>start</button>
            <button onClick={handleTimerPause}>pause</button>
            <button onClick={handleTimerClear}>clear</button>
            <button onClick={closeTimerDialog}>閉じる</button>
          </dialog>
        </div>
      </div>
      <dialog id="alarmRinging">
        <p>Alarm ringing!</p>
        <button onClick={handleStopAlarm}>OK</button>
      </dialog>
      <Routes>
        <Route path='/' element={<AnalogClock time={time} alarmTime={alarmTime} />} />
        <Route path='/digi' element={<DigiClock time={time} alarmTime={alarmTime} />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App