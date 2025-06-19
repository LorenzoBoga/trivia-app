import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AnswersListProps {
  options: string[];
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  getAnswerButtonStyle: (answer: string, index: number) => any;
}

const AnswersList: React.FC<AnswersListProps> = ({
  options,
  selectedAnswer,
  onSelect,
  getAnswerButtonStyle,
}) => (
  <View style={styles.answersContainer}>
    {options &&
      options.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={getAnswerButtonStyle(answer, index)}
          onPress={() => onSelect(index)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
  </View>
);

const styles = StyleSheet.create({
  answersContainer: {
    width: "100%",
    gap: 15,
  },
  answerText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AnswersList;
