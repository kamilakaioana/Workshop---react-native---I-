import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

interface ITextAreaProps {
  content: string;
  onChange: (content: string) => void;
  placeholder: string;
  maxLength?: number;
  numberOfLines?: number;
}

const TextArea: React.FC<ITextAreaProps> = ({
  content,
  onChange,
  placeholder,
  maxLength,
  numberOfLines,
}) => {
  return (
    <View>
      <TextInput
        value={content}
        onChangeText={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        multiline
        numberOfLines={numberOfLines}
        style={styles.input}
      />

      <Text style={{ fontSize: 12, textAlign: "right" }}>
        {`${content.length}/280`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 109,
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    padding: 16,
  },
});
export default TextArea;
