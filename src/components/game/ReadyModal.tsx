import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ReadyModalProps {
  isVisible: boolean;
  currentPlayer: number;
  player1Score: number;
  player2Score: number;
  strings: {
    readyPlayer: string;
    player1Score: string;
    player2Score: string;
    ready: string;
  };
  onReady: () => void;
}

const ReadyModal: React.FC<ReadyModalProps> = ({
  isVisible,
  currentPlayer,
  player1Score,
  player2Score,
  strings,
  onReady,
}) => {
  if (!isVisible) return null;

  const playerColor =
    currentPlayer === 1 ? Colors.game.player1 : Colors.game.player2;

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: playerColor }]}>
          {strings.readyPlayer} {currentPlayer}?
        </Text>
        <View style={styles.scoresContainer}>
          <Text style={[styles.scoreText, { color: playerColor }]}>
            {strings.player1Score}: {player1Score}
          </Text>
          <Text style={[styles.scoreText, { color: playerColor }]}>
            {strings.player2Score}: {player2Score}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: playerColor }]}
          onPress={onReady}
        >
          <Text style={styles.buttonText}>{strings.ready}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoresContainer: {
    width: "100%",
    marginBottom: 20,
    gap: 10,
  },
  scoreText: {
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReadyModal;
