import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email do usuário é obrigatório' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('quiz_responses')
      .select('id, user_email, main_goal, age, weight, height, gender, experience_level, days_per_week, time_per_workout, favorite_workout_type, workout_duration, has_injury, has_recurring_pain, has_medical_restriction, fitness_level, fatigue_level, sleep_quality, consistency_challenge, commitment_level, has_trained_before')
      .eq('user_email', userEmail)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[QUIZ CHECK] Erro ao verificar quiz:', error);
      return NextResponse.json(
        { error: 'Erro ao verificar quiz', details: error },
        { status: 500 }
      );
    }

    if (data) {
      // Mapear de volta para o formato QuizAnswers
      const quizAnswers = {
        age: data.age || '',
        height: data.height || '',
        weight: data.weight || '',
        gender: data.gender || '',
        mainGoal: data.main_goal || '',
        experienceLevel: data.experience_level || '',
        hasTrainedBefore: data.has_trained_before || '',
        daysPerWeek: data.days_per_week || '',
        timePerWorkout: data.time_per_workout || '',
        favoriteWorkoutType: data.favorite_workout_type || '',
        workoutDuration: data.workout_duration || '',
        hasInjury: data.has_injury || '',
        hasRecurringPain: data.has_recurring_pain || '',
        hasMedicalRestriction: data.has_medical_restriction || '',
        fitnessLevel: data.fitness_level || '',
        fatigueLevel: data.fatigue_level || 3,
        sleepQuality: data.sleep_quality || 3,
        consistencyChallenge: data.consistency_challenge || '',
        commitmentLevel: data.commitment_level || 3,
      };

      return NextResponse.json({
        quizCompleted: true,
        quizAnswers,
      });
    }

    return NextResponse.json({ quizCompleted: false });
  } catch (error) {
    console.error('[QUIZ CHECK] Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro ao processar verificação do quiz' },
      { status: 500 }
    );
  }
}
