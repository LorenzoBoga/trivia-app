import { Colors } from "@/constants/Colors";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { strings } from "../constants/strings";

interface GameInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  rules: string[];
}

export default function GameInstructionsModal({
  visible,
  onClose,
  title,
  rules,
}: GameInstructionsModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.rulesContainer}>
            {rules.map((rule, index) => (
              <Text key={index} style={styles.ruleText}>
                • {rule}
              </Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.startButton} onPress={onClose}>
            <Text style={styles.startButtonText}>{strings.startGame}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.game.primary,
    marginBottom: 20,
  },
  rulesContainer: {
    width: "100%",
  },
  ruleText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: Colors.game.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
