'use client';

import { Check, Sparkles, TrendingUp, MessageCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface PlansScreenProps {
  onSubscribe: (plan: 'monthly' | 'semester' | 'annual') => void;
  onBack?: () => void;
  userEmail?: string;
  onRetakeQuiz?: () => void;
}

export default function PlansScreen({ onBack, userEmail, onRetakeQuiz }: PlansScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'semester' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  // Links de pagamento do Mercado Pago (serão configurados depois)
  const paymentLinks = {
    monthly: process.env.NEXT_PUBLIC_MERCADOPAGO_LINK_MONTHLY || '#',
    semester: process.env.NEXT_PUBLIC_MERCADOPAGO_LINK_SEMESTER || '#',
    annual: process.env.NEXT_PUBLIC_MERCADOPAGO_LINK_ANNUAL || '#',
  };

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Mensal',
      price: 'R$ 39,90',
      period: '/mês',
      total: 'R$ 39,90 por mês',
      savings: null,
      popular: false,
    },
    {
      id: 'semester' as const,
      name: 'Semestral',
      price: 'R$ 29,90',
      period: '/mês',
      total: 'R$ 179,40 a cada 6 meses',
      savings: 'Economize 25%',
      popular: false,
    },
    {
      id: 'annual' as const,
      name: 'Anual',
      price: 'R$ 19,90',
      period: '/mês',
      total: 'R$ 238,80 por ano',
      savings: 'Economize 50%',
      popular: true,
      recommended: true,
    },
  ];

  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: 'Treinos gerados por inteligência artificial',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Ajustes semanais com base na sua evolução',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: 'Acesso ao chat de dúvidas com IA',
    },
    {
      icon: <Check className="w-5 h-5" />,
      text: 'Planos personalizados para seu objetivo',
    },
    {
      icon: <Check className="w-5 h-5" />,
      text: 'Acompanhamento de progresso detalhado',
    },
    {
      icon: <Check className="w-5 h-5" />,
      text: 'Acesso ilimitado a todos os treinos',
    },
  ];

  const handleSubscribe = () => {
    setIsProcessing(true);

    // Adicionar email do usuário como metadata na URL do Mercado Pago
    const paymentLink = paymentLinks[selectedPlan];
    
    if (paymentLink === '#') {
      alert('Links de pagamento ainda não configurados. Configure as variáveis de ambiente.');
      setIsProcessing(false);
      return;
    }

    // Construir URL com metadata
    const urlWithMetadata = new URL(paymentLink);
    if (userEmail) {
      urlWithMetadata.searchParams.set('external_reference', userEmail);
    }

    // Redirecionar para o Mercado Pago
    window.location.href = urlWithMetadata.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Escolha Seu Plano
              </h1>
              <p className="text-gray-600 mt-1">
                Comece sua transformação hoje mesmo
              </p>
            </div>
            {onRetakeQuiz && (
              <button
                onClick={onRetakeQuiz}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Refazer Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer rounded-2xl border-2 transition-all ${
                selectedPlan === plan.id
                  ? 'border-[#FF6B35] shadow-xl scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Badge Recomendado */}
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Recomendado
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {plan.savings}
                  </div>
                )}

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{plan.total}</p>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            O que está incluído em todos os planos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-[#FF6B35]">
                  {feature.icon}
                </div>
                <p className="text-gray-700 pt-1">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="bg-gradient-to-r from-[#FF6B35] to-[#FF5520] text-white px-12 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>Redirecionando...</>
            ) : (
              <>
                Assinar Plano {plans.find(p => p.id === selectedPlan)?.name}
                <ExternalLink className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-sm text-gray-600 mt-4">
            Você será redirecionado para o Mercado Pago • Pagamento 100% seguro
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Cancele quando quiser • Sem taxas ocultas
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-[#FF6B35] mb-2">10.000+</div>
            <p className="text-gray-600">Usuários ativos</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-[#FF6B35] mb-2">4.8★</div>
            <p className="text-gray-600">Avaliação média</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-[#FF6B35] mb-2">95%</div>
            <p className="text-gray-600">Taxa de satisfação</p>
          </div>
        </div>

        {/* Informação sobre o processo */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Como funciona o pagamento?</h3>
          <ol className="text-sm text-blue-800 space-y-2">
            <li>1. Clique em &quot;Assinar Plano&quot; e você será redirecionado para o Mercado Pago</li>
            <li>2. Complete o pagamento de forma segura na plataforma do Mercado Pago</li>
            <li>3. Após a aprovação, seu acesso será liberado automaticamente</li>
            <li>4. Você receberá um email de confirmação e poderá acessar todos os recursos</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
