import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PageNav from "../components/PageNav/PageNav";

const Welcomepage = () => {
  const navigation = useNavigation();

  const handleStartTracking = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <PageNav />
      <View style={styles.content}>
        <Text style={styles.title}>
          Let's discover together the beauty of Bulgaria!
        </Text>
        <Text style={styles.description}>
          This application will help you learn about the most beautiful and
          interesting places in Bulgaria!
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleStartTracking}
        >
          <Text style={styles.ctaText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  ctaText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Welcomepage;
