import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        &copy; Copyright {new Date().getFullYear()} by BulgaWander Inc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});
