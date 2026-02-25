-- Remover a constraint NOT NULL da coluna user_id
ALTER TABLE quiz_responses 
  ALTER COLUMN user_id DROP NOT NULL;

-- Tornar user_email a chave primária para identificação
-- Se user_id existir mas estiver vazio, podemos torná-lo opcional
