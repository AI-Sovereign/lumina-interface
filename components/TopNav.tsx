"use client";
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Hexagon, Activity } from 'lucide-react';

export const TopNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: any) => void }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'live', label: 'Live Application' },
    { id: 'about', label: 'Directorate' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-corporate-800 bg-white/80 dark:bg-corporate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <Hexagon className="w-6 h-6 text-accent-indigo" />
          <span className="font-semibold tracking-tight text-lg">AGI Systems</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`transition-colors ${
                activeTab === item.id 
                  ? 'text-accent-indigo dark:text-white' 
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Feature 2: Abstract Telemetry Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-xs font-medium text-green-700 dark:text-green-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Core Online
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-corporate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
