import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo/Logo";

const Welcomepage = () => {
  const navigation = useNavigation();

  const handleStartTracking = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.logo}>
            <Logo />
          </Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    bottom: 200,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  ctaButton: {
    backgroundColor: "lightgreen",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "center",
  },
  ctaText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Welcomepage;
