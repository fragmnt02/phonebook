import { Stack, useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

import ContactForm from "../../components/ContactForm";
import { ContactsContext } from "../../providers/ContactsProvider";
import { Contact, DraftContact } from "../../types";

const CreateContactScreen = () => {
  const [contactInfo, setContactInfo] = useState<Contact | DraftContact | null>(
    null,
  );
  const [isFormValid, setIsFormValid] = useState(true);
  const navigation = useNavigation();
  const { createContact } = useContext(ContactsContext);

  const saveContact = async () => {
    if (
      !isFormValid ||
      !contactInfo?.firstName ||
      !contactInfo?.lastName ||
      !contactInfo?.phone ||
      !contactInfo?.email
    ) {
      Alert.alert(
        "Need to add all data",
        "Should fill all name inputs and a valid email or phone number",
      );
      return;
    }
    await createContact(contactInfo);
    navigation.goBack();
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

export default CreateContactScreen;

const styles = StyleSheet.create({
  title: { color: "white" },
});
