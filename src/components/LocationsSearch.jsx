import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await fetch("http://192.168.1.2:3333/locations");
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
    // flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default LocationSearch;
