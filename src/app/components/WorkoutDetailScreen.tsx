'use client';

import { ArrowLeft, Play, Clock, Flame, TrendingUp, Heart, ChevronRight } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutDetailScreenProps {
  workout: Workout;
  onBack: () => void;
}

export default function WorkoutDetailScreen({ workout, onBack }: WorkoutDetailScreenProps) {
  return (
    <div className="min-h-screen bg-black overflow-y-auto pb-8">
      {/* Hero Image */}
      <div className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${workout.image})`,
          }}
        />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-black/40 backdrop-blur-sm rounded-full z-10"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Favorite Button */}
        <button className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-sm rounded-full z-10">
          <Heart className="w-6 h-6 text-white" />
        </button>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {workout.title}
          </h1>
          <p className="text-gray-400">
            {workout.description.substring(0, 60)}...
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Clock, label: 'Duração', value: workout.duration },
            { icon: Flame, label: 'Calorias', value: workout.calories },
            { icon: TrendingUp, label: 'Nível', value: workout.level },
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
              <stat.icon className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <p className="text-white font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Descrição</h2>
          <p className="text-gray-400 leading-relaxed">
            {workout.description}
          </p>
        </div>

        {/* Exercises */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Exercícios</h2>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#FF6B35] font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{exercise.name}</p>
                    <p className="text-gray-400 text-sm">{exercise.reps}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button className="w-full py-5 bg-[#FF6B35] text-white font-bold text-lg rounded-full hover:bg-[#FF5520] transition-all shadow-2xl">
          Iniciar Treino
        </button>
      </div>
    </div>
  );
}
