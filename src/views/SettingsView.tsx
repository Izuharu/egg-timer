import React, { useState } from 'react';
import { EGG_TYPES, EGG_SIZES, EGG_CONSISTENCIES } from '../utils/eggData';
import type { Theme, CustomAdjustmentMap } from '../types';
import type { EggType } from '../utils/eggData';
import './SettingsView.css';

interface SettingsViewProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
    adjustments: CustomAdjustmentMap;
    onAdjustmentChange: (key: string, val: number) => void;
    onResetAdjustments: () => void;
    notificationsEnabled: boolean;
    onNotificationsToggle: (val: boolean) => void;
    soundEnabled: boolean;
    onSoundToggle: (val: boolean) => void;
    vibrationEnabled: boolean;
    onVibrationToggle: (val: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
    theme,
    onThemeChange,
    adjustments,
    onAdjustmentChange,
    onResetAdjustments,
    notificationsEnabled,
    onNotificationsToggle,
    soundEnabled,
    onSoundToggle,
    vibrationEnabled,
    onVibrationToggle
}) => {
    const [activeTimingTab, setActiveTimingTab] = useState<EggType>('chicken');

    const getAdjValue = (type: string, size: string, consistency: string) => {
        return adjustments[`${type}-${size}-${consistency}`] || 0;
    };

    const handleAdjust = (type: string, size: string, consistency: string, delta: number) => {
        const key = `${type}-${size}-${consistency}`;
        const current = adjustments[key] || 0;
        onAdjustmentChange(key, current + delta);
    };

    const formatTime = (time: number) => {
        // This is for display only, in real app we might want to calculate base + adj
        // For now showing the offset
        return time > 0 ? `+${time}s` : time < 0 ? `${time}s` : '0s';
    };

    return (
        <div className="view-container settings-view">
            {/* Theme Section */}
            <section className="settings-section">
                <h3>Theme</h3>
                <div className="theme-toggle">
                    {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                        <button
                            key={t}
                            className={`theme-btn ${theme === t ? 'selected' : ''}`}
                            onClick={() => onThemeChange(t)}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </section>

            {/* Notifications Section */}
            <section className="settings-section">
                <h3>Notifications</h3>
                <div className="setting-row">
                    <div className="setting-info">
                        <span className="setting-icon">🔔</span>
                        <div>
                            <h4>Enable Notifications</h4>
                            <p>Get alerted when timer completes</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={(e) => {
                                const val = e.target.checked;
                                onNotificationsToggle(val);
                                if (val && 'Notification' in window && Notification.permission === 'default') {
                                    Notification.requestPermission();
                                }
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <span className="setting-icon">🔊</span>
                        <div>
                            <h4>Sound</h4>
                            <p>Play sound when timer ends</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={soundEnabled} onChange={(e) => onSoundToggle(e.target.checked)} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="setting-row">
                    <div className="setting-info">
                        <span className="setting-icon">📳</span>
                        <div>
                            <h4>Vibration</h4>
                            <p>Vibrate on timer completion</p>
                        </div>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={vibrationEnabled} onChange={(e) => onVibrationToggle(e.target.checked)} />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>

            {/* Custom Timings Section */}
            <section className="settings-section">
                <div className="section-header-row">
                    <h3>Custom Timings</h3>
                    <button className="reset-pill-btn" onClick={onResetAdjustments}>
                        🔄 Reset All
                    </button>
                </div>

                <div className="timing-tabs">
                    {EGG_TYPES.map(type => (
                        <button
                            key={type.id}
                            className={`timing-tab ${activeTimingTab === type.id ? 'active' : ''}`}
                            onClick={() => setActiveTimingTab(type.id)}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                <div className="timing-list">
                    {EGG_SIZES.map(size => (
                        <div key={size.id} className="size-group">
                            <h4>{size.label} Egg</h4>
                            {EGG_CONSISTENCIES.map(cons => (
                                <div key={cons.id} className="timing-row">
                                    <span>{cons.label}</span>
                                    <div className="timing-controls">
                                        <button onClick={() => handleAdjust(activeTimingTab, size.id, cons.id, -1)}>−</button>
                                        <span className="timing-value">
                                            {formatTime(getAdjValue(activeTimingTab, size.id, cons.id))}
                                        </span>
                                        <button onClick={() => handleAdjust(activeTimingTab, size.id, cons.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="settings-section">
                <h3>About</h3>
                <p className="app-version">Egg Timer v1.0.1</p>
            </section>
        </div>
    );
};
