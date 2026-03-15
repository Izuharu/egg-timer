import React, { useState, useEffect, useCallback } from 'react';
import { EggSelector } from '../components/EggSelector';
import { TimerDisplay } from '../components/TimerDisplay';
import { getCookingTime } from '../utils/eggData';
import type { EggType, EggSize, EggConsistency } from '../utils/eggData';
import './TimerView.css';

interface TimerViewProps {
    getAdjustment: (key: string) => number;
    onAdjustmentChange: (key: string, val: number) => void;
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
}

export const TimerView: React.FC<TimerViewProps> = ({
    getAdjustment,
    onAdjustmentChange,
    notificationsEnabled,
    soundEnabled,
    vibrationEnabled
}) => {
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
        const baseTime = getCookingTime(selectedType, selectedSize, selectedConsistency);
        const adjustedTime = Math.max(0, baseTime + currentAdjustment);
        setTotalTime(adjustedTime);
        setRemainingTime(adjustedTime);
    }, [selectedType, selectedSize, selectedConsistency, currentAdjustment]);

    useEffect(() => {
        if (!isActive) {
            updateInitialTime();
        }
    }, [updateInitialTime]);

    const playCompletionFeedback = useCallback(() => {
        if (notificationsEnabled && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('🍳 Egg Timer Finished!', {
                    body: 'Your eggs are ready!',
                    icon: '/favicon.ico'
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('🍳 Egg Timer Finished!');
                    }
                });
            }
        }

        if (soundEnabled) {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 1);
        }

        if (vibrationEnabled && 'vibrate' in navigator) {
            navigator.vibrate([500, 200, 500]);
        }
    }, [notificationsEnabled, soundEnabled, vibrationEnabled]);

    // Timer Tick
    useEffect(() => {
        let interval: number | undefined;

        if (isActive && remainingTime > 0) {
            interval = window.setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
        } else if (remainingTime === 0 && isActive) {
            setIsActive(false);
            playCompletionFeedback();
        }

        return () => clearInterval(interval);
    }, [isActive, remainingTime, playCompletionFeedback]);

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

            <div className="timer-actions-group">
                <div className="secondary-controls">
                    <button
                        className="btn-control reset"
                        onClick={resetTimer}
                        disabled={!isActive && remainingTime === totalTime}
                    >
                        <span className="icon material-symbols-rounded">restart_alt</span> Reset
                    </button>
                    <button
                        className={`btn-control pause ${isActive ? 'active' : ''}`}
                        onClick={toggleTimer}
                        disabled={remainingTime === 0}
                    >
                        <span className="icon material-symbols-rounded">{isActive ? 'pause' : 'play_arrow'}</span> {isActive ? 'Pause' : 'Resume'}
                    </button>
                </div>

                <button
                    className={`btn-primary-large ${isActive ? 'running' : ''}`}
                    onClick={() => !isActive && toggleTimer()}
                    disabled={isActive || remainingTime === 0}
                >
                    {isActive ? 'COOKING...' : 'START'}
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
