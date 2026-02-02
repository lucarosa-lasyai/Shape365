'use client';

import { Check, Zap, Target, TrendingUp, Award } from 'lucide-react';

interface LandingScreenProps {
  onSignUp: () => void;
  onLogin: () => void;
}

export default function LandingScreen({ onSignUp, onLogin }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              Shape <span className="text-[#FF6B35]">365</span>
            </h1>
          </div>

          {/* Headline */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transforme seu corpo e sua vida em 365 dias
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Treinos inteligentes, personalizados por inteligência artificial, adaptados ao seu objetivo, nível e evolução.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={onSignUp}
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Inscreva-se agora
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all"
            >
              Já tenho conta — Login
            </button>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* Bloco 1 - O que é o Shape 365 */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
            <Zap className="w-8 h-8 text-[#FF6B35]" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            O que é o Shape 365
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            O Shape 365 é um aplicativo de treino inteligente que cria planos personalizados para você transformar seu corpo ao longo de 365 dias, respeitando seu nível, objetivo e evolução.
          </p>
        </section>

        {/* Bloco 2 - Como funciona */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h3>
            <p className="text-lg text-gray-600">
              Passos simples para sua transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Você cria sua conta', desc: 'Cadastro rápido e seguro' },
              { step: '2', title: 'Responde um quiz inteligente', desc: 'Entendemos seu perfil e objetivos' },
              { step: '3', title: 'A IA monta seu treino ideal', desc: 'Plano 100% personalizado' },
              { step: '4', title: 'Você evolui semana após semana', desc: 'Com ajustes automáticos' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#FF6B35] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bloco 3 - Para quem é */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-6">
              <TrendingUp className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Para quem é
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              Seja você iniciante, intermediário ou avançado, o Shape 365 se adapta ao seu ritmo e ao seu objetivo: emagrecimento, ganho de massa, condicionamento ou saúde.
            </p>
          </div>
        </section>

        {/* Bloco 4 - Benefícios */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefícios
            </h3>
            <p className="text-lg text-gray-600">
              Tudo que você precisa em um só lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Treinos personalizados',
              'Ajustes semanais com IA',
              'Acompanhamento de evolução',
              'Sem treinos genéricos',
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF6B35] hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronto para começar sua transformação?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onSignUp}
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Inscreva-se agora
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold text-lg rounded-xl border-2 border-gray-300 hover:bg-gray-200 transition-all"
            >
              Já tenho conta — Login
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Shape 365. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
