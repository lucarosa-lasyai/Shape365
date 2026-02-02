'use client';

import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import { Challenge } from '../types';

interface ChallengeDetailScreenProps {
  challenge: Challenge;
  onBack: () => void;
  onJoin: () => void;
}

export default function ChallengeDetailScreen({ challenge, onBack, onJoin }: ChallengeDetailScreenProps) {
  return (
    <div className="min-h-screen bg-black overflow-y-auto pb-8">
      {/* Header */}
      <div className={`bg-gradient-to-br ${challenge.color} p-6 pb-12`}>
        <button
          onClick={onBack}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/80 text-sm mb-2">DESAFIO {challenge.days} DIAS</p>
            <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
            <p className="text-white/80">{challenge.participants} participantes</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-center">
            <Calendar className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white mb-1">{challenge.days}</p>
            <p className="text-gray-400 text-sm">Dias</p>
          </div>
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-center">
            <Trophy className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white mb-1">{challenge.participants}</p>
            <p className="text-gray-400 text-sm">Participantes</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Sobre o Desafio</h2>
          <p className="text-gray-400 leading-relaxed">
            {challenge.description}
          </p>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Benefícios</h2>
          <div className="space-y-3">
            {[
              'Rotina consistente de treinos',
              'Acompanhamento de progresso',
              'Comunidade motivadora',
              'Conquistas e recompensas',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">O que esperar</h2>
          <div className="space-y-3">
            {[
              { day: 'Dias 1-7', desc: 'Adaptação e construção de hábitos' },
              { day: `Dias 8-${Math.floor(challenge.days / 2)}`, desc: 'Progressão e aumento de intensidade' },
              { day: `Dias ${Math.floor(challenge.days / 2) + 1}-${challenge.days}`, desc: 'Consolidação e resultados visíveis' },
            ].map((phase, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[#FF6B35] font-bold text-sm mb-1">{phase.day}</p>
                <p className="text-gray-300">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Button */}
        {!challenge.isActive && (
          <button 
            onClick={onJoin}
            className="w-full py-5 bg-[#FF6B35] text-white font-bold text-lg rounded-full hover:bg-[#FF5520] transition-all shadow-2xl"
          >
            Participar do Desafio
          </button>
        )}

        {challenge.isActive && (
          <div className="p-5 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-2xl text-center">
            <p className="text-[#FF6B35] font-bold">
              Você já está participando deste desafio!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
