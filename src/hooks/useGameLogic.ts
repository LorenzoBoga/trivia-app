import { GameMode, Question, QuizStatus } from "@/features/quiz/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { withTiming } from "react-native-reanimated";
import { useQuiz } from "./useQuiz";

export function useGameLogic(
  questions: Question[],
  isMultiplayerMode: boolean
) {
  const { state, start, selectAnswer, next, pause, resume } = useQuiz(30);
  const correctSound = useAudioPlayer(
    require("../../assets/sounds/correct-buzzer.wav")
  );
  const wrongSound = useAudioPlayer(
    require("../../assets/sounds/wrong-buzzer.wav")
  );
  const clockTickingSound = useAudioPlayer(
    require("../../assets/sounds/clock-ticking.wav")
  );
  const [highScore, setHighScore] = useState(0);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [playerValue, setPlayerValue] = useState(1);
  const [readyModalShownForQuestion, setReadyModalShownForQuestion] =
    useState(false);

  const gameOver = state.status === QuizStatus.Finished;

  useEffect(() => {
    start(
      questions,
      30,
      isMultiplayerMode ? GameMode.Multiplayer : GameMode.Single
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, isMultiplayerMode]);

  useEffect(() => {
    if (isMultiplayerMode) {
      setPlayerValue(withTiming(state.currentPlayer, { duration: 500 }));
    }
  }, [isMultiplayerMode, state.currentPlayer]);

  useEffect(() => {
    if (state.status === QuizStatus.Running && state.timeLeft === 5) {
      clockTickingSound.seekTo(0);
      clockTickingSound.play();
    }
  }, [state.timeLeft, state.status, clockTickingSound]);

  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const savedHighScore = await AsyncStorage.getItem("highScore");
        if (savedHighScore) {
          setHighScore(parseInt(savedHighScore, 10));
        }
      } catch (error) {
        console.error("Error loading high score:", error);
      }
    };
    loadHighScore();
  }, []);

  useEffect(() => {
    const updateHighScore = async () => {
      if (gameOver && !isMultiplayerMode && state.scores[0] > highScore) {
        try {
          await AsyncStorage.setItem("highScore", state.scores[0].toString());
          setHighScore(state.scores[0]);
        } catch (error) {
          console.error("Error saving high score:", error);
        }
      }
    };
    updateHighScore();
  }, [gameOver, highScore, isMultiplayerMode, state.scores]);

  useEffect(() => {
    if (
      isMultiplayerMode &&
      state.status === QuizStatus.Running &&
      !readyModalShownForQuestion
    ) {
      setShowReadyModal(true);
      setReadyModalShownForQuestion(true);
      pause();
    }
  }, [isMultiplayerMode, state.status, readyModalShownForQuestion, pause]);

  useEffect(() => {
    setReadyModalShownForQuestion(false);
  }, [state.currentQuestionIndex]);

  const handlePressOption = (index: number, currentQuestion: Question) => {
    if (!state.selectedAnswer) {
      const isCorrect =
        currentQuestion.options[index] === currentQuestion.correctAnswer;
      if (isCorrect) {
        correctSound.seekTo(0);
        correctSound.play();
      } else {
        wrongSound.seekTo(0);
        wrongSound.play();
      }
      selectAnswer(index);
      setTimeout(() => {
        next(30);
      }, 3000);
    }
  };

  const handleExit = (router: any) => {
    router.replace("/");
  };

  return {
    state,
    start,
    selectAnswer,
    next,
    pause,
    resume,
    correctSound,
    wrongSound,
    clockTickingSound,
    highScore,
    setHighScore,
    showReadyModal,
    setShowReadyModal,
    playerValue,
    setPlayerValue,
    gameOver,
    handlePressOption,
    handleExit,
  };
}
