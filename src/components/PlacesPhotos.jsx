import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Buffer } from "buffer";

const PlacesPhotos = ({ locationId, renderSinglePhoto, miniature }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:3333/locations/${locationId}/photos`
        );
        const jsonData = await response.json();

        if (Array.isArray(jsonData)) {
          const transformedPhotos = jsonData.map((photo) => ({
            id: photo.id,
            photo: `data:image/jpeg;base64,${Buffer.from(
              photo.photo.data
            ).toString("base64")}`,
            name: photo.name,
          }));

          if (renderSinglePhoto) {
            setPhotos(transformedPhotos.slice(0, 1));
          } else {
            setPhotos(transformedPhotos);
          }
        } else {
          console.error("jsonData is not an array:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [locationId, renderSinglePhoto]);

  return (
    <View>
      {renderSinglePhoto ? (
        <View>
          {photos.length > 0 ? (
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: photos[0].photo }}
                style={[
                  {
                    width: miniature ? 150 : "100%",
                    height: miniature ? 150 : 350,
                    marginVertical: 10,
                    borderRadius: 25,
                  },
                ]}
              />
            </View>
          ) : (
            <Text>No photo available</Text>
          )}
        </View>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {photos.map((photo) => (
            <View key={photo.id} style={{ position: "relative" }}>
              <Image source={{ uri: photo.photo }} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default PlacesPhotos;
