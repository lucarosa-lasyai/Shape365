-- Remover constraint NOT NULL de user_id em subscription_payments
ALTER TABLE subscription_payments ALTER COLUMN user_id DROP NOT NULL;
-- Remover constraint NOT NULL de subscription_id em subscription_payments
ALTER TABLE subscription_payments ALTER COLUMN subscription_id DROP NOT NULL;
