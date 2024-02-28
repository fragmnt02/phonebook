import { Stack } from "expo-router";
import { useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import AddContactLink from "../components/AddContactLink";
import ContactListItem from "../components/ContactListItem";
import { ContactsContext } from "../providers/ContactsProvider";
import { Contact } from "../types";

const ContactList = () => {
  const { contacts } = useContext(ContactsContext);

  return (
    <>
      <Stack.Screen options={{ headerRight: () => <AddContactLink /> }} />
      <View style={styles.container}>
        <FlatList
          data={(contacts ?? []).sort((a: Contact, b: Contact) =>
            a.firstName.localeCompare(b.firstName),
          )}
          renderItem={({ item }) => <ContactListItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No contacts found</Text>}
        />
      </View>
    </>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
});
