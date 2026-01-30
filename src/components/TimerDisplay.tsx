import React from 'react';
import './TimerDisplay.css';

interface TimerDisplayProps {
    remainingSeconds: number;
    totalSeconds: number;
    isActive: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingSeconds, totalSeconds, isActive }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateProgress = () => {
        if (totalSeconds === 0) return 0;
        return ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    };

    const progress = calculateProgress();
    const radius = 140;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`timer-display ${isActive ? 'active' : ''}`}>
            <div className="timer-circle-container">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="timer-svg"
                >
                    <circle
                        stroke="var(--color-surface)"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="var(--color-primary)"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="timer-progress"
                    />
                </svg>
                <div className="timer-text">
                    {formatTime(remainingSeconds)}
                </div>
            </div>
        </div>
    );
};
