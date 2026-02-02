'use client';

import { Home, Trophy, Users, User, ClipboardCheck } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'challenges', icon: Trophy, label: 'Desafios' },
    { id: 'checkin', icon: ClipboardCheck, label: 'Check-in' },
    { id: 'community', icon: Users, label: 'Comunidade' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="flex justify-around py-3 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              activeTab === tab.id ? 'text-[#FF6B35]' : 'text-gray-400'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
