'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { quiz as quizData } from './quizData';

type RawQuestion = (typeof quizData)['questions'][number];

type NormalizedQuestion = {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  point: number;
  messageForCorrectAnswer?: string;
  messageForIncorrectAnswer?: string;
};

type AnswerState = {
  selectedIndex: number | null;
  isCorrect: boolean;
  points: number;
  feedback: string | null;
};

const DEFAULT_LOCALE = {
  startQuizBtn: 'Start',
  nextQuestionBtn: 'Volgende vraag',
  resultPageHeaderText: 'Jouw score:',
};

function normalizeQuestion(raw: RawQuestion): NormalizedQuestion {
  const correctIndex = Math.max(0, Number(raw.correctAnswer ?? 1) - 1);

  return {
    question: raw.question,
    answers: [...raw.answers],
    correctAnswerIndex: Number.isFinite(correctIndex) ? correctIndex : 0,
    point: Number(raw.point ?? 1) || 1,
    messageForCorrectAnswer: raw.messageForCorrectAnswer,
    messageForIncorrectAnswer: raw.messageForIncorrectAnswer,
  };
}

export default function Kahoot() {
  const quiz = useMemo(() => {
    const questions = quizData.questions.map(normalizeQuestion);
    const maxScore = questions.reduce((sum, q) => sum + q.point, 0);

    return {
      title: quizData.quizTitle ?? 'Kahoot-like Demo Quiz',
      synopsis: quizData.quizSynopsis ?? '',
      questions,
      totalQuestions: questions.length,
      totalPoints: maxScore,
      locale: {
        ...DEFAULT_LOCALE,
        ...quizData.appLocale,
      },
    };
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(() =>
    quiz.questions.map(() => ({
      selectedIndex: null,
      isCorrect: false,
      points: 0,
      feedback: null,
    })),
  );
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const progressPercentage = Math.round(
    ((currentQuestionIndex + (currentAnswer.selectedIndex !== null ? 1 : 0)) /
      quiz.totalQuestions) *
      100,
  );

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;
      updated[currentQuestionIndex] = {
        selectedIndex: answerIndex,
        isCorrect,
        points: isCorrect ? currentQuestion.point : 0,
        feedback: isCorrect
          ? currentQuestion.messageForCorrectAnswer ?? 'Goed gedaan!'
          : currentQuestion.messageForIncorrectAnswer ?? 'Helaas, probeer de volgende.',
      };
      return updated;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex === quiz.totalQuestions - 1) {
      setShowSummary(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    setAnswers(
      quiz.questions.map(() => ({
        selectedIndex: null,
        isCorrect: false,
        points: 0,
        feedback: null,
      })),
    );
  };

  const totalPointsEarned = answers.reduce((sum, answer) => sum + answer.points, 0);
  const correctlyAnswered = answers.filter((answer) => answer.isCorrect).length;
  const answeredQuestions = answers.filter((answer) => answer.selectedIndex !== null).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{quiz.title}</h1>
        {quiz.synopsis && <p style={styles.synopsis}>{quiz.synopsis}</p>}
      </div>

      <div style={styles.progressWrapper}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progressPercentage}%`,
            }}
          />
        </div>
        <span style={styles.progressText}>
          Vraag {currentQuestionIndex + 1} van {quiz.totalQuestions}
        </span>
      </div>

      {!showSummary ? (
        <div style={styles.card}>
          <div>
            <h2 style={styles.question}>{currentQuestion.question}</h2>
            <ul style={styles.answerList}>
              {currentQuestion.answers.map((answer, index) => {
                const isSelected = currentAnswer.selectedIndex === index;
                const isCorrect = currentQuestion.correctAnswerIndex === index;
                const showState = currentAnswer.selectedIndex !== null;

                let background = '#f3f4f6';
                let borderColor = '#e5e7eb';
                let textColor = '#111827';

                if (isSelected) {
                  background = '#ede9fe';
                  borderColor = '#7c3aed';
                }

                if (showState) {
                  if (isCorrect) {
                    background = '#dcfce7';
                    borderColor = '#16a34a';
                  } else if (isSelected) {
                    background = '#fee2e2';
                    borderColor = '#dc2626';
                    textColor = '#7f1d1d';
                  }
                }

                return (
                  <li key={answer} style={styles.answerItem}>
                    <button
                      type="button"
                      onClick={() => handleAnswerSelect(index)}
                      disabled={currentAnswer.selectedIndex !== null}
                      style={{
                        ...styles.answerButton,
                        background,
                        borderColor,
                        color: textColor,
                      }}
                    >
                      <span>{answer}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {currentAnswer.feedback && (
            <p style={styles.feedback}>{currentAnswer.feedback}</p>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={currentAnswer.selectedIndex === null}
            style={{
              ...styles.primaryButton,
              opacity: currentAnswer.selectedIndex === null ? 0.4 : 1,
              cursor: currentAnswer.selectedIndex === null ? 'not-allowed' : 'pointer',
            }}
          >
            {currentQuestionIndex === quiz.totalQuestions - 1
              ? quiz.locale.resultPageHeaderText ?? 'Resultaat'
              : quiz.locale.nextQuestionBtn ?? 'Volgende vraag'}
          </button>

          <p style={styles.meta}>
            Beantwoord: {answeredQuestions}/{quiz.totalQuestions} • Totaal punten:{' '}
            {totalPointsEarned}/{quiz.totalPoints}
          </p>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.question}>{quiz.locale.resultPageHeaderText ?? 'Jouw score:'}</h2>
          <p style={styles.summaryLine}>
            Correcte antwoorden: {correctlyAnswered} / {quiz.totalQuestions}
          </p>
          <p style={styles.summaryLine}>
            Punten: {totalPointsEarned} / {quiz.totalPoints}
          </p>
          <button type="button" onClick={handleRestart} style={styles.primaryButton}>
            Probeer opnieuw
          </button>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: 760,
    margin: '40px auto',
    padding: '0 16px 32px',
    color: '#111827',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: '2rem',
    marginBottom: 8,
  },
  synopsis: {
    color: '#4b5563',
    margin: 0,
  },
  progressWrapper: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
    transition: 'width 0.3s ease',
  },
  progressText: {
    display: 'block',
    textAlign: 'right',
    marginTop: 6,
    fontSize: '0.875rem',
    color: '#4b5563',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 20px 50px -20px rgba(15, 23, 42, 0.25)',
    display: 'grid',
    gap: 20,
  },
  question: {
    fontSize: '1.5rem',
    margin: 0,
  },
  answerList: {
    listStyle: 'none',
    padding: 0,
    margin: '24px 0 0',
    display: 'grid',
    gap: 12,
  },
  answerItem: {
    margin: 0,
  },
  answerButton: {
    width: '100%',
    padding: '16px 20px',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  feedback: {
    margin: '4px 0 0',
    padding: '12px 16px',
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    border: '1px solid #fcd34d',
    color: '#92400e',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    padding: '12px 24px',
    borderRadius: 9999,
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    color: '#ffffff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#6b7280',
    margin: 0,
  },
  summaryLine: {
    fontSize: '1rem',
    margin: 0,
    color: '#374151',
  },
};
