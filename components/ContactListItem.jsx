import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import PropTypes from "prop-types";

export const ContactListItem = ({ firstName, lastName, id }) => {
  return (
    <Pressable style={styles.container} accessibilityRole="button">
      <Link href={`/contact/${id}`}>
        <Text style={styles.text}>{`${firstName} ${lastName}`}</Text>
      </Link>
    </Pressable>
  );
};

ContactListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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

export default React.memo(ContactListItem);
