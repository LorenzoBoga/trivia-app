import { useLocalSearchParams } from "expo-router";

export function useBooleanParam(param: string | undefined) {
  if (!param) return false;
  const { [param]: value } = useLocalSearchParams();
  return value === "true";
}
