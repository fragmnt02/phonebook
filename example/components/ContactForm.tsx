import { memo, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { EditableText } from "./EditableText";
import { Contact, DraftContact } from "../types";

interface Props {
  isEditing?: boolean;
  isCreation?: boolean;
  handleDelete?: () => void;
  onContactInfoChange: (value: DraftContact | Contact) => void;
  initialContactInfo?: DraftContact | null;
  setIsFormValid: (value: boolean) => void;
}

const EMPTY_STATE: DraftContact = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  type: "Personal",
};

const ContactForm = ({
  isEditing,
  isCreation,
  handleDelete,
  onContactInfoChange,
  initialContactInfo,
  setIsFormValid,
}: Props) => {
  const [contactInfo, setContactInfo] = useState<DraftContact | Contact>(
    initialContactInfo ?? EMPTY_STATE,
  );
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (property: keyof Contact) => (value: string) => {
    if (property === "email") {
      setIsEmailValid(validateEmail(value));
    }

    if (property === "phone") {
      setIsPhoneValid(validatePhone(value));
    }
    setContactInfo((c) => ({ ...c, [property]: value }));
  };

  useEffect(() => {
    onContactInfoChange(contactInfo);
    setIsFormValid(isEmailValid && isPhoneValid);
  }, [contactInfo]);

  const isEditView: boolean = Boolean(isCreation ?? isEditing);

  return (
    <View style={styles.container}>
      <EditableText
        value={contactInfo.firstName}
        onChange={handleChange("firstName")}
        isEditing={isEditView}
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
        isEditing={isEditView}
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
        isEditing={isEditView}
        placeholder="Phone Number"
        inputMode="tel"
        keyboardType="phone-pad"
        autoComplete="off"
        prefix="Tel: "
        isValid={isPhoneValid}
      />
      <EditableText
        value={contactInfo.email}
        onChange={handleChange("email")}
        isEditing={isEditView}
        placeholder="Email"
        inputMode="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        prefix="Email: "
        isValid={isEmailValid}
      />
      <Text style={styles.label}>Contact Type</Text>
      <EditableText
        value={contactInfo.type}
        onChange={handleChange("type")}
        isEditing={isEditView}
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

export default memo(ContactForm);
