import React from "react";
import { StyleSheet, Text } from "react-native";

interface QuestionDisplayProps {
  question: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => (
  <Text style={styles.question}>{question}</Text>
);

const styles = StyleSheet.create({
  question: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 200,
  },
});

export default QuestionDisplay;
