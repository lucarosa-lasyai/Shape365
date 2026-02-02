import { Workout, Challenge, Post, Category } from './types';

// ==================== WORKOUTS DATA ====================

export const workoutsData: Workout[] = [
  // FORÇA - CORPO INTEIRO
  {
    id: 'forca-corpo-inteiro-1',
    title: 'Treino Corpo Inteiro',
    category: 'Força',
    subcategory: 'Corpo Inteiro',
    duration: '30 min',
    calories: '450 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    description: 'Treino completo de força para todo o corpo. Desenvolva músculos e resistência com exercícios compostos eficientes.',
    exercises: [
      { name: 'Flexões', reps: '3 séries × 15 reps' },
      { name: 'Agachamentos', reps: '3 séries × 20 reps' },
      { name: 'Prancha', reps: '3 séries × 45 seg' },
      { name: 'Afundos', reps: '3 séries × 12 reps/perna' },
      { name: 'Burpees', reps: '3 séries × 10 reps' },
    ],
  },
  {
    id: 'forca-corpo-inteiro-2',
    title: 'Full Body Power',
    category: 'Força',
    subcategory: 'Corpo Inteiro',
    duration: '35 min',
    calories: '500 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    description: 'Treino intenso de força para todo o corpo com foco em potência e explosão muscular.',
    exercises: [
      { name: 'Agachamento com Salto', reps: '4 séries × 12 reps' },
      { name: 'Flexão Explosiva', reps: '4 séries × 10 reps' },
      { name: 'Levantamento Terra', reps: '4 séries × 8 reps' },
      { name: 'Pull-ups', reps: '4 séries × 8 reps' },
      { name: 'Thruster', reps: '4 séries × 12 reps' },
    ],
  },

  // FORÇA - PARTE SUPERIOR
  {
    id: 'forca-superior-1',
    title: 'Parte Superior',
    category: 'Força',
    subcategory: 'Parte Superior',
    duration: '25 min',
    calories: '280 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    description: 'Foco em peito, ombros, costas e braços. Treino completo para desenvolver força e definição na parte superior do corpo.',
    exercises: [
      { name: 'Flexões Diamante', reps: '3 séries × 12 reps' },
      { name: 'Tríceps no Banco', reps: '3 séries × 15 reps' },
      { name: 'Remada Curvada', reps: '3 séries × 12 reps' },
      { name: 'Elevação Lateral', reps: '3 séries × 15 reps' },
      { name: 'Rosca Direta', reps: '3 séries × 12 reps' },
    ],
  },
  {
    id: 'forca-superior-2',
    title: 'Peito e Tríceps',
    category: 'Força',
    subcategory: 'Parte Superior',
    duration: '30 min',
    calories: '320 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
    description: 'Treino focado em peito e tríceps com exercícios compostos e isolados para máximo desenvolvimento muscular.',
    exercises: [
      { name: 'Supino com Halteres', reps: '4 séries × 10 reps' },
      { name: 'Flexão Inclinada', reps: '3 séries × 15 reps' },
      { name: 'Crucifixo', reps: '3 séries × 12 reps' },
      { name: 'Tríceps Testa', reps: '4 séries × 12 reps' },
      { name: 'Mergulho', reps: '3 séries × 10 reps' },
    ],
  },
  {
    id: 'forca-superior-3',
    title: 'Costas e Bíceps',
    category: 'Força',
    subcategory: 'Parte Superior',
    duration: '28 min',
    calories: '300 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop',
    description: 'Desenvolvimento completo de costas e bíceps para força e definição muscular.',
    exercises: [
      { name: 'Barra Fixa', reps: '4 séries × 8 reps' },
      { name: 'Remada com Halteres', reps: '4 séries × 12 reps' },
      { name: 'Pulldown', reps: '3 séries × 15 reps' },
      { name: 'Rosca Martelo', reps: '4 séries × 12 reps' },
      { name: 'Rosca Concentrada', reps: '3 séries × 10 reps' },
    ],
  },

  // FORÇA - PARTE INFERIOR
  {
    id: 'forca-inferior-1',
    title: 'Parte Inferior',
    category: 'Força',
    subcategory: 'Parte Inferior',
    duration: '25 min',
    calories: '350 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop',
    description: 'Treino completo para pernas e glúteos. Desenvolva força, potência e resistência nos membros inferiores.',
    exercises: [
      { name: 'Agachamento Profundo', reps: '4 séries × 15 reps' },
      { name: 'Afundo Búlgaro', reps: '3 séries × 12 reps/perna' },
      { name: 'Stiff', reps: '4 séries × 12 reps' },
      { name: 'Elevação Pélvica', reps: '3 séries × 20 reps' },
      { name: 'Panturrilha em Pé', reps: '4 séries × 20 reps' },
    ],
  },
  {
    id: 'forca-inferior-2',
    title: 'Glúteos e Posterior',
    category: 'Força',
    subcategory: 'Parte Inferior',
    duration: '30 min',
    calories: '380 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Treino intenso focado em glúteos e cadeia posterior. Ideal para desenvolvimento e tonificação.',
    exercises: [
      { name: 'Hip Thrust', reps: '4 séries × 15 reps' },
      { name: 'Sumô Squat', reps: '4 séries × 12 reps' },
      { name: 'Kickback', reps: '3 séries × 15 reps/perna' },
      { name: 'Good Morning', reps: '3 séries × 12 reps' },
      { name: 'Abdutor', reps: '4 séries × 20 reps' },
    ],
  },
  {
    id: 'forca-inferior-3',
    title: 'Pernas Completo',
    category: 'Força',
    subcategory: 'Parte Inferior',
    duration: '35 min',
    calories: '420 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
    description: 'Treino completo e intenso para todas as regiões das pernas.',
    exercises: [
      { name: 'Agachamento Livre', reps: '5 séries × 12 reps' },
      { name: 'Leg Press', reps: '4 séries × 15 reps' },
      { name: 'Cadeira Extensora', reps: '4 séries × 15 reps' },
      { name: 'Mesa Flexora', reps: '4 séries × 12 reps' },
      { name: 'Adutor/Abdutor', reps: '3 séries × 20 reps' },
    ],
  },

  // FORÇA - CORE
  {
    id: 'forca-core-1',
    title: 'Core e Abdômen',
    category: 'Força',
    subcategory: 'Core',
    duration: '20 min',
    calories: '200 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Treino focado em fortalecer o core e definir o abdômen. Exercícios para todos os ângulos do abdômen.',
    exercises: [
      { name: 'Prancha Frontal', reps: '3 séries × 60 seg' },
      { name: 'Crunch', reps: '3 séries × 20 reps' },
      { name: 'Bicicleta', reps: '3 séries × 30 reps' },
      { name: 'Prancha Lateral', reps: '3 séries × 45 seg/lado' },
      { name: 'Russian Twist', reps: '3 séries × 30 reps' },
    ],
  },
  {
    id: 'forca-core-2',
    title: 'Abdômen Definido',
    category: 'Força',
    subcategory: 'Core',
    duration: '25 min',
    calories: '240 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Treino avançado para esculpir e definir o abdômen com exercícios desafiadores.',
    exercises: [
      { name: 'V-Up', reps: '4 séries × 15 reps' },
      { name: 'Dragon Flag', reps: '3 séries × 8 reps' },
      { name: 'Hollow Hold', reps: '4 séries × 45 seg' },
      { name: 'Leg Raises', reps: '4 séries × 15 reps' },
      { name: 'Ab Wheel', reps: '3 séries × 12 reps' },
    ],
  },

  // CARDIO - HIIT
  {
    id: 'cardio-hiit-1',
    title: 'HIIT Intenso',
    category: 'Cardio',
    subcategory: 'HIIT',
    duration: '20 min',
    calories: '400 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    description: 'Treino intervalado de alta intensidade para queimar calorias e melhorar condicionamento físico.',
    exercises: [
      { name: 'Burpees', reps: '8 séries × 30 seg' },
      { name: 'Mountain Climbers', reps: '8 séries × 30 seg' },
      { name: 'Jump Squats', reps: '8 séries × 20 reps' },
      { name: 'High Knees', reps: '8 séries × 30 seg' },
      { name: 'Tuck Jumps', reps: '8 séries × 10 reps' },
    ],
  },
  {
    id: 'cardio-hiit-2',
    title: 'HIIT Queima Gordura',
    category: 'Cardio',
    subcategory: 'HIIT',
    duration: '25 min',
    calories: '450 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
    description: 'Treino intervalado projetado para maximizar a queima de gordura em menos tempo.',
    exercises: [
      { name: 'Sprint Intervals', reps: '10 séries × 30 seg' },
      { name: 'Jumping Jacks', reps: '5 séries × 45 seg' },
      { name: 'Box Jumps', reps: '5 séries × 12 reps' },
      { name: 'Skaters', reps: '5 séries × 20 reps' },
      { name: 'Plank Jacks', reps: '5 séries × 30 seg' },
    ],
  },

  // CARDIO - RESISTÊNCIA
  {
    id: 'cardio-resistencia-1',
    title: 'Cardio Resistência',
    category: 'Cardio',
    subcategory: 'Resistência',
    duration: '35 min',
    calories: '380 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
    description: 'Treino cardiovascular focado em melhorar resistência e condicionamento aeróbico.',
    exercises: [
      { name: 'Corrida Moderada', reps: '15 min contínuo' },
      { name: 'Jumping Jacks', reps: '3 séries × 2 min' },
      { name: 'Step-ups', reps: '4 séries × 20 reps' },
      { name: 'Shadow Boxing', reps: '3 séries × 3 min' },
      { name: 'Caminhada Rápida', reps: '10 min cooldown' },
    ],
  },
  {
    id: 'cardio-resistencia-2',
    title: 'Cardio Baixo Impacto',
    category: 'Cardio',
    subcategory: 'Resistência',
    duration: '30 min',
    calories: '280 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=300&fit=crop',
    description: 'Treino cardiovascular de baixo impacto ideal para iniciantes ou recuperação.',
    exercises: [
      { name: 'Caminhada Rápida', reps: '10 min' },
      { name: 'Marcha Estacionária', reps: '5 séries × 2 min' },
      { name: 'Step Touch', reps: '4 séries × 3 min' },
      { name: 'Arm Circles', reps: '3 séries × 1 min' },
      { name: 'Cooldown Walk', reps: '5 min' },
    ],
  },

  // YOGA - FLEXIBILIDADE
  {
    id: 'yoga-flexibilidade-1',
    title: 'Yoga Matinal',
    category: 'Yoga',
    subcategory: 'Flexibilidade',
    duration: '25 min',
    calories: '150 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    description: 'Sequência suave de yoga para começar o dia com energia e flexibilidade. Perfeito para iniciantes.',
    exercises: [
      { name: 'Saudação ao Sol', reps: '5 repetições' },
      { name: 'Postura do Guerreiro I', reps: '3 séries × 30 seg/lado' },
      { name: 'Postura da Árvore', reps: '2 séries × 45 seg/lado' },
      { name: 'Cachorro Olhando para Baixo', reps: '3 séries × 60 seg' },
      { name: 'Postura da Criança', reps: '2 min' },
    ],
  },
  {
    id: 'yoga-flexibilidade-2',
    title: 'Yoga Restaurativo',
    category: 'Yoga',
    subcategory: 'Flexibilidade',
    duration: '30 min',
    calories: '120 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop',
    description: 'Prática suave de yoga focada em relaxamento e recuperação muscular.',
    exercises: [
      { name: 'Respiração Profunda', reps: '5 min' },
      { name: 'Postura do Gato-Vaca', reps: '3 séries × 10 reps' },
      { name: 'Torção Espinal Deitado', reps: '2 séries × 1 min/lado' },
      { name: 'Postura da Borboleta', reps: '3 min' },
      { name: 'Savasana', reps: '5 min' },
    ],
  },

  // YOGA - EQUILÍBRIO
  {
    id: 'yoga-equilibrio-1',
    title: 'Yoga Flow Avançado',
    category: 'Yoga',
    subcategory: 'Equilíbrio',
    duration: '35 min',
    calories: '200 kcal',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    description: 'Fluxo dinâmico de yoga com posturas desafiadoras para força, equilíbrio e flexibilidade.',
    exercises: [
      { name: 'Vinyasa Flow', reps: '10 min contínuo' },
      { name: 'Postura do Corvo', reps: '3 séries × 30 seg' },
      { name: 'Headstand', reps: '3 séries × 45 seg' },
      { name: 'Postura da Roda', reps: '3 séries × 30 seg' },
      { name: 'Meditação Final', reps: '5 min' },
    ],
  },
  {
    id: 'yoga-equilibrio-2',
    title: 'Yoga Força e Equilíbrio',
    category: 'Yoga',
    subcategory: 'Equilíbrio',
    duration: '30 min',
    calories: '180 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop',
    description: 'Combinação de posturas que desenvolvem força e equilíbrio simultaneamente.',
    exercises: [
      { name: 'Guerreiro III', reps: '3 séries × 45 seg/lado' },
      { name: 'Meia Lua', reps: '3 séries × 30 seg/lado' },
      { name: 'Postura do Barco', reps: '4 séries × 45 seg' },
      { name: 'Águia', reps: '3 séries × 30 seg/lado' },
      { name: 'Prancha Lateral', reps: '3 séries × 45 seg/lado' },
    ],
  },

  // ALONGAMENTO - FLEXIBILIDADE
  {
    id: 'alongamento-flexibilidade-1',
    title: 'Alongamento Completo',
    category: 'Alongamento',
    subcategory: 'Flexibilidade',
    duration: '15 min',
    calories: '80 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop',
    description: 'Rotina de alongamento para todo o corpo. Ideal para recuperação e flexibilidade.',
    exercises: [
      { name: 'Alongamento de Isquiotibiais', reps: '2 séries × 45 seg/perna' },
      { name: 'Alongamento de Quadríceps', reps: '2 séries × 45 seg/perna' },
      { name: 'Alongamento de Ombros', reps: '2 séries × 30 seg/braço' },
      { name: 'Torção Espinal', reps: '2 séries × 45 seg/lado' },
      { name: 'Alongamento de Gato-Vaca', reps: '3 séries × 10 reps' },
    ],
  },
  {
    id: 'alongamento-flexibilidade-2',
    title: 'Mobilidade e Flexibilidade',
    category: 'Alongamento',
    subcategory: 'Flexibilidade',
    duration: '20 min',
    calories: '100 kcal',
    level: 'Médio',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    description: 'Treino focado em melhorar mobilidade articular e flexibilidade muscular.',
    exercises: [
      { name: 'Círculos de Quadril', reps: '3 séries × 10 reps/lado' },
      { name: 'Alongamento Dinâmico de Pernas', reps: '3 séries × 15 reps' },
      { name: 'Rotação de Ombros', reps: '3 séries × 20 reps' },
      { name: 'Ponte com Elevação', reps: '3 séries × 12 reps' },
      { name: 'Alongamento de Piriforme', reps: '2 séries × 60 seg/lado' },
    ],
  },

  // ALONGAMENTO - RECUPERAÇÃO
  {
    id: 'alongamento-recuperacao-1',
    title: 'Alongamento Pós-Treino',
    category: 'Alongamento',
    subcategory: 'Flexibilidade',
    duration: '12 min',
    calories: '60 kcal',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    description: 'Alongamentos essenciais para fazer após qualquer treino. Previne lesões e melhora recuperação.',
    exercises: [
      { name: 'Alongamento de Panturrilha', reps: '2 séries × 30 seg/perna' },
      { name: 'Alongamento de Peito', reps: '2 séries × 30 seg' },
      { name: 'Alongamento de Costas', reps: '2 séries × 45 seg' },
      { name: 'Alongamento de Glúteos', reps: '2 séries × 30 seg/lado' },
      { name: 'Relaxamento Final', reps: '2 min' },
    ],
  },
];

