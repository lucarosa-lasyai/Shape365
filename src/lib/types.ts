// Types para o App Fitness Completo

export type UserLevel = 'sedentario' | 'iniciante' | 'intermediario' | 'avancado';
export type UserGoal = 'emagrecimento' | 'definicao' | 'hipertrofia' | 'performance';
export type SportType = 'musculacao' | 'corrida' | 'ciclismo' | 'natacao' | 'crossfit' | 'funcional' | 'nenhum';
export type ProtocolType = '21dias' | '30dias' | '60dias' | 'continuo';
export type NutritionProtocol = 'lowcarb' | 'balanceado' | 'cutting' | 'bulking';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'masculino' | 'feminino';
  level: UserLevel;
  goal: UserGoal;
  sports: SportType[];
  availableTime: number; // minutos por dia
  emotionalPain: string[];
  aestheticGoals: string[];
  currentProtocol?: ProtocolType;
  startDate?: Date;
  targetWeight?: number;
  createdAt: Date;
}

export interface WorkoutSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: UserLevel;
  type: SportType;
  exercises: Exercise[];
  caloriesBurn: number;
  videoUrl?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  instructions: string;
  videoUrl?: string;
  muscleGroup: string;
}

export interface DailyChallenge {
  id: string;
  day: number;
  title: string;
  workout: WorkoutSession;
  nutrition: NutritionPlan;
  motivationalAudio: string;
  checklist: ChecklistItem[];
  completed: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  points: number;
}

export interface NutritionPlan {
  id: string;
  protocol: NutritionProtocol;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
  shoppingList: string[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: string[];
  calories: number;
  protein: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProgress {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalPoints: number;
  achievements: Achievement[];
  weeklyGoal: number;
  weeklyCompleted: number;
  monthlyRanking: number;
  progressPhotos: ProgressPhoto[];
  weightHistory: WeightEntry[];
}

export interface ProgressPhoto {
  id: string;
  date: Date;
  frontUrl: string;
  sideUrl: string;
  backUrl: string;
  weight: number;
  notes?: string;
}

export interface WeightEntry {
  date: Date;
  weight: number;
  bodyFat?: number;
}

export interface MindsetLesson {
  id: string;
  title: string;
  category: 'disciplina' | 'motivacao' | 'habitos' | 'emocional';
  content: string;
  audioUrl: string;
  duration: number;
  completed: boolean;
}

export interface MonthlyChallenge {
  id: string;
  month: string;
  title: string;
  description: string;
  goal: number;
  progress: number;
  reward: Achievement;
  participants: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'mensal' | 'semestral' | 'anual';
  pricePerMonth: number;
  savings?: number;
  features: string[];
  highlighted: boolean;
}
