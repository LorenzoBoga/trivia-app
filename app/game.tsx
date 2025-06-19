import { QuizStatus } from "@/features/quiz/types";
import { useBooleanParam } from "@/hooks/useBooleanParam";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import AnswersList from "../src/components/game/AnswersList";
import GameHeader from "../src/components/game/GameHeader";
import PauseModal from "../src/components/game/PauseModal";
import QuestionDisplay from "../src/components/game/QuestionDisplay";
import ReadyModal from "../src/components/game/ReadyModal";
import ScoreBoard from "../src/components/game/ScoreBoard";
import { Colors } from "../src/constants/Colors";
import { strings } from "../src/constants/strings";
import { useGameLogic } from "../src/hooks/useGameLogic";

export default function GameScreen() {
  const router = useRouter();
  const { questions: questionsParam } = useLocalSearchParams<{
    questions: string;
  }>();

  const questions = useMemo(
    () => JSON.parse(questionsParam || "[]"),
    [questionsParam]
  );

  const isMultiplayerMode = useBooleanParam("isMultiplayer");

  const {
    state,
    pause,
    resume,
    highScore,
    showReadyModal,
    setShowReadyModal,
    gameOver,
    handlePressOption,
    handleExit,
  } = useGameLogic(questions, isMultiplayerMode);

  const getAnswerButtonStyle = (answer: string, index: number) => {
    if (state.status !== QuizStatus.Answered) return styles.answerButton;
    if (answer === questions[state.currentQuestionIndex].correctAnswer) {
      return [styles.answerButton, styles.correctAnswer];
    }
    if (
      state.selectedAnswer !== null &&
      index === state.selectedAnswer &&
      answer !== questions[state.currentQuestionIndex].correctAnswer
    ) {
      return [styles.answerButton, styles.incorrectAnswer];
    }
    return styles.answerButton;
  };

  const player1Score = state.scores[0];
  const player2Score = state.scores[1];
  const currentQuestion = questions[state.currentQuestionIndex];

  useEffect(() => {
    if (gameOver) {
      router.replace({
        pathname: "/game-over",
        params: {
          player1Score,
          player2Score,
          highScore,
          newHighScore: player1Score > highScore ? "true" : "false",
          isMultiplayer: isMultiplayerMode ? "true" : "false",
        },
      });
    }
  }, [
    gameOver,
    player1Score,
    player2Score,
    highScore,
    isMultiplayerMode,
    router,
  ]);

  if (state.status === QuizStatus.Countdown) {
    return (
      <View style={[styles.countdownContainer]}>
        <Text style={styles.countdownText}>{state.countdown}</Text>
      </View>
    );
  }

  const onPressReady = () => {
    setShowReadyModal(false);
    resume();
  };

  const getBackgroundColor = () => {
    if (!isMultiplayerMode) {
      return Colors.game.primary;
    }
    if (state.currentPlayer === 0) {
      return Colors.game.player1;
    } else {
      return Colors.game.player2;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <GameHeader onExit={() => handleExit(router)} onPause={pause} />
      {isMultiplayerMode && (
        <Text style={styles.playerTurn}>
          {strings.playerTurn} {state.currentPlayer + 1}
        </Text>
      )}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{state.timeLeft}s</Text>
      </View>
      {!showReadyModal && (
        <>
          <QuestionDisplay question={currentQuestion?.question} />
          <AnswersList
            options={currentQuestion?.options}
            selectedAnswer={state.selectedAnswer}
            onSelect={(index) => handlePressOption(index, currentQuestion)}
            getAnswerButtonStyle={getAnswerButtonStyle}
          />
        </>
      )}
      <ScoreBoard
        isMultiplayer={isMultiplayerMode}
        player1Score={player1Score}
        player2Score={player2Score}
        currentScore={state.scores[state.currentPlayer]}
        strings={strings}
      />
      <PauseModal
        isVisible={state.status === QuizStatus.Paused}
        strings={strings}
        onResume={resume}
        onExit={() => handleExit(router)}
      />
      <ReadyModal
        isVisible={showReadyModal}
        currentPlayer={state.currentPlayer + 1}
        player1Score={player1Score}
        player2Score={player2Score}
        strings={strings}
        onReady={onPressReady}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  countdownContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.game.primary,
  },
  answerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  correctAnswer: {
    backgroundColor: "rgba(76, 175, 80, 0.8)",
  },
  incorrectAnswer: {
    backgroundColor: "rgba(244, 67, 54, 0.8)",
  },
  timerContainer: {
    position: "absolute",
    top: 150,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  timer: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  playerTurn: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  countdownText: {
    color: "white",
    fontSize: 72,
    fontWeight: "bold",
  },
});
