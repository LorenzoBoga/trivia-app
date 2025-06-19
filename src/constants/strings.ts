export const strings = {
  // Navigation
  back: "←",

  // Game Modes
  singlePlayer: "Classic mode",
  multiplayer: "Battle Mode",
  credits: "Credits",
  resetRecord: "Reset Record",

  // Credits Screen
  creditsTitle: "Credits",
  creditsCreator: "Developed by Lorenzo Boga",
  creditsDesigner: "Designed by Lorenzo Boga",
  creditsArtist: "Art by ChatGPT",
  soundEffects: "Sound Effects from mixkit.co",

  // Modal
  startGame: "Start Game",
  gameRules: "Game Rules",
  multiplayerRulesTitle: "Multiplayer Rules",

  // Game States
  loadingQuestions: "Loading questions...",
  errorLoadingQuestions: "Error loading questions",
  questionsLoaded: "Questions loaded: ",

  // Game Screen
  gameOver: "Game Over",
  playerTurn: "Player",
  currentScore: "Current Score",
  finalScore: "Final Score",
  player1Score: "Player 1 Score",
  player2Score: "Player 2 Score",
  player1Wins: "Player 1 Wins!",
  player2Wins: "Player 2 Wins!",
  draw: "It's a Draw!",
  playAgain: "Play Again",
  gamePaused: "Game Paused",
  resume: "Resume",
  exit: "Exit Game",
  highScore: "High Score",
  newHighScore: "New High Score!",
  readyPlayer: "Ready Player",
  ready: "Ready!",

  // Reset Record Alerts
  resetRecordTitle: "Reset Record",
  resetRecordMessage:
    "Are you sure you want to reset your high score? This action cannot be undone.",
  resetRecordCancel: "Cancel",
  resetRecordConfirm: "Reset",
  resetRecordSuccess: "High score has been reset!",
  resetRecordError: "Failed to reset high score. Please try again.",

  // Single Player Rules
  singlePlayerRules: {
    options: "Every Question has 4 options and only 1 correct answer",
    timeLimit: "You have 30 seconds per question",
    scoring: "You get 100 points per correct question",
  },

  // Multiplayer Rules
  multiplayerRulesContent: {
    options: "Every Question has 4 options and only 1 correct answer",
    timeLimit: "You have 30 seconds per question",
    turns: "Players take turns to answer questions",
    winning: "The player who answers the most questions correctly wins",
  },
} as const;
