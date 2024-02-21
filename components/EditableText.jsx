import { Picker } from "@react-native-picker/picker";
import PropTypes from "prop-types";
import React from "react";
import { TextInput, View, Text, StyleSheet, Platform } from "react-native";

const TextInputField = ({ onChange, value, textInputProps, isValid }) => (
  <TextInput
    style={isValid ? styles.input : styles.invalidInput}
    onChangeText={onChange}
    value={value}
    placeholderTextColor="#8A8A8A"
    {...textInputProps}
  />
);

const PickerField = ({ options, onChange, value }) => (
  <Picker
    selectedValue={value}
    onValueChange={onChange}
    style={Platform.OS === "ios" ? styles.iosPicker : styles.input}
    itemStyle={styles.iosPickerItem}
    dropdownIconColor="white"
  >
    {options.map((item) => (
      <Picker.Item key={`select-${item}`} label={item} value={item} />
    ))}
  </Picker>
);

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
};

const styles = StyleSheet.create({
  text: {
    height: 40,
    borderTopWidth: 1,
    padding: 10,
    borderColor: "#444444",
    color: "white",
  },
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
    borderColor: "#444444",
    color: "white",
    width: "100%",
    borderColor: "red",
  },
  iosPicker: {
    height: 130,
    width: "100%",
    color: "white",
  },
  iosPickerItem: {
    height: "100%",
    width: "100%",
    color: "white",
  },
});

export default React.memo(EditableText);
