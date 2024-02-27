import { Link } from "expo-router";
import { memo } from "react";
import { StyleSheet } from "react-native";

const AddContactLink = () => (
  <Link href={{ pathname: "contact/create" }} style={styles.title}>
    Add
  </Link>
);

const styles = StyleSheet.create({
  title: { color: "white" },
});

export default memo(AddContactLink);
