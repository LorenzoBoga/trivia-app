import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GameInstructionsModal from "../src/components/GameInstructionsModal";
import { strings } from "../src/constants/strings";
import { useQuestions } from "../src/hooks/useQuestions";

export default function SinglePlayerScreen() {
  const router = useRouter();
  const [showRules, setShowRules] = useState(true);
  const { data: questions, isLoading, error } = useQuestions();

  const singlePlayerRules = [
    strings.singlePlayerRules.options,
    strings.singlePlayerRules.timeLimit,
    strings.singlePlayerRules.scoring,
  ];

  useEffect(() => {
    if (questions && !isLoading && !showRules) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 5);

      router.push({
        pathname: "/game",
        params: {
          questions: JSON.stringify(selectedQuestions),
          isMultiplayer: "false",
        },
      });
    }
  }, [questions, isLoading, showRules]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{strings.back}</Text>
      </TouchableOpacity>

      <GameInstructionsModal
        visible={showRules}
        onClose={() => setShowRules(false)}
        title={strings.gameRules}
        rules={singlePlayerRules}
      />

      <Text style={styles.text}>{strings.singlePlayer}</Text>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>{strings.loadingQuestions}</Text>
        </View>
      )}
      {error && (
        <Text style={styles.errorText}>{strings.errorLoadingQuestions}</Text>
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
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
