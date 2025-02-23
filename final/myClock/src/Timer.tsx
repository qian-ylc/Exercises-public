import { useState, useEffect, useRef } from 'react';
import alarmSound from './assets/alarm.mp3';
import useSound from 'use-sound';
import './Timer.css';


const Timer: React.FC = () => {
    // timer: タイマーの秒数
    // countdown: タイマーのカウントダウン秒数表示
    // timerCountdowning: タイマーがカウントダウン中かどうか
    const [play, { stop }] = useSound(alarmSound);
    const [timer, setTimer] = useState<number | null>(null);
    const [countdown, setCountdown] = useState<string>('00:00:00');
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [timerCountdowning, setTimerCountdowning] = useState(false);

    // 「open 属性ではなく .show() または .showModal() メソッドを使用することが推奨」
    // ので、stateでopenの設定をしなかった
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

    const handleStopAlarm = () => {
        const dialog: HTMLDialogElement | null = document.querySelector('.timerRinging');
        if (dialog) {
            dialog.close();
        }
        stop();
    };

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
            const dialog: HTMLDialogElement | null = document.querySelector('.timerRinging');
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
        <>
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
            <dialog className="timerRinging">
                <p>Timer ringing!</p>
                <button onClick={handleStopAlarm}>OK</button>
            </dialog>
        </>
    )
}

export default Timer;