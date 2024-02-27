import PropTypes from "prop-types";
import { StyleSheet, TextInput } from "react-native";

export const TextInputField = ({
  onChange,
  value,
  textInputProps,
  isValid,
}) => (
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

TextInputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  textInputProps: PropTypes.object,
};
