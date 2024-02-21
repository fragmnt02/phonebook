import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
  const screenOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: 'white'
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: "black", color: 'white' },
  headerTitle: { color: "white" },
});
