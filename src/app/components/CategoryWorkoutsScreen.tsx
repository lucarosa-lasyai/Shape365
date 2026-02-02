'use client';

import { ArrowLeft, Clock, Flame } from 'lucide-react';
import { Category, Workout } from '../types';
import { getWorkoutsByCategory } from '../data';

interface CategoryWorkoutsScreenProps {
  category: Category;
  onBack: () => void;
  onWorkoutClick: (workout: Workout) => void;
}

export default function CategoryWorkoutsScreen({ category, onBack, onWorkoutClick }: CategoryWorkoutsScreenProps) {
  const workouts = getWorkoutsByCategory(category);

  return (
    <div className="min-h-screen bg-black pb-8 overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-3 bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{category}</h1>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => onWorkoutClick(workout)}
              className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF6B35] transition-all cursor-pointer"
            >
              <div 
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${workout.image})` }}
              />
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{workout.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workout.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {workout.calories}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Nível: {workout.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
