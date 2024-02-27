import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ContactsProvider } from "../providers/ContactsProvider";

export default function Layout() {
  const screenOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: "white",
  };

  return (
    <ContactsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...screenOptions,
            title: "Contact List",
          }}
        />
        <Stack.Screen
          name="contact/create"
          options={{
            ...screenOptions,
            title: "Add New Contact",
          }}
        />
        <Stack.Screen
          name="contact/[id]"
          options={{
            ...screenOptions,
            title: "Contact",
          }}
        />
      </Stack>
    </ContactsProvider>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: "black", color: "white" },
  headerTitle: { color: "white" },
});
