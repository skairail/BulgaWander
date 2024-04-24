import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

import Map from "../components/Map";
import PlacesPhotos from "../components/PlacesPhotos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addPlaceToSavedPlaces from "./addPlaceToSavedPlaces";

const PlaceDetails = ({ route }) => {
  const { placeId } = route.params;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const [isSaved, setIsSaved] = useState(true);

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

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedPlaces = await AsyncStorage.getItem("savedPlaces");
        if (savedPlaces) {
          const parsedSavedPlaces = JSON.parse(savedPlaces);
          setIsSaved(parsedSavedPlaces.includes(placeId));
        }
      } catch (error) {
        console.error("Error checking saved places: ", error);
      }
    };

    checkIfSaved();
  }, []);

  const toggleSaved = async () => {
    try {
      let savedPlaces = await AsyncStorage.getItem("savedPlaces");
      savedPlaces = savedPlaces ? JSON.parse(savedPlaces) : [];

      if (isSaved) {
        await removePlaceFromSavedPlaces(placeId);
        savedPlaces = savedPlaces.filter((id) => id !== placeId);
        await AsyncStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
      } else {
        await addPlaceToSavedPlaces(placeId);

        savedPlaces.push(placeId);
        await AsyncStorage.setItem("savedPlaces", JSON.stringify(savedPlaces));
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling saved place: ", error);
    }
  };

  const removePlaceFromSavedPlaces = async (placeId) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        console.error("Authorization token not found");
        return;
      }

      const response = await fetch(
        `http://192.168.1.2:3333/user/saved-places/${placeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
      } else {
        const errorData = await response.json();
        console.error(
          "Error when deleting a location from saved ones:",
          errorData.error
        );
      }
    } catch (error) {
      console.error("Error executing request:", error);
    }
  };

  if (!placeDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{placeDetails.name}</Text>
        <Text style={styles.description}>{placeDetails.description}</Text>
        <View style={styles.mapContainer}>
          <Map coordinates={coordinates} />
        </View>
        <View style={styles.photosContainer}>
          <PlacesPhotos locationId={placeDetails.id} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={isSaved ? "Remove from saved" : "Add to saved"}
            mode="contained"
            onPress={toggleSaved}
            style={styles.button}
            contentStyle={styles.buttonContent}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
  },
  photosContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: "80%",
  },
  buttonContent: {
    height: 50,
  },
});

export default PlaceDetails;
