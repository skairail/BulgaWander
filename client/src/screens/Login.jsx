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

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BulgaWander</Text>

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

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>
            Don't have an account? Register here
          </Text>
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
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    backgroundColor: "lightgreen",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;
