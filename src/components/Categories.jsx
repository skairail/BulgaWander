import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.2:3333/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate("Category", { categoryId: category.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <ScrollView horizontal>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category)}
            style={styles.categoryItem}
          >
            {category.icon && (
              <Image source={{ uri: category.icon }} style={styles.icon} />
            )}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  categoryItem: {
    padding: 10,
    height: 50,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Categories;
