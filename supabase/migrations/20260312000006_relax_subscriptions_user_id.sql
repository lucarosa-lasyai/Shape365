-- Remover a constraint NOT NULL de user_id em subscriptions
-- pois o sistema atual usa user_email como identificador
ALTER TABLE subscriptions ALTER COLUMN user_id DROP NOT NULL;

-- Remover constraint NOT NULL de subscription_id em subscription_payments
-- pois vamos usar mercadopago_payment_id como identificador
ALTER TABLE subscription_payments ALTER COLUMN subscription_id DROP NOT NULL;
