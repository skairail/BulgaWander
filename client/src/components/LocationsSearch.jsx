import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost3333/locations");
      const data = await response.json();

      const filteredLocations = data.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const placeIds = filteredLocations.map((location) => location.id);
      navigation.navigate("SearchResults", { placeIds });
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Where do you want to go today?</Text>
      <Searchbar
        placeholder="Search locations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onIconPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  bigText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default LocationSearch;
