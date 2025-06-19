import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { strings } from "../src/constants/strings";
import { useResetRecord } from "../src/hooks/useResetRecord";

export default function MainScreen() {
  const router = useRouter();
  const { handleResetRecord } = useResetRecord();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/triviaTitle.png")}
        style={styles.titleImage}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/single-player")}
        >
          <Text style={styles.buttonText}>{strings.singlePlayer}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/multiplayer")}
        >
          <Text style={styles.buttonText}>{strings.multiplayer}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallButton, styles.resetButton]}
          onPress={handleResetRecord}
        >
          <Text style={styles.buttonText}>{strings.resetRecord}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.smallButton, styles.creditsButton]}
        onPress={() => router.push("/credits")}
      >
        <Text style={styles.buttonText}>{strings.credits}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.game.primary,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  titleImage: {
    width: "100%",
    height: 250,
    marginTop: 40,
  },
  buttonContainer: {
    width: "80%",
    gap: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.game.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    width: "100%",
  },
  smallButton: {
    padding: 15,
    width: "60%",
    borderWidth: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#FF4444",
  },
  creditsButton: {
    backgroundColor: "#FF6B00",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
