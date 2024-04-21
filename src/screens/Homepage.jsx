import React from "react";
import { View, StyleSheet } from "react-native";

import Categories from "../components/Categories";

function Homepage() {
  return (
    <View style={styles.container}>
      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Homepage;
