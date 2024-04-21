import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = ({ route }) => {
  const { sightseeingId } = route.params;
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:3333/locations/${sightseeingId}`
        );
        const data = await response.json();
        setPlaceDetails(data);
      } catch (error) {
        console.error("Error fetching place details: ", error);
      }
    };

    fetchPlaceDetails();
  }, [sightseeingId]);

  if (!placeDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{placeDetails.name}</Text>
      <Text>{placeDetails.description}</Text>
      <Text>Coordinates: {placeDetails.coordinates}</Text>
      {/* Другие данные о месте */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PlaceDetailsScreen;
