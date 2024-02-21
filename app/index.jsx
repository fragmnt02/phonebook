import { useState, useCallback, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, RefreshControl } from "react-native";
import { Link, Stack, useFocusEffect } from "expo-router";

import { ContactListItem } from "../components/ContactListItem";
import { useContacts } from "../hooks/useContacts";

const AddContactLink = () => (
  <Link href={{ pathname: "contact/create" }} style={styles.title}>
    Add
  </Link>
);

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { getContacts } = useContacts();

  useEffect(() => {
    const interval = setInterval(
      () => getContacts().then((c) => setContacts(c)),
      1_000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerRight: AddContactLink }} />
      <View style={styles.container}>
        <FlatList
          data={contacts}
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
  title: { color: "white" },
});
