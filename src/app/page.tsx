'use client';

import { useState, useEffect } from 'react';
import { Screen, Category, Workout, Challenge, Post, UserProfile, Comment, QuizAnswers } from './types';
import { challengesData, postsData } from './data';

// Components
import LandingScreen from './components/LandingScreen';
import AuthScreen from './components/AuthScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import PlansScreen from './components/PlansScreen';
import HomeScreen from './components/HomeScreen';
import CategoryWorkoutsScreen from './components/CategoryWorkoutsScreen';
import WorkoutDetailScreen from './components/WorkoutDetailScreen';
import ChallengesScreen from './components/ChallengesScreen';
import ChallengeDetailScreen from './components/ChallengeDetailScreen';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import CheckInScreen from './components/CheckInScreen';
import BottomNav from './components/BottomNav';

type AuthMode = 'login' | 'signup';

export default function Shape365() {
  // ==================== STATE ====================
  const [currentScreen, setCurrentScreen] = useState<Screen | 'landing' | 'auth'>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [challenges, setChallenges] = useState<Challenge[]>(challengesData);

  // Verificar assinatura ao carregar
  useEffect(() => {
    const checkSubscription = async () => {
      const savedProfile = localStorage.getItem('shape365-profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        
        // Verificar assinatura no backend
        try {
          const response = await fetch('/api/subscription/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: profile.email }),
          });

          if (response.ok) {
            const { hasSubscription, subscription } = await response.json();
            
            // Atualizar perfil com status real da assinatura
            const updatedProfile = {
              ...profile,
              hasSubscription,
              subscriptionPlan: subscription?.plan_type,
            };
            
            setUserProfile(updatedProfile);
            localStorage.setItem('shape365-profile', JSON.stringify(updatedProfile));

            // Lógica de redirecionamento
            if (hasSubscription) {
              setCurrentScreen('home');
              setActiveTab('home');
            } else if (profile.quizCompleted) {
              setCurrentScreen('plans');
            }
          } else {
            setUserProfile(profile);
          }
        } catch (error) {
          console.error('Erro ao verificar assinatura:', error);
          setUserProfile(profile);
        }
      }
    };

    checkSubscription();
  }, []);

  // ==================== NAVIGATION HANDLERS ====================
  const handleSignUp = () => {
    setAuthMode('signup');
    setCurrentScreen('auth');
  };

  const handleLogin = () => {
    setAuthMode('login');
    setCurrentScreen('auth');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleAuthComplete = async (name: string, email: string) => {
    if (authMode === 'login') {
      // Login - verificar quiz no Supabase (fonte de verdade)
      const baseProfile: UserProfile = {
        name,
        email,
        age: '',
        weight: '',
        height: '',
        birthDate: '',
        goal: '',
        quizCompleted: false,
        hasSubscription: false,
      };

      // Recuperar perfil local como base (pode ter dados extras como assinatura)
      const savedProfile = localStorage.getItem('shape365-profile');
      const localProfile = savedProfile ? JSON.parse(savedProfile) : null;
      const mergedProfile = localProfile?.email === email ? { ...baseProfile, ...localProfile } : baseProfile;

      try {
        // Verificar quiz no Supabase
        const quizRes = await fetch('/api/quiz/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: email }),
        });

        if (quizRes.ok) {
          const { quizCompleted, quizAnswers } = await quizRes.json();

          const updatedProfile: UserProfile = {
            ...mergedProfile,
            quizCompleted,
            quizAnswers: quizAnswers || mergedProfile.quizAnswers,
            age: quizAnswers?.age || mergedProfile.age,
            weight: quizAnswers?.weight || mergedProfile.weight,
            height: quizAnswers?.height || mergedProfile.height,
            goal: quizAnswers?.mainGoal || mergedProfile.goal,
          };

          setUserProfile(updatedProfile);
          localStorage.setItem('shape365-profile', JSON.stringify(updatedProfile));

          if (updatedProfile.hasSubscription) {
            setCurrentScreen('home');
            setActiveTab('home');
          } else if (quizCompleted) {
            setCurrentScreen('plans');
          } else {
            setCurrentScreen('quiz');
          }
          return;
        }
      } catch (error) {
        console.error('Erro ao verificar quiz no Supabase:', error);
      }

      // Fallback: usar dados locais se a API falhar
      setUserProfile(mergedProfile);
      if (mergedProfile.hasSubscription) {
        setCurrentScreen('home');
        setActiveTab('home');
      } else if (mergedProfile.quizCompleted) {
        setCurrentScreen('plans');
      } else {
        setCurrentScreen('quiz');
      }
    } else {
      // Signup - novo usuário
      const newProfile: UserProfile = {
        name,
        email,
        age: '',
        weight: '',
        height: '',
        birthDate: '',
        goal: '',
        quizCompleted: false,
        hasSubscription: false,
      };

      setUserProfile(newProfile);
      localStorage.setItem('shape365-profile', JSON.stringify(newProfile));

      // Novo usuário sempre vai para o quiz
      setCurrentScreen('quiz');
    }
  };

  const handleQuizComplete = async (quizAnswers: QuizAnswers) => {
    // Atualizar perfil com respostas do quiz
    const updatedProfile: UserProfile = {
      ...userProfile!,
      quizCompleted: true,
      quizAnswers: quizAnswers,
      // Atualizar dados básicos do perfil com respostas do quiz
      age: quizAnswers.age,
      weight: quizAnswers.weight,
      height: quizAnswers.height,
      goal: quizAnswers.mainGoal,
    };

    setUserProfile(updatedProfile);
    localStorage.setItem('shape365-profile', JSON.stringify(updatedProfile));

    // Salvar respostas do quiz no Supabase
    try {
      console.log('Enviando respostas do quiz para API...');
      const response = await fetch('/api/quiz/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: userProfile!.email,
          quizAnswers: quizAnswers,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Erro ao salvar respostas do quiz:', responseData);
      } else {
        console.log('Respostas do quiz salvas com sucesso!', responseData);
      }
    } catch (error) {
      console.error('Erro ao salvar respostas do quiz:', error);
    }

    // Ir para tela de resultado após completar quiz
    setCurrentScreen('result');
  };

  const handleResultContinue = () => {
    // Ir para tela de planos após ver resultado
    setCurrentScreen('plans');
  };

  const handleSubscribe = (plan: 'monthly' | 'semester' | 'annual') => {
    // Nota: O acesso será liberado automaticamente pelo webhook após pagamento aprovado
    // Esta função agora apenas redireciona para o Mercado Pago
    console.log('Redirecionando para pagamento do plano:', plan);
  };

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCurrentScreen('workout-detail');
  };

  const handleCategoryClick = (category: Category | 'Todos') => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      // "Todos" apenas filtra na home, não navega
      setCurrentScreen('home');
      setActiveTab('home');
    } else {
      // Categorias específicas navegam para tela dedicada
      setCurrentScreen('category-workouts');
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentScreen('challenge-detail');
  };

  const handleJoinChallenge = () => {
    if (selectedChallenge) {
      // Update challenge to active
      const updatedChallenges = challenges.map(c => {
        if (c.id === selectedChallenge.id) {
          return { ...c, isActive: true, currentDay: 1 };
        }
        // Deactivate other challenges (only one active at a time)
        return { ...c, isActive: false };
      });
      setChallenges(updatedChallenges);
      
      // Update selected challenge state
      setSelectedChallenge({ ...selectedChallenge, isActive: true, currentDay: 1 });
      
      // Go back to challenges screen
      setCurrentScreen('challenges');
      setActiveTab('challenges');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab as Screen);
    
    // Reset category filter when navigating to home
    if (tab === 'home') {
      setSelectedCategory('Todos');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
    setSelectedCategory('Todos');
  };

  const handleBackToChallenges = () => {
    setCurrentScreen('challenges');
    setActiveTab('challenges');
  };

  const handleBackToCategory = () => {
    setCurrentScreen('category-workouts');
  };

  // ==================== COMMUNITY HANDLERS ====================
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, commentText: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: `c${Date.now()}`,
          user: userProfile?.name || 'Você',
          content: commentText,
          time: 'agora',
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));
  };

  const handleAddPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      user: userProfile?.name || 'Você',
      time: 'agora',
      content,
      likes: 0,
      comments: [],
      image,
      liked: false,
    };
    setPosts([newPost, ...posts]);
  };

  // ==================== PROFILE HANDLERS ====================
  const handleEditProfile = () => {
    // Permitir editar perfil - mas não refazer o quiz completo
    // Apenas atualizar dados básicos
    alert('Funcionalidade de edição de perfil em desenvolvimento');
  };

  const handleRetakeQuiz = () => {
    // Resetar o quiz para permitir refazer
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        quizCompleted: false,
        quizAnswers: undefined,
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('shape365-profile', JSON.stringify(updatedProfile));
      setCurrentScreen('quiz');
    }
  };

  // ==================== RENDER ====================
  return (
    <>
      {currentScreen === 'landing' && (
        <LandingScreen onSignUp={handleSignUp} onLogin={handleLogin} />
      )}

      {currentScreen === 'auth' && (
        <AuthScreen
          onComplete={handleAuthComplete}
          onBack={handleBackToLanding}
          mode={authMode}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}

      {currentScreen === 'result' && userProfile?.quizAnswers && (
        <ResultScreen
          answers={userProfile.quizAnswers}
          onContinue={handleResultContinue}
        />
      )}

      {currentScreen === 'plans' && (
        <PlansScreen
          onSubscribe={handleSubscribe}
          onBack={() => setCurrentScreen('result')}
          userEmail={userProfile?.email}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}

      {currentScreen === 'home' && (
        <>
          <HomeScreen
            onWorkoutClick={handleWorkoutClick}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}

      {currentScreen === 'category-workouts' && (
        <CategoryWorkoutsScreen
          category={selectedCategory as Category}
          onBack={handleBackToHome}
          onWorkoutClick={handleWorkoutClick}
        />
      )}

      {currentScreen === 'workout-detail' && selectedWorkout && (
        <WorkoutDetailScreen
          workout={selectedWorkout}
          onBack={() => {
            // Voltar para a tela anterior (home ou category)
            if (selectedCategory === 'Todos') {
              handleBackToHome();
            } else {
              handleBackToCategory();
            }
          }}
        />
      )}

      {currentScreen === 'challenges' && (
        <>
          <ChallengesScreen
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}

      {currentScreen === 'challenge-detail' && selectedChallenge && (
        <ChallengeDetailScreen
          challenge={selectedChallenge}
          onBack={handleBackToChallenges}
          onJoin={handleJoinChallenge}
        />
      )}

      {currentScreen === 'community' && (
        <>
          <CommunityScreen
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
            onAddPost={handleAddPost}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}

      {currentScreen === 'profile' && (
        <>
          <ProfileScreen
            userProfile={userProfile}
            onEditProfile={handleEditProfile}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}

      {currentScreen === 'checkin' && (
        <>
          <CheckInScreen
            onBack={handleBackToHome}
            userProfile={userProfile}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </>
      )}
    </>
  );
}
