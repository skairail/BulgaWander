import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./contexts/AuthContext";
import Welcomepage from "./screens/Welcomepage";
import PlaceDetails from "./screens/PlaceDetails";

import Login from "./screens/Login";
import Homepage from "./screens/Homepage";
import Category from "./screens/Category";
import SearchResults from "./screens/SearchResults";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcomepage" component={Welcomepage} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="SearchResults" component={SearchResults} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
export default App;
