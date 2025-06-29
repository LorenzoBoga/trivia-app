/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: "#2f95dc",
    tabIconDefault: "#ccc",
    tabIconSelected: "#2f95dc",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabIconSelected: "#fff",
  },
  game: {
    primary: "#6A0DAD",
    player1: "#FF6B6B",
    player2: "#4ECDC4",
  },
} as const;
