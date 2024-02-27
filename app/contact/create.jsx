import { useContext, useState } from "react";
import { Stack, useNavigation } from "expo-router";

import { ContactsContext } from "../../providers/ContactsProvider";
import { ContactForm } from "../../components/ContactForm";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

const CreateContactScreen = () => {
  const [contactInfo, setContactInfo] = useState();
  const [isFormValid, setIsFormValid] = useState(true);
  const navigation = useNavigation();
  const { createContact }  = useContext(ContactsContext);

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

export default CreateContactScreen;

const styles = StyleSheet.create({
  title: { color: "white" },
});
