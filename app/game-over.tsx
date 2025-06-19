import { ExplotionAnimation } from "@/components/game/animation/ExplosionAnimation";
import { useBooleanParam } from "@/hooks/useBooleanParam";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../src/constants/Colors";
import { strings } from "../src/constants/strings";

export default function GameOverScreen() {
  const router = useRouter();
  const {
    player1Score = 0,
    player2Score = 0,
    highScore = 0,
  } = useLocalSearchParams();

  const p1 = Number(player1Score);
  const p2 = Number(player2Score);
  const hs = Number(highScore);
  const newHighScoreSet = useBooleanParam("newHighScore");
  const multiplayerMode = useBooleanParam("isMultiplayer");

  let backgroundColor: string = Colors.game.primary;
  if (multiplayerMode) {
    if (p1 > p2) backgroundColor = Colors.game.player1;
    else if (p2 > p1) backgroundColor = Colors.game.player2;
    else backgroundColor = Colors.game?.primary;
  }

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (newHighScoreSet) {
      setShowCelebration(true);

      const interval = setInterval(() => {
        setShowCelebration(true);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [newHighScoreSet]);

  const NewHighScoreText = () => {
    return (
      <View style={styles.newHighScoreContainer}>
        <FontAwesome name="trophy" size={80} color="#FFD700" />
        <Text style={styles.newHighScoreText}>{strings.newHighScore}!</Text>
      </View>
    );
  };

  const SinglePlayerScore = () => {
    return (
      <>
        <Text style={styles.scoreText}>
          {strings.finalScore}: {p1}
        </Text>
        {newHighScoreSet ? (
          <NewHighScoreText />
        ) : (
          <Text style={styles.highScoreText}>
            {strings.highScore}: {hs}
          </Text>
        )}
      </>
    );
  };

  const MultiPlayerScore = () => {
    return (
      <>
        <Text style={styles.scoreText}>
          {strings.player1Score}: {p1}
        </Text>
        <Text style={styles.scoreText}>
          {strings.player2Score}: {p2}
        </Text>
        <Text style={styles.winnerText}>
          {p1 > p2
            ? strings.player1Wins
            : p2 > p1
            ? strings.player2Wins
            : strings.draw}
        </Text>
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ExplotionAnimation
        showConfetti={showCelebration}
        onAnimationEnd={() => {
          setShowCelebration(false);
        }}
      />

      <Text style={styles.title}>{strings.gameOver}</Text>
      {multiplayerMode ? <MultiPlayerScore /> : <SinglePlayerScore />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>{strings.playAgain}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoreText: {
    color: "white",
    fontSize: 20,
  },
  winnerText: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.game.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  highScoreText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  newHighScoreContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  newHighScoreText: {
    color: "#4CAF50",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
});
