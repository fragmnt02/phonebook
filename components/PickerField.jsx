import { Picker } from "@react-native-picker/picker";
import PropTypes from "prop-types";
import { Platform, StyleSheet } from "react-native";

export const PickerField = ({ options, onChange, value }) => (
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

PickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
