import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SpotDetails = ({ spot, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{spot.name}</Text>
        <Text>
          {/* Основные данные о достопримечательности */}
          GOIDA
        </Text>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  content: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "blue",
    fontSize: 14,
  },
});

export default SpotDetails;
