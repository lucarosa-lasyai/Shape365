-- Adicionar colunas que faltam na tabela quiz_responses
-- Usar IF NOT EXISTS para evitar erros se as colunas já existirem

DO $$
BEGIN
  -- Adicionar coluna user_email
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'user_email') THEN
    ALTER TABLE quiz_responses ADD COLUMN user_email text NOT NULL DEFAULT '';
  END IF;

  -- Adicionar coluna age
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'age') THEN
    ALTER TABLE quiz_responses ADD COLUMN age text;
  END IF;

  -- Adicionar coluna height
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'height') THEN
    ALTER TABLE quiz_responses ADD COLUMN height text;
  END IF;

  -- Adicionar coluna weight
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'weight') THEN
    ALTER TABLE quiz_responses ADD COLUMN weight text;
  END IF;

  -- Adicionar coluna gender
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'gender') THEN
    ALTER TABLE quiz_responses ADD COLUMN gender text;
  END IF;

  -- Adicionar coluna main_goal
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'main_goal') THEN
    ALTER TABLE quiz_responses ADD COLUMN main_goal text;
  END IF;

  -- Adicionar coluna experience_level
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'experience_level') THEN
    ALTER TABLE quiz_responses ADD COLUMN experience_level text;
  END IF;

  -- Adicionar coluna has_trained_before
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'has_trained_before') THEN
    ALTER TABLE quiz_responses ADD COLUMN has_trained_before text;
  END IF;

  -- Adicionar coluna days_per_week
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'days_per_week') THEN
    ALTER TABLE quiz_responses ADD COLUMN days_per_week text;
  END IF;

  -- Adicionar coluna time_per_workout
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'time_per_workout') THEN
    ALTER TABLE quiz_responses ADD COLUMN time_per_workout text;
  END IF;

  -- Adicionar coluna favorite_workout_type
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'favorite_workout_type') THEN
    ALTER TABLE quiz_responses ADD COLUMN favorite_workout_type text;
  END IF;

  -- Adicionar coluna workout_duration
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'workout_duration') THEN
    ALTER TABLE quiz_responses ADD COLUMN workout_duration text;
  END IF;

  -- Adicionar coluna has_injury
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'has_injury') THEN
    ALTER TABLE quiz_responses ADD COLUMN has_injury text;
  END IF;

  -- Adicionar coluna has_recurring_pain
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'has_recurring_pain') THEN
    ALTER TABLE quiz_responses ADD COLUMN has_recurring_pain text;
  END IF;

  -- Adicionar coluna has_medical_restriction
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'has_medical_restriction') THEN
    ALTER TABLE quiz_responses ADD COLUMN has_medical_restriction text;
  END IF;

  -- Adicionar coluna fitness_level
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'fitness_level') THEN
    ALTER TABLE quiz_responses ADD COLUMN fitness_level text;
  END IF;

  -- Adicionar coluna fatigue_level
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'fatigue_level') THEN
    ALTER TABLE quiz_responses ADD COLUMN fatigue_level integer;
  END IF;

  -- Adicionar coluna sleep_quality
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'sleep_quality') THEN
    ALTER TABLE quiz_responses ADD COLUMN sleep_quality integer;
  END IF;

  -- Adicionar coluna consistency_challenge
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'consistency_challenge') THEN
    ALTER TABLE quiz_responses ADD COLUMN consistency_challenge text;
  END IF;

  -- Adicionar coluna commitment_level
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'quiz_responses' AND column_name = 'commitment_level') THEN
    ALTER TABLE quiz_responses ADD COLUMN commitment_level integer;
  END IF;
END$$;

-- Criar índice para buscar respostas por email (se não existir)
CREATE INDEX IF NOT EXISTS quiz_responses_user_email_idx ON quiz_responses(user_email);
