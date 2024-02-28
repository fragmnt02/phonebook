import { Link } from "expo-router";
import { memo } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface Props {
  firstName: string;
  lastName: string;
  id: string;
}

const ContactListItem = ({ firstName, lastName, id }: Props) => {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <Link href={`/contact/${id}`}>
        <Text style={styles.text}>{`${firstName} ${lastName}`}</Text>
      </Link>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 8,
    borderColor: "gray",
  },
  text: { fontSize: 16, color: "white" },
});

export default memo(ContactListItem);
