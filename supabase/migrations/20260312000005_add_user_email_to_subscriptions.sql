-- Adicionar coluna user_email em subscriptions para suportar busca por email
-- (o sistema atual usa email como identificador, não user_id de auth)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'subscriptions'
      AND column_name = 'user_email'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN user_email TEXT;
    CREATE INDEX idx_subscriptions_user_email ON subscriptions(user_email);
  END IF;
END $$;

-- Adicionar colunas de plano e pagamento se não existirem
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'plan_type'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN plan_type TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'payment_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN payment_id TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'mercadopago_payment_id'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN mercadopago_payment_id TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'amount'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN amount DECIMAL(10, 2);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'expires_at'
  ) THEN
    ALTER TABLE subscriptions ADD COLUMN expires_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Adicionar coluna user_email em subscription_payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'subscription_payments'
      AND column_name = 'user_email'
  ) THEN
    ALTER TABLE subscription_payments ADD COLUMN user_email TEXT;
  END IF;
END $$;

-- Adicionar coluna mercadopago_payment_id em subscription_payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'subscription_payments'
      AND column_name = 'mercadopago_payment_id'
  ) THEN
    ALTER TABLE subscription_payments ADD COLUMN mercadopago_payment_id TEXT UNIQUE;
  END IF;
END $$;

-- Adicionar coluna plan_type em subscription_payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'subscription_payments'
      AND column_name = 'plan_type'
  ) THEN
    ALTER TABLE subscription_payments ADD COLUMN plan_type TEXT;
  END IF;
END $$;

-- Adicionar coluna payment_date em subscription_payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'subscription_payments'
      AND column_name = 'payment_date'
  ) THEN
    ALTER TABLE subscription_payments ADD COLUMN payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;
