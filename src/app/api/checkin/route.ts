import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key',
});

const SYSTEM_PROMPT = `Você é o módulo de IA do aplicativo Shape 365, especializado em análise de treinos e orientação fitness.

FUNÇÃO:
- Analisar dados do perfil do usuário
- Analisar relato semanal de resultados
- Orientar com base nos treinos base do Shape 365
- Ajustar treinos dentro da metodologia do aplicativo

ESCOPO PERMITIDO:
- Treino físico
- Corpo, desempenho e performance
- Dieta NÃO clínica (sem prescrição médica)
- Mentalidade, foco, disciplina e constância

LIMITAÇÕES ABSOLUTAS:
- Não criar treinos fora da metodologia Shape 365
- Não atuar como médico, nutricionista clínico ou terapeuta
- Não responder temas fora do escopo
- Não gerar conteúdos genéricos ou desconectados do app

FORMATO DE RESPOSTA OBRIGATÓRIO:
Você DEVE responder SEMPRE seguindo esta estrutura exata:

[STATUS]
Resumo curto do estado atual do usuário (1-2 frases)

[ANÁLISE]
Análise objetiva do relato semanal (2-3 parágrafos)

[ORIENTAÇÃO]
Orientações claras, diretas e aplicáveis (lista de 3-5 pontos)

[PLANO DE TREINO]
(Apenas se usuário tiver plano ativo)
Segunda: Exercício - Séries x Repetições - Descanso
Terça: ...
(formato simples e direto)

[MENSAGEM FINAL]
Mensagem curta, motivadora e objetiva (1-2 frases)

COMPORTAMENTO:
- Tom profissional, claro, direto e motivador
- Evitar textos longos
- Evitar linguagem clínica
- Evitar respostas genéricas
- Sempre em português

Se pergunta estiver FORA DO ESCOPO, responda:
"Esta pergunta está fora do escopo do módulo de check-in. Posso ajudar com questões sobre treino, performance, dieta não clínica e mentalidade para treinar."`;

export async function POST(request: NextRequest) {
  try {
    const { userProfile, report, question1, question2 } = await request.json();

    // Validações
    if (!report || report.trim().length === 0) {
      return NextResponse.json(
        { error: 'Relato é obrigatório' },
        { status: 400 }
      );
    }

    if (report.length > 500) {
      return NextResponse.json(
        { error: 'Relato deve ter no máximo 500 caracteres' },
        { status: 400 }
      );
    }

    // Construir contexto do usuário
    const userContext = `
PERFIL DO USUÁRIO:
- Nome: ${userProfile?.name || 'Não informado'}
- Idade: ${userProfile?.age || 'Não informado'}
- Peso: ${userProfile?.weight || 'Não informado'}
- Altura: ${userProfile?.height || 'Não informado'}
- Objetivo: ${userProfile?.goal || 'Não informado'}
- Nível de experiência: ${userProfile?.quizAnswers?.experienceLevel || 'Não informado'}
- Dias por semana: ${userProfile?.quizAnswers?.daysPerWeek || 'Não informado'}
- Tempo por treino: ${userProfile?.quizAnswers?.timePerWorkout || 'Não informado'}
- Tem assinatura ativa: ${userProfile?.hasSubscription ? 'Sim' : 'Não'}

RELATO SEMANAL:
${report}
`;

    // Adicionar perguntas se houver
    let questionsText = '';
    const questions = [question1, question2].filter(q => q && q.trim().length > 0);
    
    if (questions.length > 0) {
      questionsText = '\n\nPERGUNTAS DO USUÁRIO:\n' + questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    }

    // Chamar OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: userContext + questionsText,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';

    // Parse da resposta
    const parsedResponse = parseAIResponse(aiResponse);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Erro no check-in:', error);
    return NextResponse.json(
      { error: 'Erro ao processar check-in' },
      { status: 500 }
    );
  }
}

function parseAIResponse(response: string) {
  const sections = {
    status: '',
    analysis: '',
    guidance: '',
    workoutPlan: '',
    finalMessage: '',
  };

  // Extrair seções usando regex
  const statusMatch = response.match(/\[STATUS\]([\s\S]*?)(?=\[ANÁLISE\]|\[ANALYSIS\]|$)/i);
  const analysisMatch = response.match(/\[ANÁLISE\]|\[ANALYSIS\]([\s\S]*?)(?=\[ORIENTAÇÃO\]|\[GUIDANCE\]|$)/i);
  const guidanceMatch = response.match(/\[ORIENTAÇÃO\]|\[GUIDANCE\]([\s\S]*?)(?=\[PLANO DE TREINO\]|\[WORKOUT PLAN\]|\[MENSAGEM FINAL\]|\[FINAL MESSAGE\]|$)/i);
  const workoutMatch = response.match(/\[PLANO DE TREINO\]|\[WORKOUT PLAN\]([\s\S]*?)(?=\[MENSAGEM FINAL\]|\[FINAL MESSAGE\]|$)/i);
  const finalMatch = response.match(/\[MENSAGEM FINAL\]|\[FINAL MESSAGE\]([\s\S]*?)$/i);

  if (statusMatch) sections.status = statusMatch[1].trim();
  if (analysisMatch) sections.analysis = analysisMatch[1].trim();
  if (guidanceMatch) sections.guidance = guidanceMatch[1].trim();
  if (workoutMatch) sections.workoutPlan = workoutMatch[1].trim();
  if (finalMatch) sections.finalMessage = finalMatch[1].trim();

  return sections;
}
