import React from "react";
import { View, StyleSheet } from "react-native";
import PlacesList from "../components/PlacesList";
import { useRoute } from "@react-navigation/native";

function Category() {
  const route = useRoute();
  const { categoryId } = route.params;
  return (
    <View style={styles.container}>
      <PlacesList categoryId={categoryId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Category;
