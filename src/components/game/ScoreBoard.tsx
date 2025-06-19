import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScoreBoardProps {
  isMultiplayer: boolean;
  player1Score: number;
  player2Score: number;
  currentScore: number;
  strings: {
    currentScore: string;
    player1Score: string;
    player2Score: string;
  };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  isMultiplayer,
  player1Score,
  player2Score,
  currentScore,
  strings,
}) => (
  <View style={styles.scoreContainer}>
    {isMultiplayer ? (
      <>
        <Text style={styles.scoreText}>
          {strings.player1Score}: {player1Score}
        </Text>
        <Text style={styles.scoreText}>
          {strings.player2Score}: {player2Score}
        </Text>
      </>
    ) : (
      <Text style={styles.scoreText}>
        {strings.currentScore}: {currentScore}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  scoreContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
    gap: 8,
  },
  scoreText: {
    color: "white",
    fontSize: 20,
  },
});

export default ScoreBoard;
