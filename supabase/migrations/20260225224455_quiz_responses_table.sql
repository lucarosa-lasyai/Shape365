-- Tabela para armazenar as respostas do quiz dos usuários
create table if not exists quiz_responses (
  id uuid default gen_random_uuid() primary key,
  user_email text not null,

  -- Dados pessoais
  age text,
  height text,
  weight text,
  gender text,

  -- Objetivos
  main_goal text,

  -- Experiência
  experience_level text,
  has_trained_before text,

  -- Rotina
  days_per_week text,
  time_per_workout text,

  -- Preferências
  favorite_workout_type text,
  workout_duration text,

  -- Limitações
  has_injury text,
  has_recurring_pain text,
  has_medical_restriction text,

  -- Nível atual
  fitness_level text,
  fatigue_level integer,
  sleep_quality integer,

  -- Comprometimento
  consistency_challenge text,
  commitment_level integer,

  -- Metadados
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índice para buscar respostas por email
create index if not exists quiz_responses_user_email_idx on quiz_responses(user_email);

-- RLS (Row Level Security)
alter table quiz_responses enable row level security;

-- Política: usuários podem inserir suas próprias respostas
create policy "Usuários podem inserir suas respostas"
  on quiz_responses for insert
  with check (true);

-- Política: usuários podem ver suas próprias respostas
create policy "Usuários podem ver suas respostas"
  on quiz_responses for select
  using (true);

-- Política: usuários podem atualizar suas próprias respostas
create policy "Usuários podem atualizar suas respostas"
  on quiz_responses for update
  using (true);
