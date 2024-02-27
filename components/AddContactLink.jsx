import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export const AddContactLink = () => (
  <Link href={{ pathname: "contact/create" }} style={styles.title}>
    Add
  </Link>
);

const styles = StyleSheet.create({
  title: { color: "white" },
});
