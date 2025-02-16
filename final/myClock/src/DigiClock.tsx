import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./DigiClock.css";

interface Props {
    alarmTime: string | null;
    time: Date;
}

const DigiClock: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const handleChangePage = () => {
        navigate('/');
    }

    // 1:1 -> 01:01
    function pad(d: number) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    const hour = pad(props.time.getHours());
    const minute = pad(props.time.getMinutes());
    const second = pad(props.time.getSeconds());

    const display = `${hour}:${minute}:${second}`;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }, [darkMode]);


    return (
        <>
            <div className="button-container">
                <button onClick={toggleDarkMode}>{darkMode ? "light mode" : "dark mode"}</button>
                <button className="upperRight" onClick={handleChangePage}>アナログ時計</button>
            </div>
            <div className="digi-clock">
                <h1>{display}</h1>
            </div>
        </>
    );
};

export default DigiClock;