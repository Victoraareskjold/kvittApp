import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

/* Screens */
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AlleKvitteringerScreen from "../screens/AlleKvitteringerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import KvitteringDetails from "../screens/KvitteringDetails";

/* Stack */

const Stack = createNativeStackNavigator();

/* KvitteringStack */
const KvitteringStack = createNativeStackNavigator();

function KvitteringStackGroup() {
  return (
    <KvitteringStack.Navigator screenOptions={{ headerShown: false }}>
      <KvitteringStack.Screen name="AlleKvitteringer" component={AlleKvitteringerScreen} />
      <KvitteringStack.Screen name="KvitteringDetails" component={KvitteringDetails} />
    </KvitteringStack.Navigator>
  );
}

/* HomeStack */
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="KvitteringDetails" component={KvitteringDetails} />
    </HomeStack.Navigator>
  );
}

/* Tab bottom */
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "HomeStackGroup") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "KvitteringStackGroup") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Fordeler") {
            iconName = focused ? "help" : "help";
            color = focused ? "grey" : "lightgrey";
          } else if (route.name === "Innstillinger") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2984FF",
      })}
    >
      <Tab.Screen name="HomeStackGroup" component={HomeStackGroup} options={{ tabBarLabel: "Hjem" }} />
      <Tab.Screen name="KvitteringStackGroup" component={KvitteringStackGroup} options={{ tabBarLabel: "Kvitteringer" }} />
      <Tab.Screen name="Fordeler" component={AlleKvitteringerScreen} listeners={{ tabPress: (e) => { e.preventDefault(); } }} />
      <Tab.Screen name="Innstillinger" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="MainScreen" component={TabGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
