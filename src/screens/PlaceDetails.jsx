import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from "../components/Map";
import PlacesPhotos from "../components/PlacesPhotos";

const PlaceDetails = ({ route }) => {
  const { placeId } = route.params;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:3333/locations/${placeId}`
        );
        const data = await response.json();
        setPlaceDetails(data);

        const [latitude, longitude] = data.coordinates
          .split(",")
          .map(parseFloat);
        setCoordinates({ latitude, longitude });
      } catch (error) {
        console.error("Error fetching place details: ", error);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

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
      <Map coordinates={coordinates} />

      <PlacesPhotos locationId={placeId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PlaceDetails;
