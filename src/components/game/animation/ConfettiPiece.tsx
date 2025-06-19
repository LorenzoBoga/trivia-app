import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const confettiColors = [
  "#D4AF37",
  "#C0C0C0",
  "#CD7F32",
  "#FFD700",
  "#E5E4E2",
  "#8C7853",
  "#DAA520",
  "#B87333",
];

export const ConfettiPiece = ({
  index,
  onAnimationEnd,
}: {
  index: number;
  onAnimationEnd: (i: number) => void;
}) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];

  useEffect(() => {
    translateY.value = withTiming(
      Math.random() * 300 * (Math.random() < 0.5 ? -1 : 1),
      {
        duration: 2000,
        easing: Easing.out(Easing.quad),
      }
    );
    translateX.value = withTiming(Math.random() * 300 - 150, {
      duration: 2000,
      easing: Easing.out(Easing.quad),
    });
    opacity.value = withTiming(
      0,
      {
        duration: 2000,
        easing: Easing.linear,
      },
      (isFinished) => {
        if (isFinished) runOnJS(onAnimationEnd)(index);
      }
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          transform: [{ translateY }, { translateX }],
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  confettiPiece: {
    width: 8,
    height: 8,
  },
});
