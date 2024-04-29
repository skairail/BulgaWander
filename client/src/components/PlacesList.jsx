import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlacesPhotos from "./PlacesPhotos";

const PlacesList = ({ categoryId, placeIds }) => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost3333/locations";
        const response = await fetch(url);
        const data = await response.json();

        if (categoryId) {
          const filteredData = data.filter(
            (item) => item.CategoryId === categoryId
          );
          setPlaces(filteredData);
        } else if (placeIds && placeIds.length > 0) {
          const filteredData = data.filter((item) =>
            placeIds.includes(item.id)
          );
          setPlaces(filteredData);
        } else {
          setPlaces(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [categoryId, placeIds]);

  const handlePlacePress = (place) => {
    navigation.navigate("PlaceDetails", { placeId: place.id });
  };

  const formatPlaceName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePlacePress(item)}
      style={styles.item}
    >
      <PlacesPhotos locationId={item.id} renderSinglePhoto={true} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{formatPlaceName(item.name)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={places}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,

    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "white",
  },
});

export default PlacesList;
