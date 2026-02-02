'use client';

import { Bell, Search, Clock, Flame } from 'lucide-react';
import { Category, Workout } from '../types';
import { workoutsData } from '../data';

interface HomeScreenProps {
  onWorkoutClick: (workout: Workout) => void;
  onCategoryClick: (category: Category | 'Todos') => void;
  selectedCategory: Category | 'Todos';
}

export default function HomeScreen({ onWorkoutClick, onCategoryClick, selectedCategory }: HomeScreenProps) {
  // "Todos" é apenas um filtro de visualização
  const categories: (Category | 'Todos')[] = ['Todos', 'Cardio', 'Força', 'Yoga', 'Alongamento'];
  
  // Filtrar workouts baseado na categoria selecionada
  const filteredWorkouts = selectedCategory === 'Todos' 
    ? workoutsData 
    : workoutsData.filter(w => w.category === selectedCategory);
  
  const featuredWorkout = filteredWorkouts[0] || workoutsData[0];
  const recommendedWorkouts = filteredWorkouts.slice(1, 7);

  return (
    <div className="min-h-screen bg-black pb-24 overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-400 text-sm mb-1">Olá, Atleta</p>
            <h1 className="text-2xl font-bold text-white">Pronto para Treinar?</h1>
          </div>
          <button className="p-3 bg-white/10 rounded-full">
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar treino"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Workout */}
      {featuredWorkout && (
        <div className="px-6 mb-8">
          <div 
            className="relative h-64 rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => onWorkoutClick(featuredWorkout)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${featuredWorkout.image})`,
              }}
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full">
                  DESTAQUE
                </span>
                <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {featuredWorkout.duration}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {featuredWorkout.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {featuredWorkout.description.substring(0, 80)}...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Section */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {selectedCategory === 'Todos' ? 'Recomendados' : `Treinos de ${selectedCategory}`}
          </h2>
          {selectedCategory !== 'Todos' && (
            <button 
              onClick={() => onCategoryClick('Todos')}
              className="text-[#FF6B35] text-sm font-medium"
            >
              Ver Todos
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {recommendedWorkouts.map((workout) => (
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
                <h3 className="text-white font-bold mb-2 line-clamp-1">{workout.title}</h3>
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
                <span className="text-xs px-2 py-1 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full">
                  {workout.subcategory}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum treino encontrado nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}
