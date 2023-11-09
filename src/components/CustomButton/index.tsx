import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { colors } from "../../utils/colors";

interface IButtonProps {
  title: string;
  type: "primary" | "secondary";
  handlePress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  type,
  handlePress,
  isLoading,
  disabled,
}: IButtonProps) => {
  return (
    <TouchableNativeFeedback onPress={handlePress} disabled={disabled}>
      <View
        style={{
          ...(type === "secondary"
            ? styles.secondaryContainer
            : styles.primaryContainer),
          opacity: disabled ? 0.7 : 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text
            style={
              type === "secondary" ? styles.secondaryTitle : styles.primaryTitle
            }
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
    color: "green",
    borderRadius: 8,
  },
  secondaryContainer: {
    backgroundColor: "transparent",
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 8,
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTitle: {
    color: colors.primary,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  secondaryTitle: {
    color: colors.secondary,
    textTransform: "uppercase",
  },
});

export default CustomButton;
