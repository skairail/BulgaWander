import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../Logo/Logo";
import { useNavigation } from "@react-navigation/native";

const PageNav = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.nav}>
      <Logo />

      <View style={styles.links}>
        <TouchableOpacity
          style={[styles.link, styles.ctaLink]}
          onPress={handleLogin}
        >
          <Text style={styles.ctaText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    padding: 10,
  },
  ctaLink: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  ctaText: {
    color: "#ffffff",
  },
});

export default PageNav;
