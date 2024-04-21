import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Logo = ({ navigation }) => {
  const handleNavigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableOpacity onPress={handleNavigateHome} style={styles.container}>
      <Image source={require("../../public/icon.png")} style={styles.logo} />
      <Text style={styles.logoText}>BulgaWander</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Logo;
