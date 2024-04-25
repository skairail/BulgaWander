import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LocationPhotos from "./PlacesPhotos";
import { useFocusEffect } from "@react-navigation/native";

const SavedPlaces = () => {
  const navigation = useNavigation();
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

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedPlaces();
    }, [])
  );

  useEffect(() => {
    if (savedPlaces.length > 4) {
      setTwoColumns(true);
    } else {
      setTwoColumns(false);
    }
  }, [savedPlaces]);

  const handlePress = (itemId) => {
    navigation.navigate("PlaceDetails", { placeId: itemId });
  };
  const formatPlaceName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const renderBlock = ({ item }) => (
    <TouchableOpacity style={styles.block} onPress={() => handlePress(item.id)}>
      <LocationPhotos
        locationId={item.id}
        renderSinglePhoto={true}
        miniature={true}
      />
      <Text style={styles.blockText}>{formatPlaceName(item.name)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Places</Text>
      {savedPlaces.length === 0 ? (
        <Text style={styles.subtitle}>
          No saved places. Time to start a new adventure list!
        </Text>
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
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  blockText: {
    marginLeft: 10,
    fontSize: 24,
  },
  subtitle: {
    flex: 1,
    fontSize: 15,
  },
});

export default SavedPlaces;
