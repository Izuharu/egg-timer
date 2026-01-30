import React, { useState, useEffect, useCallback } from 'react';
import { EggSelector } from '../components/EggSelector';
import { TimerDisplay } from '../components/TimerDisplay';
import { getCookingTime } from '../utils/eggData';
import type { EggType, EggSize, EggConsistency } from '../utils/eggData';
import './TimerView.css';

interface TimerViewProps {
    getAdjustment: (key: string) => number;
    onAdjustmentChange: (key: string, val: number) => void;
}

export const TimerView: React.FC<TimerViewProps> = ({ getAdjustment, onAdjustmentChange }) => {
    // Selection State
    const [selectedType, setSelectedType] = useState<EggType>('chicken');
    const [selectedSize, setSelectedSize] = useState<EggSize>('medium');
    const [selectedConsistency, setSelectedConsistency] = useState<EggConsistency>('half');

    // Timer State
    const [isActive, setIsActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    const adjustmentKey = `${selectedType}-${selectedSize}-${selectedConsistency}`;
    const currentAdjustment = getAdjustment(adjustmentKey);

    // Initialize timer when selection changes (if not active)
    const updateInitialTime = useCallback(() => {
        if (!isActive) {
            const baseTime = getCookingTime(selectedType, selectedSize, selectedConsistency);
            const adjustedTime = Math.max(0, baseTime + currentAdjustment);
            setTotalTime(adjustedTime);
            setRemainingTime(adjustedTime);
        }
    }, [selectedType, selectedSize, selectedConsistency, isActive, currentAdjustment]);

    useEffect(() => {
        updateInitialTime();
    }, [updateInitialTime]);

    // Timer Tick
    useEffect(() => {
        let interval: number | undefined;

        if (isActive && remainingTime > 0) {
            interval = window.setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
        } else if (remainingTime === 0 && isActive) {
            setIsActive(false);
            // Play sound or vibration here
        }

        return () => clearInterval(interval);
    }, [isActive, remainingTime]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        updateInitialTime();
    };

    return (
        <div className="view-container timer-view">
            <TimerDisplay
                remainingSeconds={remainingTime}
                totalSeconds={totalTime}
                isActive={isActive}
            />

            <div className="timer-controls">
                <button
                    className={`btn-primary ${isActive ? 'pause' : 'start'}`}
                    onClick={toggleTimer}
                >
                    {isActive ? 'Pause' : 'Start Timer'}
                </button>
                <button
                    className="btn-secondary"
                    onClick={resetTimer}
                    disabled={!isActive && remainingTime === totalTime}
                >
                    Reset
                </button>
            </div>

            {!isActive && (
                /* Fine tuning moved to settings */
                null
            )}

            <EggSelector
                selectedType={selectedType}
                selectedSize={selectedSize}
                selectedConsistency={selectedConsistency}
                onTypeChange={setSelectedType}
                onSizeChange={setSelectedSize}
                onConsistencyChange={setSelectedConsistency}
                disabled={isActive}
            />
        </div>
    );
};
