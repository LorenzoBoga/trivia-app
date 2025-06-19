import { StyleSheet, View } from "react-native";
import { ConfettiPiece } from "./ConfettiPiece";

export const ExplotionAnimation = ({
  showConfetti,
  onAnimationEnd,
}: {
  showConfetti: boolean;
  onAnimationEnd: (i: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {showConfetti &&
        Array.from({ length: 100 }, (_, index) => (
          <ConfettiPiece
            key={index}
            index={index}
            onAnimationEnd={() => onAnimationEnd(index)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confettiPiece: {
    position: "absolute",
    width: 5,
    height: 10,
    borderRadius: 5,
  },
});
