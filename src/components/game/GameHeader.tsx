import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameHeaderProps {
  onExit: () => void;
  onPause: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onExit, onPause }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerButton} onPress={onExit}>
      <Text style={styles.headerButtonText}>✕</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerButton} onPress={onPause}>
      <Text style={styles.headerButtonText}>⏸</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default GameHeader;
