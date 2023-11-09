import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const CustomInput = ({ ...props }) => {
  return <TextInput {...props} style={styles.textInput} />;
};

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingLeft: 16,
  },
});

export default CustomInput;
