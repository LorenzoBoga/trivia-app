import { useCallback, useEffect, useReducer } from "react";
import { quizReducer } from "../features/quiz/quizReducer";
import { GameMode, QuizStatus } from "../features/quiz/types";

export const useQuiz = (timePerQuestion: number) => {
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    timeLeft: timePerQuestion,
    countdown: 0,
    status: QuizStatus.Idle,
    gameMode: GameMode.Single,
    currentPlayer: 0,
    scores: [0],
  });

  const start = useCallback(
    (questions: any[], timePerQ: number, gameMode: GameMode) => {
      dispatch({
        type: "START",
        payload: { questions, timePerQ, gameMode },
      });
    },
    []
  );

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (state.status === QuizStatus.Running) {
        dispatch({ type: "SELECT_ANSWER", payload: answerIndex });
      }
    },
    [state.status]
  );

  const next = useCallback((timePerQ: number) => {
    dispatch({ type: "NEXT", payload: { timePerQ } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: "RESUME" });
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (state.status === QuizStatus.Countdown && state.countdown > 0) {
      interval = setInterval(() => {
        dispatch({ type: "TICK_COUNTDOWN" });
      }, 1000);
    } else if (state.status === QuizStatus.Running && state.timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.status, state.countdown, state.timeLeft]);

  useEffect(() => {
    if (state.status === QuizStatus.Countdown && state.countdown === 0) {
      dispatch({ type: "COUNTDOWN_END" });
    }
  }, [state.status, state.countdown]);

  useEffect(() => {
    if (state.status === QuizStatus.Running && state.timeLeft === 0) {
      dispatch({ type: "TIME_UP" });
      setTimeout(() => {
        next(timePerQuestion);
      }, 3000);
    }
  }, [state.status, state.timeLeft]);

  return {
    state,
    start,
    selectAnswer,
    next,
    pause,
    resume,
  };
};
