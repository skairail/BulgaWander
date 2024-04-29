import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ children, onPress, type }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  primary: {
    backgroundColor: "#007bff",
  },
  secondary: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
