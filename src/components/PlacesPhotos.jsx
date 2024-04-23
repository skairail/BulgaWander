import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Buffer } from "buffer";

const LocationPhotos = ({ locationId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:3333/locations/${locationId}/photos`
        );
        const jsonData = await response.json();

        const transformedPhotos = jsonData.map((photo) => ({
          id: photo.id,
          photo: `data:image/jpeg;base64,${Buffer.from(
            photo.photo.data
          ).toString("base64")}`,
        }));
        setPhotos(transformedPhotos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [locationId]);

  return (
    <View>
      <Text>Photos</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {photos.map((photo) => (
          <Image
            key={photo.id}
            source={{ uri: photo.photo }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
        ))}
      </View>
    </View>
  );
};

export default LocationPhotos;
