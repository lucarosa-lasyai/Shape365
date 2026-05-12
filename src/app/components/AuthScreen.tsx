'use client';

import { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onComplete: (name: string, email: string) => void;
  onBack: () => void;
  mode: 'login' | 'signup';
}

export default function AuthScreen({ onComplete, onBack, mode: initialMode }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Verificar se email já está cadastrado
        const res = await fetch('/api/user/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (data.exists) {
          setErrorMsg('Este e-mail já possui uma conta. Faça login para continuar.');
          setLoading(false);
          return;
        }

        onComplete(name, email);
      } else {
        // Verificar se email existe para login
        const res = await fetch('/api/user/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (!data.exists) {
          setErrorMsg('Nenhuma conta encontrada com este e-mail. Crie uma conta para começar.');
          setLoading(false);
          return;
        }

        onComplete(email.split('@')[0], email);
      }
    } catch {
      setErrorMsg('Ocorreu um erro. Tente novamente.');
      setLoading(false);
    }
  };

  const canSubmit = () => {
    if (loading) return false;
    if (mode === 'signup') {
      return name && email && password;
    }
    return email && password;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">
            Shape <span className="text-[#FF6B35]">365</span>
          </h1>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="text-gray-400">
            {mode === 'login' 
              ? 'Entre para continuar sua jornada' 
              : 'Comece sua transformação hoje'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {mode === 'signup' && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-[#FF6B35] transition-all"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-red-300">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit()}
            className={`w-full py-4 font-bold text-lg rounded-xl transition-all ${
              canSubmit()
                ? 'bg-[#FF6B35] text-white hover:shadow-2xl hover:scale-105'
                : 'bg-white/10 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Verificando...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="text-center">
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrorMsg(''); }}
            className="text-gray-400 hover:text-white transition-all"
          >
            {mode === 'login' ? (
              <>
                Não tem uma conta?{' '}
                <span className="text-[#FF6B35] font-semibold">Inscreva-se</span>
              </>
            ) : (
              <>
                Já tem uma conta?{' '}
                <span className="text-[#FF6B35] font-semibold">Faça login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
