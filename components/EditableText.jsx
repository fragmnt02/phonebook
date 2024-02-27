import PropTypes from "prop-types";
import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

import { PickerField } from "./PickerField";
import { TextInputField } from "./TextInputField";

export const EditableText = ({
  isEditing,
  value,
  onChange,
  autoComplete,
  inputMode,
  keyboardType,
  placeholder,
  autoCapitalize,
  autoCorrect,
  prefix = "",
  options = [],
  isValid = true,
}) => {
  const textInputProps = {
    autoComplete,
    inputMode,
    keyboardType,
    placeholder,
    autoCapitalize,
    autoCorrect,
  };

  return (
    <View>
      {isEditing ? (
        options.length ? (
          <PickerField options={options} onChange={onChange} value={value} />
        ) : (
          <TextInputField
            onChange={onChange}
            value={value}
            textInputProps={textInputProps}
            isValid={isValid}
          />
        )
      ) : (
        <Text style={styles.text}>{`${prefix}${value}`}</Text>
      )}
    </View>
  );
};

EditableText.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  inputMode: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  prefix: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  isValid: PropTypes.bool,
};

EditableText.defaultProps = {
  value: "",
  autoComplete: undefined,
  inputMode: undefined,
  keyboardType: undefined,
  placeholder: undefined,
  autoCapitalize: undefined,
  autoCorrect: false,
  prefix: "",
  options: [],
  isValid: true,
};

const styles = StyleSheet.create({
  text: {
    height: 40,
    borderTopWidth: 1,
    padding: 10,
    borderColor: "#444444",
    color: "white",
  },
});

export default memo(EditableText);
