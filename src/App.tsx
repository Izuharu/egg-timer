import { useState, useEffect, useCallback } from 'react';
import { TabBar } from './components/TabBar';
import { TimerView } from './views/TimerView';
import { RecipeView } from './views/RecipeView';
import { HowToView } from './views/HowToView';
import { SettingsView } from './views/SettingsView';
import type { Theme, CustomAdjustmentMap } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('timer');
  const [theme, setTheme] = useState<Theme>('system');
  const [adjustments, setAdjustments] = useState<CustomAdjustmentMap>({});

  // Helper to get adjustment for a specific combo
  const getAdjustment = useCallback((key: string) => {
    return adjustments[key] || 0;
  }, [adjustments]);

  // Helper to set adjustment
  const handleAdjustmentChange = (key: string, val: number) => {
    setAdjustments(prev => ({
      ...prev,
      [key]: val
    }));
  };

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'timer':
        return (
          <TimerView
            getAdjustment={getAdjustment}
            onAdjustmentChange={handleAdjustmentChange}
          />
        );
      case 'recipe':
        return <RecipeView />;
      case 'howto':
        return <HowToView />;
      case 'settings':
        return (
          <SettingsView
            theme={theme}
            onThemeChange={setTheme}
            adjustments={adjustments}
            onAdjustmentChange={handleAdjustmentChange}
            onResetAdjustments={() => setAdjustments({})}
          />
        );
      default:
        return (
          <TimerView
            getAdjustment={getAdjustment}
            onAdjustmentChange={handleAdjustmentChange}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <span>🥚</span>
        <h1>Egg Timer</h1>
      </header>
      <main className="app-content">
        {renderContent()}
      </main>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
