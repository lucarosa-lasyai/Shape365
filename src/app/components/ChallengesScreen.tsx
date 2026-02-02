'use client';

import { Trophy } from 'lucide-react';
import { Challenge } from '../types';

interface ChallengesScreenProps {
  challenges: Challenge[];
  onChallengeClick: (challenge: Challenge) => void;
}

export default function ChallengesScreen({ challenges, onChallengeClick }: ChallengesScreenProps) {
  const activeChallenge = challenges.find(c => c.isActive);
  const availableChallenges = challenges.filter(c => !c.isActive);

  return (
    <div className="min-h-screen bg-black pb-24 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Desafios</h1>

        {/* Active Challenge */}
        {activeChallenge && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Desafio Ativo</h2>
            <div 
              className={`bg-gradient-to-br ${activeChallenge.color} rounded-3xl p-6 cursor-pointer`}
              onClick={() => onChallengeClick(activeChallenge)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">DESAFIO {activeChallenge.days} DIAS</p>
                  <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-white text-sm mb-2">
                  <span>Dia {activeChallenge.currentDay} de {activeChallenge.days}</span>
                  <span>{Math.round(((activeChallenge.currentDay || 0) / activeChallenge.days) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all" 
                    style={{ width: `${((activeChallenge.currentDay || 0) / activeChallenge.days) * 100}%` }} 
                  />
                </div>
              </div>
              <button className="w-full py-3 bg-white text-[#FF6B35] font-bold rounded-full">
                Continuar Desafio
              </button>
            </div>
          </div>
        )}

        {/* Available Challenges */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Desafios Disponíveis</h2>
          <div className="space-y-4">
            {availableChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={`bg-gradient-to-r ${challenge.color} rounded-2xl p-5 cursor-pointer hover:scale-[1.02] transition-all`}
                onClick={() => onChallengeClick(challenge)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{challenge.title}</h3>
                    <p className="text-white/80 text-sm">{challenge.participants} participantes</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onChallengeClick(challenge);
                    }}
                    className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-all"
                  >
                    Participar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
