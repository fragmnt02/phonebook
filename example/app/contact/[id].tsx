import { useLocalSearchParams, Stack, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";

import ContactForm from "../../components/ContactForm";
import { ContactsContext } from "../../providers/ContactsProvider";
import { Contact, DraftContact } from "../../types";

const ContactDetailScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const id = `${params.id}`;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [contactInfo, setContactInfo] = useState<Contact | DraftContact | null>(
    null,
  );
  const { getContact, updateContact, deleteContact } =
    useContext(ContactsContext);

  useEffect(() => {
    const loadContact = async () => {
      if (!id) {
        Alert.alert("Cant look for contact", "No contact id provided");
        return;
      }
      const contact = await getContact(id);
      if (!contact) {
        return;
      }
      setContactInfo(contact);
      setIsLoading(false);
    };

    loadContact();
  }, []);

  const handleEditBtnPress = async () => {
    if (!isEditing) {
      // show edit form
      setIsEditing(true);
      return;
    }

    // save updated contact
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
    await updateContact(id, contactInfo as Contact);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteContact(id);
    navigation.goBack();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: contactInfo?.firstName
            ? `${contactInfo.firstName} ${contactInfo.lastName}`
            : "Contact",
          headerRight: () => (
            <Pressable onPress={handleEditBtnPress}>
              <Text style={styles.title}>{isEditing ? "Save" : "Edit"}</Text>
            </Pressable>
          ),
        }}
      />
      {!isLoading && (
        <ContactForm
          isEditing={isEditing}
          handleDelete={handleDelete}
          initialContactInfo={contactInfo}
          onContactInfoChange={setContactInfo}
          setIsFormValid={setIsFormValid}
        />
      )}
    </>
  );
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
  title: { color: "white" },
});
