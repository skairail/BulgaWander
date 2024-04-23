import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ categoryId }) => {
  const navigation = useNavigation();
  const [places, setplaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.2:3333/locations");
        const data = await response.json();

        const filteredData = data.filter(
          (item) => item.CategoryId === categoryId
        );
        setplaces(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleplacePress = (place) => {
    navigation.navigate("PlaceDetails", { placeId: place.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleplacePress(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>Coordinates: {item.coordinates}</Text>
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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlacesList;
