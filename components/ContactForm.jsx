import { View, Text, Pressable, StyleSheet } from "react-native";
import { EditableText } from "./EditableText";
import { useEffect, useState } from "react";

const EMPTY_STATE = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  type: "Personal",
};

export const ContactForm = ({
  isEditing,
  isCreation,
  handleDelete,
  onContactInfoChange,
  initialContactInfo,
}) => {
  const [contactInfo, setContactInfo] = useState(initialContactInfo ?? EMPTY_STATE);

  const handleChange = (property) => (value) =>
    setContactInfo((c) => ({ ...c, [property]: value }));

    

  useEffect(() => {
    onContactInfoChange(contactInfo);
  }, [contactInfo]);

  return (
    <View style={styles.container}>
      <EditableText
        value={contactInfo.firstName}
        onChange={handleChange("firstName")}
        isEditing={isCreation || isEditing}
        placeholder="First Name"
        inputMode="text"
        keyboardType="default"
        autoComplete="off"
        autoCorrect={false}
        prefix="First Name: "
      />
      <EditableText
        value={contactInfo.lastName}
        onChange={handleChange("lastName")}
        isEditing={isCreation || isEditing}
        placeholder="Last Name"
        inputMode="text"
        keyboardType="default"
        autoComplete="off"
        autoCorrect={false}
        prefix="Last Name: "
      />
      <EditableText
        value={contactInfo.phone}
        onChange={handleChange("phone")}
        isEditing={isCreation || isEditing}
        placeholder="Phone Number"
        inputMode="tel"
        keyboardType="phone-pad"
        autoComplete="off"
        prefix="Tel: "
      />
      <EditableText
        value={contactInfo.email}
        onChange={handleChange("email")}
        isEditing={isCreation || isEditing}
        placeholder="Email"
        inputMode="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        prefix="Email: "
      />
      <Text style={styles.label}>Contact Type</Text>
      <EditableText
        value={contactInfo.type}
        onChange={handleChange("type")}
        isEditing={isCreation || isEditing}
        options={["Work", "Personal", "Random"]}
      />
      {isEditing && (
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteButton}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    color: "red",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },
  label: {
    color: "white",
    margin: 10,
  },
  container: { flex: 1, backgroundColor: "black", paddingTop: 15 },
});