// ==================== CHALLENGES DATA ====================

export const challengesData: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Transformação Completa',
    days: 30,
    currentDay: 0,
    participants: '5.2k',
    color: 'from-[#FF6B35] to-[#FF5520]',
    description: 'Desafio completo de 30 dias que combina treinos de força, cardio e flexibilidade. Transforme seu corpo e crie hábitos saudáveis duradouros.',
    isActive: false,
    workoutIds: [
      'forca-corpo-inteiro-1',
      'cardio-hiit-1',
      'forca-superior-1',
      'cardio-resistencia-1',
      'forca-inferior-1',
      'yoga-flexibilidade-1',
      'forca-core-1',
    ],
  },
  {
    id: 'challenge-2',
    title: '7 Dias de Cardio',
    days: 7,
    currentDay: 0,
    participants: '2.5k',
    color: 'from-blue-500 to-cyan-500',
    description: 'Uma semana intensa de treinos cardiovasculares para melhorar seu condicionamento e queimar calorias. Ideal para iniciantes.',
    isActive: false,
    workoutIds: [
      'cardio-hiit-1',
      'cardio-hiit-2',
      'cardio-resistencia-1',
      'cardio-resistencia-2',
    ],
  },
  {
    id: 'challenge-3',
    title: '14 Dias de Força',
    days: 14,
    currentDay: 0,
    participants: '1.8k',
    color: 'from-purple-500 to-pink-500',
    description: 'Duas semanas focadas em construir força e massa muscular. Treinos progressivos para todos os grupos musculares.',
    isActive: false,
    workoutIds: [
      'forca-corpo-inteiro-1',
      'forca-superior-1',
      'forca-inferior-1',
      'forca-core-1',
      'forca-superior-2',
      'forca-inferior-2',
    ],
  },
  {
    id: 'challenge-4',
    title: '21 Dias de Yoga',
    days: 21,
    currentDay: 0,
    participants: '3.2k',
    color: 'from-green-500 to-emerald-500',
    description: 'Três semanas de prática diária de yoga para melhorar flexibilidade, equilíbrio e bem-estar mental.',
    isActive: false,
    workoutIds: [
      'yoga-flexibilidade-1',
      'yoga-flexibilidade-2',
      'yoga-equilibrio-1',
      'yoga-equilibrio-2',
    ],
  },
];

