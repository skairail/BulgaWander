import React from "react";
import { View, StyleSheet } from "react-native";

import Categories from "../components/Categories";
import SavedPlaces from "../components/SavedPlaces";
import LocationSearch from "../components/LocationsSearch";

function Homepage() {
  return (
    <View style={styles.container}>
      <LocationSearch />
      <Categories />
      <SavedPlaces />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Homepage;
