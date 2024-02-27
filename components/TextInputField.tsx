import { memo } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputProps {
  autoComplete?: TextInputProps["autoComplete"];
  inputMode?: TextInputProps["inputMode"];
  keyboardType?: TextInputProps["keyboardType"];
  placeholder?: string;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: TextInputProps["autoCorrect"];
}

interface Props {
  onChange: (value: string) => void;
  value: string;
  isValid: boolean;
  textInputProps: InputProps;
}

const TextInputField = ({
  onChange,
  value,
  textInputProps,
  isValid,
}: Props) => (
  <TextInput
    style={isValid ? styles.input : styles.invalidInput}
    onChangeText={onChange}
    value={value}
    placeholderTextColor="#8A8A8A"
    {...textInputProps}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: "#272729",
    borderColor: "#444444",
    color: "white",
    width: "100%",
  },
  invalidInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#272729",
    color: "white",
    width: "100%",
    borderColor: "red",
  },
});

export default memo(TextInputField);
