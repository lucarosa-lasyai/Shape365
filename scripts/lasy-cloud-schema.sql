-- ============================================================
-- Shape 365 — Schema Lasy Cloud
-- Migração completa do Supabase para Lasy Cloud
-- ============================================================

-- ============================================================
-- 1. TABELA: profiles
-- Perfis dos usuários autenticados
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_profiles" ON profiles;
CREATE POLICY "service_role_full_access_profiles"
  ON profiles USING (true) WITH CHECK (true);

-- ============================================================
-- 2. TABELA: subscriptions
-- Assinaturas ativas dos usuários (1 por usuário)
-- ============================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email               TEXT UNIQUE NOT NULL,
  plan_type                TEXT NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  status                   TEXT NOT NULL DEFAULT 'active'
                             CHECK (status IN ('active', 'cancelled', 'expired')),
  payment_id               TEXT,
  mercadopago_payment_id   TEXT,
  amount                   NUMERIC(10, 2),
  expires_at               TIMESTAMPTZ NOT NULL,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_email  ON subscriptions(user_email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status      ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_expires_at  ON subscriptions(expires_at);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_subscriptions" ON subscriptions;
CREATE POLICY "service_role_full_access_subscriptions"
  ON subscriptions USING (true) WITH CHECK (true);

-- ============================================================
-- 3. TABELA: subscription_payments
-- Histórico completo de pagamentos (todos os status)
-- ============================================================
CREATE TABLE IF NOT EXISTS subscription_payments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email               TEXT NOT NULL,
  mercadopago_payment_id   TEXT UNIQUE NOT NULL,
  plan_type                TEXT NOT NULL,
  amount                   NUMERIC(10, 2) NOT NULL,
  status                   TEXT NOT NULL,  -- approved, pending, rejected, cancelled
  payment_date             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sub_payments_user_email ON subscription_payments(user_email);
CREATE INDEX IF NOT EXISTS idx_sub_payments_mp_id      ON subscription_payments(mercadopago_payment_id);
CREATE INDEX IF NOT EXISTS idx_sub_payments_status     ON subscription_payments(status);

ALTER TABLE subscription_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_subscription_payments" ON subscription_payments;
CREATE POLICY "service_role_full_access_subscription_payments"
  ON subscription_payments USING (true) WITH CHECK (true);

-- ============================================================
-- 4. TABELA: subscription_plans
-- Planos disponíveis para assinatura
-- ============================================================
CREATE TABLE IF NOT EXISTS subscription_plans (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  plan_type        TEXT UNIQUE NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual')),
  price            NUMERIC(10, 2) NOT NULL,
  duration_months  INTEGER NOT NULL,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "plans_visible_to_all" ON subscription_plans;
CREATE POLICY "plans_visible_to_all"
  ON subscription_plans FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "service_role_full_access_plans" ON subscription_plans;
CREATE POLICY "service_role_full_access_plans"
  ON subscription_plans USING (true) WITH CHECK (true);

-- Inserir planos padrão
INSERT INTO subscription_plans (name, plan_type, price, duration_months)
VALUES
  ('Mensal',    'monthly',  29.90,  1),
  ('Semestral', 'semester', 149.90, 6),
  ('Anual',     'annual',   249.90, 12)
ON CONFLICT (plan_type) DO UPDATE SET
  price           = EXCLUDED.price,
  duration_months = EXCLUDED.duration_months,
  is_active       = true;

-- ============================================================
-- 5. TABELA: quiz_responses
-- Respostas do quiz de avaliação física
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_responses (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email              TEXT UNIQUE NOT NULL,  -- UNIQUE: 1 resposta por usuário (upsert)

  -- Dados pessoais
  age                     TEXT,
  height                  TEXT,
  weight                  TEXT,
  gender                  TEXT,

  -- Objetivos
  main_goal               TEXT,

  -- Experiência
  experience_level        TEXT,
  has_trained_before      TEXT,

  -- Rotina
  days_per_week           TEXT,
  time_per_workout        TEXT,

  -- Preferências
  favorite_workout_type   TEXT,
  workout_duration        TEXT,

  -- Limitações físicas
  has_injury              TEXT,
  has_recurring_pain      TEXT,
  has_medical_restriction TEXT,

  -- Nível atual
  fitness_level           TEXT,
  fatigue_level           INTEGER CHECK (fatigue_level BETWEEN 1 AND 5),
  sleep_quality           INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),

  -- Comprometimento
  consistency_challenge   TEXT,
  commitment_level        INTEGER CHECK (commitment_level BETWEEN 1 AND 5),

  -- Metadados
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_user_email ON quiz_responses(user_email);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_quiz" ON quiz_responses;
CREATE POLICY "service_role_full_access_quiz"
  ON quiz_responses USING (true) WITH CHECK (true);

-- ============================================================
-- FUNÇÃO: updated_at automático via trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas que têm updated_at
DROP TRIGGER IF EXISTS set_updated_at_profiles           ON profiles;
DROP TRIGGER IF EXISTS set_updated_at_subscriptions      ON subscriptions;
DROP TRIGGER IF EXISTS set_updated_at_quiz_responses     ON quiz_responses;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_subscriptions
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_quiz_responses
  BEFORE UPDATE ON quiz_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
