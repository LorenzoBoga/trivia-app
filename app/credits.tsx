import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../src/constants/Colors";
import { strings } from "../src/constants/strings";

export default function CreditsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{strings.back}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{strings.creditsTitle}</Text>
      <Text style={styles.text}>{strings.creditsCreator}</Text>
      <Text style={styles.text}>{strings.creditsDesigner}</Text>
      <Text style={styles.text}>{strings.creditsArtist}</Text>
      <Text style={styles.text}>{strings.soundEffects}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.game.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },
});
