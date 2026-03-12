-- Tabela principal de assinaturas dos usuários
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  payment_id TEXT,
  mercadopago_payment_id TEXT,
  amount DECIMAL(10, 2),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email ON subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at ON subscriptions(expires_at);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Service role pode tudo (usado pelo webhook e API server-side)
CREATE POLICY "Service role full access subscriptions"
  ON subscriptions
  USING (true)
  WITH CHECK (true);

-- Tabela de pagamentos de assinatura (histórico)
CREATE TABLE IF NOT EXISTS subscription_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  mercadopago_payment_id TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscription_payments_user_email ON subscription_payments(user_email);
CREATE INDEX IF NOT EXISTS idx_subscription_payments_mp_id ON subscription_payments(mercadopago_payment_id);

ALTER TABLE subscription_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access subscription_payments"
  ON subscription_payments
  USING (true)
  WITH CHECK (true);

-- Tabela de planos disponíveis
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_type TEXT UNIQUE NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  price DECIMAL(10, 2) NOT NULL,
  duration_months INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Inserir planos padrão
INSERT INTO subscription_plans (name, plan_type, price, duration_months)
VALUES
  ('Mensal', 'monthly', 29.90, 1),
  ('Semestral', 'semester', 149.90, 6),
  ('Anual', 'annual', 249.90, 12)
ON CONFLICT (plan_type) DO NOTHING;

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos visíveis para todos"
  ON subscription_plans FOR SELECT
  USING (is_active = true);
