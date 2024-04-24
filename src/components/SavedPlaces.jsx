import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const SavedPlaces = () => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [twoColumns, setTwoColumns] = useState(false);

  const fetchSavedPlaces = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        "http://192.168.1.2:3333/user/saved-places",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      setSavedPlaces(data);
    } catch (error) {
      console.error("Error fetching saved places:", error);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  useEffect(() => {
    if (savedPlaces.length > 4) {
      setTwoColumns(true);
    } else {
      setTwoColumns(false);
    }
  }, [savedPlaces]);

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedPlaces();
    }, [])
  );

  const renderBlock = ({ item }) => (
    <View style={styles.block}>
      <Text style={styles.blockText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Places</Text>
      {savedPlaces.length === 0 ? (
        <Text>No saved places</Text>
      ) : twoColumns ? (
        <FlatList
          data={savedPlaces}
          renderItem={renderBlock}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={savedPlaces}
          renderItem={renderBlock}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  block: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#f9c2ff",
    padding: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  blockText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default SavedPlaces;
