'use client';

import { useState } from 'react';
import { QuizAnswers } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (answers: QuizAnswers) => void;
}

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: '',
    height: '',
    weight: '',
    gender: '',
    mainGoal: '',
    experienceLevel: '',
    hasTrainedBefore: '',
    daysPerWeek: '',
    timePerWorkout: '',
    favoriteWorkoutType: '',
    workoutDuration: '',
    hasInjury: '',
    hasRecurringPain: '',
    hasMedicalRestriction: '',
    fitnessLevel: '',
    fatigueLevel: 3,
    sleepQuality: 3,
    consistencyChallenge: '',
    commitmentLevel: 3,
  });

  const handleNext = () => {
    if (currentStep === 9) {
      // Última etapa - finalizar quiz IMEDIATAMENTE
      onComplete(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Tela de abertura
      case 1: return answers.age && answers.height && answers.weight && answers.gender;
      case 2: return answers.mainGoal;
      case 3: return answers.experienceLevel && answers.hasTrainedBefore;
      case 4: return answers.daysPerWeek && answers.timePerWorkout;
      case 5: return answers.favoriteWorkoutType && answers.workoutDuration;
      case 6: return answers.hasInjury && answers.hasRecurringPain && answers.hasMedicalRestriction;
      case 7: return answers.fitnessLevel;
      case 8: return answers.consistencyChallenge;
      case 9: return true; // Revisão final
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pronto para transformar seu corpo e sua saúde?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Vamos criar um plano de treino personalizado que se encaixa perfeitamente na sua rotina!
            </p>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
            >
              Começar Agora
            </button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dados Pessoais</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qual é a sua idade?</label>
              <input
                type="number"
                value={answers.age}
                onChange={(e) => setAnswers({ ...answers, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="Ex: 25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qual é a sua altura? (cm)</label>
              <input
                type="number"
                value={answers.height}
                onChange={(e) => setAnswers({ ...answers, height: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="Ex: 170"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Qual é o seu peso atual? (kg)</label>
              <input
                type="number"
                value={answers.weight}
                onChange={(e) => setAnswers({ ...answers, weight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                placeholder="Ex: 70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Qual é o seu sexo biológico?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Masculino', 'Feminino', 'Prefiro não dizer'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, gender: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.gender === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Objetivos</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qual é o seu maior objetivo com o Shape365?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Emagrecimento',
                  'Ganho de massa magra',
                  'Aumento da performance',
                  'Manutenção da saúde',
                  'Definição corporal',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, mainGoal: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.mainGoal === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experiência Prévia</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qual é o seu nível de experiência em treinos?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Iniciante', 'Intermediário', 'Avançado'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, experienceLevel: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.experienceLevel === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Você já treinou anteriormente?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Sim', 'Não'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, hasTrainedBefore: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.hasTrainedBefore === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Rotina</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quantos dias por semana você pode treinar?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['1-2 dias', '3-4 dias', '5-7 dias'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, daysPerWeek: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.daysPerWeek === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quanto tempo você pode dedicar para cada treino?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Menos de 30 minutos', '30-60 minutos', 'Mais de 60 minutos'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, timePerWorkout: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.timePerWorkout === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preferências</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qual tipo de treino você mais gosta?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Cardio', 'Musculação', 'Yoga/Alongamento', 'Treinos diversos'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, favoriteWorkoutType: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.favoriteWorkoutType === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Prefere treinos mais curtos ou mais longos?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Mais curtos', 'Mais longos'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, workoutDuration: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.workoutDuration === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitações</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Você possui alguma lesão?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Sim', 'Não'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, hasInjury: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.hasInjury === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tem dores recorrentes?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Sim', 'Não'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, hasRecurringPain: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.hasRecurringPain === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Possui algum tipo de restrição médica?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Sim', 'Não'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, hasMedicalRestriction: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.hasMedicalRestriction === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nível Atual</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Como você classificaria seu condicionamento físico atualmente?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Muito baixo', 'Baixo', 'Médio', 'Alto', 'Muito alto'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, fitnessLevel: option })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      answers.fitnessLevel === option
                        ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35] font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qual é o seu nível diário de cansaço? (1-5)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Baixo</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.fatigueLevel}
                  onChange={(e) => setAnswers({ ...answers, fatigueLevel: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                />
                <span className="text-sm text-gray-600">Alto</span>
                <span className="text-lg font-bold text-[#FF6B35] min-w-[2rem] text-center">
                  {answers.fatigueLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Como você avalia sua qualidade de sono? (1-5)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Ruim</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.sleepQuality}
                  onChange={(e) => setAnswers({ ...answers, sleepQuality: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                />
                <span className="text-sm text-gray-600">Ótima</span>
                <span className="text-lg font-bold text-[#FF6B35] min-w-[2rem] text-center">
                  {answers.sleepQuality}
                </span>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprometimento</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estamos prontos para ver resultados! O que seria mais difícil para você manter a consistência?
              </label>
              <textarea
                value={answers.consistencyChallenge}
                onChange={(e) => setAnswers({ ...answers, consistencyChallenge: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent min-h-[120px]"
                placeholder="Ex: Falta de tempo, motivação, cansaço..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                O quanto você está disposto a se comprometer com seu treino? (1-5)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Pouco</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={answers.commitmentLevel}
                  onChange={(e) => setAnswers({ ...answers, commitmentLevel: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                />
                <span className="text-sm text-gray-600">Muito</span>
                <span className="text-lg font-bold text-[#FF6B35] min-w-[2rem] text-center">
                  {answers.commitmentLevel}
                </span>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Revisão das Suas Respostas</h2>
            
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Idade</p>
                  <p className="font-semibold">{answers.age} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Altura</p>
                  <p className="font-semibold">{answers.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="font-semibold">{answers.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Objetivo Principal</p>
                  <p className="font-semibold">{answers.mainGoal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nível de Experiência</p>
                  <p className="font-semibold">{answers.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dias por Semana</p>
                  <p className="font-semibold">{answers.daysPerWeek}</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600">
              Revise suas informações antes de continuar. Você poderá editá-las depois no seu perfil.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com progresso */}
      {currentStep > 0 && currentStep <= 9 && (
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Etapa {currentStep} de 9
              </span>
              <span className="text-sm font-medium text-[#FF6B35]">
                {Math.round((currentStep / 9) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#FF6B35] to-[#FF5520] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 9) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {renderStep()}
      </div>

      {/* Navegação */}
      {currentStep > 0 && currentStep <= 9 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 9 ? 'Finalizar' : 'Continuar'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
