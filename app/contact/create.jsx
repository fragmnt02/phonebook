import { useState } from "react";
import { Stack, useNavigation } from "expo-router";

import { useContacts } from "../../hooks/useContacts";
import { ContactForm } from "../../components/ContactForm";
import { Pressable, StyleSheet, Text } from "react-native";

const ContactDetailScreen = () => {
  const [contactInfo, setContactInfo] = useState();
  const navigation = useNavigation();
  const { createContact } = useContacts();

  const saveContact = async () => {
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
      <ContactForm isCreation onContactInfoChange={setContactInfo} />
    </>
  );
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
  title: { color: "white" },
});
