import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./DigiClock.css";

const DigiClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChangePage = () => {
        navigate('/');
    }

    // 1 -> 01
    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }


    const hour = pad(time.getHours());
    const minute = pad(time.getMinutes());
    const second = pad(time.getSeconds());

    const display = `${hour}:${minute}:${second}`;

    return (
        <>
            <div className="button-container">
                <button onClick={handleChangePage}>アナログ時計</button>
            </div>
            <div className="digi-clock">
                <h1>{display}</h1>
            </div>
        </>
    );
};

export default DigiClock;