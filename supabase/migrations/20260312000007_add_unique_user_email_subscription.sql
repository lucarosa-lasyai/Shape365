-- Garantir que user_email seja único em subscriptions (para upsert funcionar)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'subscriptions'
      AND indexname = 'subscriptions_user_email_unique'
  ) THEN
    CREATE UNIQUE INDEX subscriptions_user_email_unique ON subscriptions(user_email)
    WHERE user_email IS NOT NULL;
  END IF;
END $$;

-- Garantir que mercadopago_payment_id seja único em subscription_payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'subscription_payments'
      AND indexname = 'subscription_payments_mp_id_unique'
  ) THEN
    CREATE UNIQUE INDEX subscription_payments_mp_id_unique ON subscription_payments(mercadopago_payment_id)
    WHERE mercadopago_payment_id IS NOT NULL;
  END IF;
END $$;
