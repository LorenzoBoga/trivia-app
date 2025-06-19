import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PauseModalProps {
  isVisible: boolean;
  strings: {
    gamePaused: string;
    resume: string;
    exit: string;
  };
  onResume: () => void;
  onExit: () => void;
}

const PauseModal: React.FC<PauseModalProps> = ({
  isVisible,
  strings,
  onResume,
  onExit,
}) => {
  if (!isVisible) return null;
  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <Text style={styles.title}>{strings.gamePaused}</Text>
        <TouchableOpacity style={styles.button} onPress={onResume}>
          <Text style={styles.buttonText}>{strings.resume}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onExit}>
          <Text style={styles.buttonText}>{strings.exit}</Text>
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
    color: Colors.game.primary,
  },
  button: {
    backgroundColor: Colors.game.primary,
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

export default PauseModal;
