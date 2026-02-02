// ==================== TYPES ====================

export type Screen = 
  | 'splash' 
  | 'onboarding'
  | 'quiz'
  | 'result'
  | 'plans'
  | 'home' 
  | 'workout-detail' 
  | 'category-workouts'
  | 'challenges' 
  | 'challenge-detail'
  | 'community' 
  | 'profile'
  | 'checkin';

// Category: apenas categorias reais de treino (SEM "Todos")
export type Category = 'Cardio' | 'Força' | 'Yoga' | 'Alongamento';

// Subcategory: sistema lógico de subcategorias
export type Subcategory = 
  | 'Corpo Inteiro' 
  | 'Parte Superior' 
  | 'Parte Inferior' 
  | 'Core' 
  | 'HIIT'
  | 'Resistência'
  | 'Flexibilidade'
  | 'Equilíbrio';

export interface Workout {
  id: string;
  title: string;
  category: Category; // NUNCA "Todos"
  subcategory: Subcategory; // Nova propriedade
  duration: string;
  calories: string;
  level: string;
  image: string;
  description: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  reps: string;
}

export interface Challenge {
  id: string;
  title: string;
  days: number;
  currentDay?: number;
  participants: string;
  color: string;
  description: string;
  isActive?: boolean;
  workoutIds: string[]; // Conexão lógica com treinos
}

export interface Post {
  id: string;
  user: string;
  time: string;
  content: string;
  likes: number;
  comments: Comment[];
  image?: string;
  liked?: boolean;
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  time: string;
}

export interface UserProfile {
  name: string;
  email: string;
  age: string;
  weight: string;
  height: string;
  birthDate: string;
  goal: string;
  quizCompleted?: boolean;
  quizAnswers?: QuizAnswers;
  hasSubscription?: boolean;
  subscriptionPlan?: 'monthly' | 'semester' | 'annual';
}

export interface QuizAnswers {
  // Bloco 1: Dados Pessoais
  age: string;
  height: string;
  weight: string;
  gender: string;
  
  // Bloco 2: Objetivos
  mainGoal: string;
  
  // Bloco 3: Experiência Prévia
  experienceLevel: string;
  hasTrainedBefore: string;
  
  // Bloco 4: Rotina
  daysPerWeek: string;
  timePerWorkout: string;
  
  // Bloco 5: Preferências
  favoriteWorkoutType: string;
  workoutDuration: string;
  
  // Bloco 6: Limitações
  hasInjury: string;
  hasRecurringPain: string;
  hasMedicalRestriction: string;
  
  // Bloco 7: Nível Atual
  fitnessLevel: string;
  fatigueLevel: number;
  sleepQuality: number;
  
  // Bloco 8: Comprometimento
  consistencyChallenge: string;
  commitmentLevel: number;
}

export interface AppState {
  currentScreen: Screen;
  activeTab: string;
  selectedWorkout: Workout | null;
  selectedCategory: Category | 'Todos'; // "Todos" apenas como filtro
  selectedChallenge: Challenge | null;
  userProfile: UserProfile | null;
  posts: Post[];
  challenges: Challenge[];
}
