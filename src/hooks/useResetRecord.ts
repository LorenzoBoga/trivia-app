import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { strings } from "../constants/strings";

export const useResetRecord = () => {
  const handleResetRecord = async () => {
    Alert.alert(strings.resetRecordTitle, strings.resetRecordMessage, [
      {
        text: strings.resetRecordCancel,
        style: "cancel",
      },
      {
        text: strings.resetRecordConfirm,
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("highScore");
            Alert.alert("Success", strings.resetRecordSuccess);
          } catch (error) {
            console.error("Error resetting high score:", error);
            Alert.alert("Error", strings.resetRecordError);
          }
        },
      },
    ]);
  };

  return { handleResetRecord };
};
