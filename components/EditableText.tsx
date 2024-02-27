import { memo } from "react";
import { View, Text, StyleSheet, TextInputProps } from "react-native";

import PickerField from "./PickerField";
import TextInputField from "./TextInputField";

interface Props {
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: TextInputProps["autoComplete"];
  inputMode?: TextInputProps["inputMode"];
  keyboardType?: TextInputProps["keyboardType"];
  placeholder?: string;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: TextInputProps["autoCorrect"];
  prefix?: string;
  options?: string[];
  isValid?: boolean;
}

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
}: Props) => {
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
