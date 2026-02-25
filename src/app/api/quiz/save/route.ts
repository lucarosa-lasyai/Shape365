import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, quizAnswers } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email do usuário é obrigatório' },
        { status: 400 }
      );
    }

    if (!quizAnswers) {
      return NextResponse.json(
        { error: 'Respostas do quiz são obrigatórias' },
        { status: 400 }
      );
    }

    // Mapear os campos do quiz para o formato do banco
    const quizData = {
      user_email: userEmail,
      age: quizAnswers.age,
      height: quizAnswers.height,
      weight: quizAnswers.weight,
      gender: quizAnswers.gender,
      main_goal: quizAnswers.mainGoal,
      experience_level: quizAnswers.experienceLevel,
      has_trained_before: quizAnswers.hasTrainedBefore,
      days_per_week: quizAnswers.daysPerWeek,
      time_per_workout: quizAnswers.timePerWorkout,
      favorite_workout_type: quizAnswers.favoriteWorkoutType,
      workout_duration: quizAnswers.workoutDuration,
      has_injury: quizAnswers.hasInjury,
      has_recurring_pain: quizAnswers.hasRecurringPain,
      has_medical_restriction: quizAnswers.hasMedicalRestriction,
      fitness_level: quizAnswers.fitnessLevel,
      fatigue_level: quizAnswers.fatigueLevel,
      sleep_quality: quizAnswers.sleepQuality,
      consistency_challenge: quizAnswers.consistencyChallenge,
      commitment_level: quizAnswers.commitmentLevel,
      updated_at: new Date().toISOString(),
    };

    // Verificar se já existe uma resposta para esse usuário
    const { data: existingResponse, error: checkError } = await supabase
      .from('quiz_responses')
      .select('id')
      .eq('user_email', userEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (esperado se não existe)
      console.error('Erro ao verificar resposta existente:', checkError);
      return NextResponse.json(
        { error: 'Erro ao verificar resposta existente' },
        { status: 500 }
      );
    }

    if (existingResponse) {
      // Atualizar resposta existente
      const { error: updateError } = await supabase
        .from('quiz_responses')
        .update(quizData)
        .eq('user_email', userEmail);

      if (updateError) {
        console.error('Erro ao atualizar resposta do quiz:', updateError);
        return NextResponse.json(
          { error: 'Erro ao atualizar resposta do quiz' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Resposta do quiz atualizada com sucesso',
      });
    } else {
      // Inserir nova resposta
      const { error: insertError } = await supabase
        .from('quiz_responses')
        .insert(quizData);

      if (insertError) {
        console.error('Erro ao inserir resposta do quiz:', insertError);
        return NextResponse.json(
          { error: 'Erro ao inserir resposta do quiz' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Resposta do quiz salva com sucesso',
      });
    }
  } catch (error) {
    console.error('Erro ao processar salvamento do quiz:', error);
    return NextResponse.json(
      { error: 'Erro ao processar salvamento do quiz' },
      { status: 500 }
    );
  }
}
