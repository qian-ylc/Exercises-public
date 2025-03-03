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
    // https://rios-studio.com/tech/react-hook%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Btimeout%E3%81%A8timeinterval%E3%80%90%E6%AD%A2%E3%81%BE%E3%82%89%E3%81%AA%E3%81%84%E3%83%BB%E9%87%8D%E8%A4%87%E3%81%99%E3%82%8B%E3%80%91
    // Ref: レンダーを跨いで情報を保存
    // ボタンを押したときにインターバルを停止するために、インターバル ID を保持しておく
    // そのため、timerRef という Ref を作成し、その中にインターバル ID を保持
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
        // 既存タイマーをクリア
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setTimer(prev => {
                // prevを1秒ずつ減らす -> timer
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

    // timerの値に基づいてcountdownを更新
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

    // countdownが00:00:00&タイマーが動いていたら、タイマーを止めてアラームを鳴らす
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
        setTimerCountdowning(false);
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