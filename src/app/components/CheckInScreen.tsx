'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface CheckInScreenProps {
  onBack: () => void;
  userProfile: any;
}

interface CheckInData {
  lastCheckIn: string | null;
  questionsAsked: number;
}

interface AIResponse {
  status: string;
  analysis: string;
  guidance: string;
  workoutPlan?: string;
  finalMessage: string;
}

export default function CheckInScreen({ onBack, userProfile }: CheckInScreenProps) {
  const [step, setStep] = useState<'info' | 'form' | 'result'>('info');
  const [report, setReport] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    lastCheckIn: null,
    questionsAsked: 0,
  });

  // Carregar dados do check-in do localStorage
  useEffect(() => {
    const savedCheckIn = localStorage.getItem('shape365-checkin');
    if (savedCheckIn) {
      const data = JSON.parse(savedCheckIn);
      setCheckInData(data);
    }
  }, []);

  // Verificar se pode fazer check-in (1 vez por semana)
  const canCheckIn = () => {
    if (!checkInData.lastCheckIn) return true;
    
    const lastCheckIn = new Date(checkInData.lastCheckIn);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return diffDays >= 7;
  };

  const getDaysUntilNextCheckIn = () => {
    if (!checkInData.lastCheckIn) return 0;
    
    const lastCheckIn = new Date(checkInData.lastCheckIn);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, 7 - diffDays);
  };

  const handleSubmit = async () => {
    if (report.trim().length === 0) {
      setError('Por favor, forneça um relato antes de enviar.');
      return;
    }

    if (report.length > 500) {
      setError('O relato deve ter no máximo 500 caracteres.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Chamar API do OpenAI
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfile,
          report,
          question1: question1.trim(),
          question2: question2.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar check-in');
      }

      const data = await response.json();
      setAiResponse(data);

      // Salvar dados do check-in
      const newCheckInData: CheckInData = {
        lastCheckIn: new Date().toISOString(),
        questionsAsked: [question1, question2].filter(q => q.trim()).length,
      };
      
      localStorage.setItem('shape365-checkin', JSON.stringify(newCheckInData));
      setCheckInData(newCheckInData);

      // Ir para tela de resultado
      setStep('result');
    } catch (err) {
      setError('Erro ao processar seu check-in. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Tela de informações
  if (step === 'info') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Check-in Semanal</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-2xl mx-auto">
          {/* Status do Check-in */}
          {!canCheckIn() && (
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-500 mb-1">Check-in já realizado</h3>
                  <p className="text-sm text-gray-300">
                    Você já fez seu check-in desta semana. Próximo check-in disponível em {getDaysUntilNextCheckIn()} dias.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Título */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Como Usar o Check-in Semanal</h2>
            <p className="text-gray-400">
              Esta aba gera um RELATÓRIO SEMANAL e, se você possuir plano ativo, uma ATUALIZAÇÃO DE TREINO.
            </p>
          </div>

          {/* Regras */}
          <div className="space-y-6 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Frequência
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Você só pode acessar esta aba <strong className="text-white">UMA vez por semana</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Você tem direito a no máximo <strong className="text-white">2 perguntas</strong> neste acesso</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="font-semibold text-lg mb-3">Informações Obrigatórias no Relato</h3>
              <p className="text-sm text-gray-400 mb-3">Inclua, sempre que possível:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Peso atual (ou informe se não houve mudança)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Quantas vezes treinou na semana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Tipo de treino realizado (cardio, musculação, funcional, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Se aumentou, manteve ou reduziu cargas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Sensação geral (disposição, cansaço, dores)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Se conseguiu seguir o plano proposto ou não</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Qualquer dificuldade relevante</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400 mt-3">
                O relato deve ter no máximo <strong className="text-white">500 caracteres</strong>.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
              <h3 className="font-semibold text-lg mb-3">Perguntas Permitidas</h3>
              <p className="text-sm text-gray-400 mb-3">Você pode fazer até 2 perguntas relacionadas a:</p>
              <ul className="space-y-2 text-gray-300 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✔</span>
                  <span>Treino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✔</span>
                  <span>Corpo e performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✔</span>
                  <span>Dieta não clínica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✔</span>
                  <span>Mentalidade, foco e disciplina</span>
                </li>
              </ul>
              
              <p className="text-sm text-gray-400 mb-2">Exemplos de perguntas válidas:</p>
              <ul className="space-y-1 text-gray-300 text-sm mb-4">
                <li className="pl-4">• "Devo aumentar a carga nesse exercício?"</li>
                <li className="pl-4">• "Como melhorar meu foco nos treinos?"</li>
                <li className="pl-4">• "Treinar 3 ou 4 vezes por semana nesse momento?"</li>
              </ul>

              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-sm text-gray-400 mb-2">Este módulo NÃO responde:</p>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✘</span>
                    <span>Perguntas fora do tema treino e performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✘</span>
                    <span>Perguntas médicas ou clínicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✘</span>
                    <span>Perguntas genéricas sem relação com seu treino</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2 text-blue-400">Importante</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• O relatório será gerado automaticamente</li>
                <li>• O acesso ficará bloqueado até o próximo ciclo semanal</li>
                <li>• Planeje bem seu relato e suas perguntas</li>
                <li>• Quanto mais claras as informações, mais preciso será seu plano</li>
              </ul>
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={() => setStep('form')}
            disabled={!canCheckIn()}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              canCheckIn()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canCheckIn() ? 'Iniciar Check-in' : `Aguarde ${getDaysUntilNextCheckIn()} dias`}
          </button>
        </div>
      </div>
    );
  }

  // Tela de formulário
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setStep('info')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Seu Check-in</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-2xl mx-auto pb-24">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Relato Semanal */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Relato Semanal <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-400 mb-3">
              Descreva como foi sua semana de treinos (máx. 500 caracteres)
            </p>
            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Ex: Treinei 4x essa semana, foquei em musculação. Aumentei carga no supino. Me sinto mais disposto, mas tive dores leves no ombro direito..."
              className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {report.length}/500 caracteres
            </p>
          </div>

          {/* Pergunta 1 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Pergunta 1 (opcional)
            </label>
            <input
              type="text"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              placeholder="Ex: Devo aumentar a frequência de treinos?"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Pergunta 2 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Pergunta 2 (opcional)
            </label>
            <input
              type="text"
              value={question2}
              onChange={(e) => setQuestion2(e.target.value)}
              placeholder="Ex: Como melhorar minha recuperação muscular?"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Botão de envio */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || report.trim().length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Check-in
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Tela de resultado
  if (step === 'result' && aiResponse) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Seu Relatório</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-2xl mx-auto pb-24">
          {/* Status */}
          <div className="mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2 text-blue-400">[STATUS]</h3>
            <p className="text-gray-200">{aiResponse.status}</p>
          </div>

          {/* Análise */}
          <div className="mb-6 bg-gray-800/50 border border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2">[ANÁLISE]</h3>
            <p className="text-gray-300 whitespace-pre-line">{aiResponse.analysis}</p>
          </div>

          {/* Orientação */}
          <div className="mb-6 bg-gray-800/50 border border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2">[ORIENTAÇÃO]</h3>
            <p className="text-gray-300 whitespace-pre-line">{aiResponse.guidance}</p>
          </div>

          {/* Plano de Treino (se houver) */}
          {aiResponse.workoutPlan && userProfile?.hasSubscription && (
            <div className="mb-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2 text-green-400">[PLANO DE TREINO]</h3>
              <div className="text-gray-200 whitespace-pre-line">{aiResponse.workoutPlan}</div>
            </div>
          )}

          {/* Mensagem Final */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-5">
            <h3 className="font-semibold text-lg mb-2 text-purple-400">[MENSAGEM FINAL]</h3>
            <p className="text-gray-200">{aiResponse.finalMessage}</p>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-gray-300 text-center">
              Próximo check-in disponível em 7 dias
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
