import React from 'react';
import { motion } from 'motion/react';
import { Home, Wind, Activity, Brain, User, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'workouts', icon: Activity, label: 'Train' },
    { id: 'drift', icon: Wind, label: 'Drift' },
    { id: 'now', icon: Brain, label: 'Now' },
    { id: 'coach', icon: MessageSquare, label: 'Coach' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-bg shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="p-6 border-b border-line flex justify-between items-center">
        <h1 className="font-serif italic text-2xl tracking-tight text-ink">LearnMyMind</h1>
        <div className="text-[10px] font-mono uppercase tracking-widest opacity-50 text-ink">MVP v1.0</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>

      {/* Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-md border-t border-line px-4 py-3">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.id ? 'text-accent' : 'text-neutral'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-[10px] uppercase tracking-tighter font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1 h-1 rounded-full bg-accent mt-0.5"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
