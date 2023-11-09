import { Platform } from "react-native";
import Toast from "react-native-root-toast";
import { colors } from "./colors";

const colorsMessages = {
  danger: colors.danger,
  warning: colors.warning,
  success: colors.success,
};

export default class Message {
  public static showError(message: string): void {
    Message.show(message, "danger");
  }

  public static showWarning(message: string): void {
    Message.show(message, "warning");
  }

  public static showSuccess(message: string): void {
    Message.show(message, "success");
  }

  private static show(
    message: string,
    type: "danger" | "success" | "warning"
  ): void {
    Toast.show(message, {
      shadow: false,
      animation: true,
      hideOnPress: true,
      duration: Toast.durations.LONG,
      opacity: 1,
      position: Toast.positions.TOP + (Platform.OS === "ios" ? 20 : 40),
      textColor: colors.white,
      textStyle: {
        fontSize: 18,
        textAlign: "center",
      },
      backgroundColor: colorsMessages[type],
    });
  }
}
