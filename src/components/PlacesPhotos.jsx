import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Buffer } from "buffer";

const PlacesPhotos = ({ locationId, renderSinglePhoto, miniature }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `http://localhost3333/locations/${locationId}/photos`
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

          setPhotos(transformedPhotos);
        } else {
          console.error("jsonData is not an array:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [locationId]);

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <View>
      {renderSinglePhoto ? (
        <View>
          {photos.length > 0 ? (
            <View style={{ position: "relative" }}>
              {/* <TouchableOpacity onPress={() => handlePhotoPress(photos[0])}> */}
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
              {/* </TouchableOpacity> */}
            </View>
          ) : (
            <Text>No photo available</Text>
          )}
        </View>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {photos.map((photo) => (
            <TouchableOpacity
              key={photo.id}
              onPress={() => handlePhotoPress(photo)}
              style={{ width: "25%", aspectRatio: 1 }}
            >
              <Image
                source={{ uri: photo.photo }}
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  margin: 5,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal visible={!!selectedPhoto} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedPhoto?.photo }}
            style={styles.modalPhoto}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalPhoto: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 100,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default PlacesPhotos;

// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { Buffer } from "buffer";

// const PlacesPhotos = ({ locationId, renderSinglePhoto, miniature }) => {
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost3333/locations/${locationId}/photos`
//         );
//         const jsonData = await response.json();

//         if (Array.isArray(jsonData)) {
//           const transformedPhotos = jsonData.map((photo) => ({
//             id: photo.id,
//             photo: `data:image/jpeg;base64,${Buffer.from(
//               photo.photo.data
//             ).toString("base64")}`,
//             name: photo.name,
//           }));

//           if (renderSinglePhoto) {
//             setPhotos(transformedPhotos.slice(0, 1));
//           } else {
//             setPhotos(transformedPhotos);
//           }
//         } else {
//           console.error("jsonData is not an array:", jsonData);
//         }
//       } catch (error) {
//         console.error("Error fetching photos:", error);
//       }
//     };

//     fetchPhotos();
//   }, [locationId, renderSinglePhoto]);

//   return (
//     <View>
//       {renderSinglePhoto ? (
//         <View>
//           {photos.length > 0 ? (
//             <View style={{ position: "relative" }}>
//               <Image
//                 source={{ uri: photos[0].photo }}
//                 style={[
//                   {
//                     width: miniature ? 150 : "100%",
//                     height: miniature ? 150 : 350,
//                     marginVertical: 10,
//                     borderRadius: 25,
//                   },
//                 ]}
//               />
//             </View>
//           ) : (
//             <Text>No photo available</Text>
//           )}
//         </View>
//       ) : (
//         <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//           {photos.map((photo) => (
//             <Image
//               key={photo.id}
//               source={{ uri: photo.photo }}
//               style={{
//                 width: "25%",
//                 height: 100,
//                 margin: 5,
//                 borderRadius: 10,
//               }}
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default PlacesPhotos;
