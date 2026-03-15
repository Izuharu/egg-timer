import React from 'react';
import './TabBar.css';

interface TabBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'timer', label: 'Timer', icon: 'timer' },
        { id: 'recipe', label: 'Recipe', icon: 'restaurant_menu' },
        { id: 'howto', label: 'How To?', icon: 'help' },
        { id: 'settings', label: 'Setting', icon: 'settings' },
    ];

    return (
        <nav className="tab-bar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <span className="tab-icon material-symbols-rounded">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};
