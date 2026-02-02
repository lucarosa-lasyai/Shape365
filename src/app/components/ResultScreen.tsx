'use client';

import { QuizAnswers } from '../types';
import { Lock } from 'lucide-react';

interface ResultScreenProps {
  answers: QuizAnswers;
  onContinue: () => void;
}

export default function ResultScreen({ answers, onContinue }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Seu plano personalizado está pronto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Com base nas suas respostas, criamos uma estrutura de treino focada no seu objetivo.
          </p>
        </div>

        {/* Preview Borrado do Plano */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-8 overflow-hidden">
          {/* Conteúdo do Preview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Seu Plano de Treino Semanal
            </h2>
            
            {/* Dias da Semana com Treinos */}
            <div className="space-y-4">
              {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{day}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {index % 2 === 0 ? 'Treino de Força - Superior' : index === 6 ? 'Descanso' : 'Treino Cardio - HIIT'}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {index === 6 ? '—' : '45 min'}
                  </div>
                </div>
              ))}
            </div>

            {/* Detalhes dos Exercícios */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exercícios Detalhados</h3>
              <div className="space-y-3">
                {['Supino Reto', 'Agachamento Livre', 'Remada Curvada', 'Desenvolvimento', 'Leg Press'].map((exercise) => (
                  <div key={exercise} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{exercise}</span>
                    <span className="text-sm text-gray-600">4x12 repetições</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlay de Blur/Desfoque */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex items-center justify-center">
            <div className="text-center px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FF6B35] to-[#FF5520] rounded-full mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Plano Bloqueado
              </h3>
              <p className="text-gray-600 max-w-md">
                Seu plano completo está pronto, mas você precisa de uma assinatura para acessá-lo
              </p>
            </div>
          </div>
        </div>

        {/* Texto de Conversão */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Para desbloquear seu plano completo, acessar todos os treinos e evoluir com o Shape365, escolha um plano abaixo.
          </p>
        </div>

        {/* Tabela de Planos (Inline) */}
        <div className="bg-gradient-to-b from-orange-50 to-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Escolha Seu Plano
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Plano Mensal */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#FF6B35] transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mensal</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">R$ 39,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">R$ 39,90 por mês</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Treinos personalizados</li>
                <li>✓ Ajustes semanais</li>
                <li>✓ Chat com IA</li>
              </ul>
            </div>

            {/* Plano Semestral */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#FF6B35] transition-all">
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                Economize 25%
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Semestral</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">R$ 29,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">R$ 179,40 a cada 6 meses</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Treinos personalizados</li>
                <li>✓ Ajustes semanais</li>
                <li>✓ Chat com IA</li>
              </ul>
            </div>

            {/* Plano Anual - Recomendado */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#FF5520] rounded-xl border-2 border-[#FF6B35] p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-3 py-1 text-xs font-bold">
                ⭐ RECOMENDADO
              </div>
              <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2 mt-6">
                Economize 50%
              </div>
              <h3 className="text-xl font-bold mb-2">Anual</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">R$ 19,90</span>
                <span className="text-white/80">/mês</span>
              </div>
              <p className="text-sm text-white/80 mb-4">R$ 238,80 por ano</p>
              <ul className="space-y-2 text-sm">
                <li>✓ Treinos personalizados</li>
                <li>✓ Ajustes semanais</li>
                <li>✓ Chat com IA</li>
                <li>✓ Melhor custo-benefício</li>
              </ul>
            </div>
          </div>

          {/* Benefícios Adicionais */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              O que você ganha com qualquer plano:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>Treinos gerados por inteligência artificial</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>Ajustes semanais com base na sua evolução</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6B35] font-bold">✓</span>
                <span>Acesso ao chat de dúvidas com IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center">
          <button
            onClick={onContinue}
            className="bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white px-12 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            Desbloquear meu plano
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Cancele quando quiser • Sem taxas ocultas
          </p>
        </div>
      </div>
    </div>
  );
}
