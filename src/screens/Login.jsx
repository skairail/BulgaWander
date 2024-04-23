import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("testuser");
  const [password, setPassword] = useState("testpassword");

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigation.replace("Homepage");
  }, [isAuthenticated, navigation]);

  const handleSubmit = () => {
    if (email && password) login(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.row}>
          <Text>Email address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.row}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
  },
  row: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Login;
