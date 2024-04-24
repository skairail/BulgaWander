import React from "react";
import { View, StyleSheet } from "react-native";
import PlacesList from "../components/PlacesList";
import { useRoute } from "@react-navigation/native";

function SearchResults() {
  const route = useRoute();
  const { placeIds } = route.params;
  return (
    <View style={styles.container}>
      <PlacesList placeIds={placeIds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default SearchResults;
