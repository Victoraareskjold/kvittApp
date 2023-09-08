import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

/* Screens */
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import KvitteringDetails from "../screens/KvitteringDetails";
import AddReceiptModal from "../screens/AddReceiptModal";
import SignUp from '../screens/SignUp'
import ResetPassword from "../screens/ResetPassword";

/* HomeScreen view receipt */
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ReceiptsScreen" component={ReceiptsScreen} />
      <HomeStack.Screen name="KvitteringDetails" component={KvitteringDetails} />
    </HomeStack.Navigator>
  );
}

/* ReceiptScreen view and add receipt */
const KvitteringStack = createNativeStackNavigator();

function KvitteringStackGroup() {
  return (
    <KvitteringStack.Navigator screenOptions={{ headerShown: false }}>
      <KvitteringStack.Screen name="ReceiptsScreen" component={ReceiptsScreen} />
      <KvitteringStack.Screen name="KvitteringDetails" component={KvitteringDetails} />
      <KvitteringStack.Screen name="AddReceiptModal" component={AddReceiptModal} />
    </KvitteringStack.Navigator>
  );
}

/* Tab bottom */
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {},
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
      <Tab.Screen name="Fordeler" component={ReceiptsScreen} listeners={{ tabPress: (e) => { e.preventDefault(); } }} />
      <Tab.Screen name="Innstillinger" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/* Login Stack */

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="HomeScreen" component={TabGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
