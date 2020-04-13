import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Blue } from "./Constants";
import { DocumentStackScreen } from "./Screens/DocumentStack";
import { HomeScreen } from "./Screens/HomeScreen";
import { ImageEntry } from "./Screens/ImagesScreen";
import { ImageStackScreen } from "./Screens/ImageStack";
import { DocumentEntry } from "./Screens/DocumentsScreen";

function iconResolver(route: string) {
  switch (route) {
    // case 'Home': return focused ? 'ios-information-circle' : 'ios-information-circle-outline';
    case "Home":
      return "ios-infinite";
    case "Images":
      return "ios-images";
    case "Documents":
      return "ios-document";
    default:
      return "ios-document";
  }
}

// Screen parameters
export type ScreenParamList = {
  // Images stack screens
  Images: undefined;
  ImageDetails: { item: ImageEntry };
  // Documents stack screens
  Documents: undefined;
  DocumentDetails: { item: DocumentEntry };
  DokumentsAdd: undefined;
};

// Tab Bar
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = iconResolver(route.name);
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Blue,
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Images" component={ImageStackScreen} />
        <Tab.Screen name="Documents" component={DocumentStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
