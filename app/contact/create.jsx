import { useState } from "react";
import { Stack, useNavigation } from "expo-router";

import { useContacts } from "../../hooks/useContacts";
import { ContactForm } from "../../components/ContactForm";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

const ContactDetailScreen = () => {
  const [contactInfo, setContactInfo] = useState();
  const [isFormValid, setIsFormValid] = useState(true);
  const navigation = useNavigation();
  const { createContact } = useContacts();

  const saveContact = async () => {
    if (
      !isFormValid ||
      !contactInfo.firstName ||
      !contactInfo.lastName ||
      !contactInfo.phone ||
      !contactInfo.email
    ) {
      Alert.alert(
        "Need to add all data",
        "Should fill all name inputs and a valid email or phone number"
      );
      return;
    }
    await createContact(contactInfo);
    navigation.goBack();
    return;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={saveContact}>
              <Text style={styles.title}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <ContactForm
        isCreation
        onContactInfoChange={setContactInfo}
        setIsFormValid={setIsFormValid}
      />
    </>
  );
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
  title: { color: "white" },
});