// ==================== COMMUNITY POSTS DATA ====================

export const postsData: Post[] = [
  {
    id: 'post-1',
    user: 'Sarah Johnson',
    time: 'há 2h',
    content: 'Acabei de completar meu desafio de 30 dias! Me sentindo mais forte do que nunca 💪',
    likes: 124,
    comments: [
      { id: 'c1', user: 'Mike Chen', content: 'Parabéns! Inspirador!', time: 'há 1h' },
      { id: 'c2', user: 'Emma Davis', content: 'Você arrasou! 🔥', time: 'há 45min' },
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    liked: false,
  },
  {
    id: 'post-2',
    user: 'Mike Chen',
    time: 'há 5h',
    content: 'Cardio matinal concluído! Quem mais está treinando hoje? 🔥',
    likes: 89,
    comments: [
      { id: 'c3', user: 'João Silva', content: 'Eu! Acabei de terminar também', time: 'há 4h' },
    ],
    liked: false,
  },
  {
    id: 'post-3',
    user: 'Emma Davis',
    time: 'há 1d',
    content: 'Novo recorde pessoal em agachamentos! Consistência é a chave 🎯',
    likes: 156,
    comments: [],
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop',
    liked: false,
  },
];

// ==================== HELPER FUNCTIONS ====================

export const getWorkoutsByCategory = (category: Category | 'Todos'): Workout[] => {
  if (category === 'Todos') {
    return workoutsData;
  }
  return workoutsData.filter(workout => workout.category === category);
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return workoutsData.find(workout => workout.id === id);
};

export const getChallengeById = (id: string): Challenge | undefined => {
  return challengesData.find(challenge => challenge.id === id);
};

export const getWorkoutsBySubcategory = (subcategory: string): Workout[] => {
  return workoutsData.filter(workout => workout.subcategory === subcategory);
};
