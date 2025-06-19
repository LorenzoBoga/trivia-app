import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameInstructionsModal from "../src/components/GameInstructionsModal";
import { strings } from "../src/constants/strings";
import { useQuestions } from "../src/hooks/useQuestions";

export default function MultiplayerScreen() {
  const router = useRouter();
  const [showRules, setShowRules] = useState(true);
  const { data: questions, isLoading, error } = useQuestions();

  const multiplayerRules = [
    strings.multiplayerRulesContent.options,
    strings.multiplayerRulesContent.timeLimit,
    strings.multiplayerRulesContent.turns,
    strings.multiplayerRulesContent.winning,
  ];

  const startGame = () => {
    if (!questions) return;

    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    router.push({
      pathname: "/game",
      params: {
        questions: JSON.stringify(selectedQuestions),
        isMultiplayer: "true",
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{strings.back}</Text>
      </TouchableOpacity>

      <GameInstructionsModal
        visible={showRules}
        onClose={() => setShowRules(false)}
        title={strings.multiplayerRulesTitle}
        rules={multiplayerRules}
      />

      <Text style={styles.text}>{strings.multiplayer}</Text>
      {isLoading && <Text style={styles.text}>{strings.loadingQuestions}</Text>}
      {error && (
        <Text style={styles.errorText}>{strings.errorLoadingQuestions}</Text>
      )}
      {questions && (
        <>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>{strings.startGame}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.game.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: Colors.game.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
});
