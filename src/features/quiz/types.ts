export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum QuizStatus {
  Idle = "idle",
  Countdown = "countdown",
  Running = "running",
  Answered = "answered",
  Finished = "finished",
  Loading = "loading",
  Paused = "paused",
}

export enum GameMode {
  Single = "single",
  Multiplayer = "multiplayer",
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timeLeft: number;
  countdown: number;
  status: QuizStatus;
  gameMode: GameMode;
  currentPlayer: number;
  scores: number[];
}

export type QuizAction =
  | {
      type: "START";
      payload: { questions: Question[]; timePerQ: number; gameMode: GameMode };
    }
  | { type: "TICK" }
  | { type: "TICK_COUNTDOWN" }
  | { type: "COUNTDOWN_END" }
  | { type: "SELECT_ANSWER"; payload: number }
  | { type: "TIME_UP" }
  | { type: "NEXT"; payload: { timePerQ: number } }
  | { type: "PAUSE" }
  | { type: "RESUME" };
