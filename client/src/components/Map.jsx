import React from "react";
import MapView, { Marker } from "react-native-maps";

import { View, StyleSheet, Linking } from "react-native";

const Map = ({ coordinates }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          // latitudeDelta: 0.01,
          // longitudeDelta: 0.01,
        }}
        onPress={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          Linking.openURL(url);
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 350,
    marginBottom: 10,
    borderRadius: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
