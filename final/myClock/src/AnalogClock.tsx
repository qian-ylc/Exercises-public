import React, { useEffect, useState } from 'react';
import "./AnalogClock.css";
import { useNavigate } from 'react-router';

const AnalogClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    const radius = 250;
    const center = radius;
    const borderWidth = 5;

    const hourHandLength = radius * 0.5;
    const minuteHandLength = radius * 0.8;
    const secondHandLength = radius * 0.9;

    const hour = time.getHours() % 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const hourAngle = (360 / 12) * hour + (360 / 12) * (minute / 60);
    const minuteAngle = (360 / 60) * minute + (360 / 60) * (second / 60);
    const secondAngle = (360 / 60) * second;

    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleChangePage = () => {
        navigate('/digi');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // svgで時計を描画
    return (
        <>
            <div>
                <svg width={2 * (radius + borderWidth)} height={2 * (radius + borderWidth)}>
                    <circle
                        cx={center + borderWidth}
                        cy={center + borderWidth}
                        r={radius}
                        stroke="black"
                        strokeWidth={borderWidth}
                        fill="none"
                    />
                    {numbers.map((num) => {
                        const angle = (360 / 12) * num;
                        // 数字の座標
                        const x = center + borderWidth + (radius - 30) * Math.sin((Math.PI / 180) * angle);
                        const y = center + borderWidth - (radius - 30) * Math.cos((Math.PI / 180) * angle);
                        // 刻みの座標
                        const tickX1 = center + borderWidth + radius * Math.sin((Math.PI / 180) * angle);
                        const tickY1 = center + borderWidth - radius * Math.cos((Math.PI / 180) * angle);
                        const tickX2 = center + borderWidth + (radius - 10) * Math.sin((Math.PI / 180) * angle);
                        const tickY2 = center + borderWidth - (radius - 10) * Math.cos((Math.PI / 180) * angle);
                        return (
                            <React.Fragment key={num}>
                                <line
                                    x1={tickX1}
                                    y1={tickY1}
                                    x2={tickX2}
                                    y2={tickY2}
                                    stroke="black"
                                    strokeWidth={2}
                                />
                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="30"
                                    fontFamily="Arial"
                                >
                                    {num}
                                </text>
                            </React.Fragment>
                        );
                    })}
                    <line
                        x1={center + borderWidth}
                        y1={center + borderWidth}
                        x2={center + borderWidth + hourHandLength * Math.sin((Math.PI / 180) * hourAngle)}
                        y2={center + borderWidth - hourHandLength * Math.cos((Math.PI / 180) * hourAngle)}
                        stroke="black"
                        strokeWidth={6}
                    />
                    <line
                        x1={center + borderWidth}
                        y1={center + borderWidth}
                        x2={center + borderWidth + minuteHandLength * Math.sin((Math.PI / 180) * minuteAngle)}
                        y2={center + borderWidth - minuteHandLength * Math.cos((Math.PI / 180) * minuteAngle)}
                        stroke="black"
                        strokeWidth={4}
                    />
                    <line
                        x1={center + borderWidth}
                        y1={center + borderWidth}
                        x2={center + borderWidth + secondHandLength * Math.sin((Math.PI / 180) * secondAngle)}
                        y2={center + borderWidth - secondHandLength * Math.cos((Math.PI / 180) * secondAngle)}
                        stroke="red"
                        strokeWidth={2}
                    />
                </svg>
                <div className="button-container">
                    <button onClick={toggleDarkMode}>{darkMode ? "light mode" : "dark mode"}</button>
                    <button className="upperRight" onClick={handleChangePage}>アナログ時計</button>
                </div>
            </div>
        </>
    );
};

export default AnalogClock;