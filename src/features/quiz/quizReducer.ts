import { GameMode, QuizAction, QuizState, QuizStatus } from "./types";

export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case "START": {
      const { questions, timePerQ, gameMode } = action.payload;
      const playerCount = gameMode === GameMode.Multiplayer ? 2 : 1;
      return {
        questions,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        timeLeft: timePerQ,
        countdown: 3,
        scores: Array(playerCount).fill(0),
        currentPlayer: 0,
        gameMode,
        status: QuizStatus.Countdown,
      };
    }

    case "TICK_COUNTDOWN":
      return { ...state, countdown: state.countdown - 1 };

    case "COUNTDOWN_END":
      return { ...state, countdown: 0, status: QuizStatus.Running };

    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "SELECT_ANSWER":
    case "TIME_UP": {
      const current = state.questions[state.currentQuestionIndex];

      const correctIdx = current.options.findIndex(
        (a) => a === current.correctAnswer
      );

      const newScores = [...state.scores];
      const answeredIdx =
        action.type === "SELECT_ANSWER" ? action.payload : null;
      if (answeredIdx === correctIdx) {
        newScores[state.currentPlayer] += 100;
      }

      return {
        ...state,
        selectedAnswer: answeredIdx,
        scores: newScores,
        status: QuizStatus.Answered,
      };
    }
    case "PAUSE":
      return {
        ...state,
        status: QuizStatus.Paused,
      };

    case "RESUME":
      return {
        ...state,
        status: QuizStatus.Running,
      };

    case "NEXT": {
      const nextIndex = state.currentQuestionIndex + 1;
      const hasMore = nextIndex < state.questions.length;
      const nextPlayer =
        state.gameMode === GameMode.Multiplayer
          ? (state.currentPlayer + 1) % state.scores.length
          : state.currentPlayer;
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        timeLeft: action.payload.timePerQ,
        countdown: 0,
        currentPlayer: nextPlayer,
        status: hasMore ? QuizStatus.Running : QuizStatus.Finished,
      };
    }

    default:
      return state;
  }
};
