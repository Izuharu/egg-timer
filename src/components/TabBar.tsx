import React from 'react';
import './TabBar.css';

interface TabBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'timer', label: 'Timer', icon: '⏱️' },
        { id: 'recipe', label: 'Recipe', icon: '🍳' },
        { id: 'howto', label: 'How To?', icon: '🤔' },
        { id: 'settings', label: 'Setting', icon: '⚙️' },
    ];

    return (
        <nav className="tab-bar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};
