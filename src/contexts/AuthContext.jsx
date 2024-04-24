import React, { createContext, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload.user, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(username, password) {
    try {
      const response = await fetch("http://192.168.1.2:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "login", payload: data });
        saveToken(data.accessToken);
        return data.accessToken;
      } else {
        console.error(data.error);
        return null;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    removeToken();
  }

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.error("Error when deleting token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
