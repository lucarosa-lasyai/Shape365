-- Corrigir estrutura da tabela subscriptions existente
-- Adicionar coluna user_email se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'user_email'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN user_email TEXT;
  END IF;
END $$;

-- Adicionar coluna plan_type se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'plan_type'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN plan_type TEXT;
  END IF;
END $$;

-- Adicionar coluna status se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'status'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN status TEXT DEFAULT 'active';
  END IF;
END $$;

-- Adicionar coluna payment_id se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'payment_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN payment_id TEXT;
  END IF;
END $$;

-- Adicionar coluna mercadopago_payment_id se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'mercadopago_payment_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN mercadopago_payment_id TEXT;
  END IF;
END $$;

-- Adicionar coluna amount se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'amount'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN amount DECIMAL(10, 2);
  END IF;
END $$;

-- Adicionar coluna expires_at se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'expires_at'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN expires_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Adicionar coluna updated_at se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscriptions' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Criar índice para user_email (se não existir)
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email ON subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Criar tabela subscription_payments se não existir
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

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'subscription_payments' AND policyname = 'Service role full access subscription_payments'
  ) THEN
    CREATE POLICY "Service role full access subscription_payments"
      ON subscription_payments
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Criar tabela subscription_plans se não existir
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_type TEXT UNIQUE NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  price DECIMAL(10, 2) NOT NULL,
  duration_months INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

INSERT INTO subscription_plans (name, plan_type, price, duration_months)
VALUES
  ('Mensal', 'monthly', 29.90, 1),
  ('Semestral', 'semester', 149.90, 6),
  ('Anual', 'annual', 249.90, 12)
ON CONFLICT (plan_type) DO NOTHING;

-- Criar tabela profiles se não existir
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Service role full access profiles'
  ) THEN
    CREATE POLICY "Service role full access profiles"
      ON profiles
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
