'use client';

import { User, Calendar, Flame, TrendingUp, Trophy, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  userProfile: UserProfile | null;
  onEditProfile: () => void;
}

export default function ProfileScreen({ userProfile, onEditProfile }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-black pb-24 overflow-y-auto">
      <div className="p-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF5520] rounded-3xl p-6 mb-6 text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {userProfile?.name || 'Atleta'}
          </h2>
          <p className="text-white/80">Membro Premium</p>
          
          {userProfile && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-white/60 text-xs mb-1">Idade</p>
                  <p className="text-white font-bold">{userProfile.age} anos</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Peso</p>
                  <p className="text-white font-bold">{userProfile.weight} kg</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Altura</p>
                  <p className="text-white font-bold">{userProfile.height} cm</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs mb-1">Objetivo</p>
                  <p className="text-white font-bold text-xs">{userProfile.goal}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Treinos', value: '156', icon: Calendar },
            { label: 'Calorias', value: '45.2k', icon: Flame },
            { label: 'Sequência', value: '28 dias', icon: TrendingUp },
            { label: 'Conquistas', value: '12', icon: Trophy },
          ].map((stat, index) => (
            <div key={index} className="p-5 bg-white/5 rounded-2xl border border-white/10 text-center">
              <stat.icon className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Conquistas</h2>
          <div className="grid grid-cols-4 gap-3">
            {['🏆', '💪', '🔥', '⭐', '💎', '🎯', '✨', '🌟'].map((badge, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-[#FF6B35] to-[#FF5520] rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                style={{
                  opacity: index < 5 ? 1 : 0.3,
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          {[
            { label: 'Editar Perfil', icon: User, onClick: onEditProfile },
            { label: 'Histórico de Treinos', icon: Calendar, onClick: () => {} },
            { label: 'Configurações', icon: TrendingUp, onClick: () => {} },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-white font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
