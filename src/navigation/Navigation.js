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
import ReceiptView from "../components/ReceiptView";
import AddReceiptModal from "../screens/AddReceiptModal";
import SetupName from '../screens/onboarding/SetupName'
import SendReceipt from "../screens/SendReceipt";
import Onboarding from "../screens/onboarding/Onboarding";
import SetupPhone from "../screens/onboarding/SetupPhone";
import SetupCode from "../screens/onboarding/SetupCode";
import ConfirmCode from "../screens/onboarding/ConfirmCode";
import FaceId from "../screens/onboarding/FaceId";

/* HomeScreen view receipt */
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <HomeStack.Screen 
        name="ReceiptView" 
        component={ReceiptView} 
        options={({ route }) => ({
          headerTitle: route.params.item.Store,
        })}
      />

    </HomeStack.Navigator>
  );
}

/* ReceiptScreen view and add receipt */
const KvitteringStack = createNativeStackNavigator();

function KvitteringStackGroup() {
  return (
    <KvitteringStack.Navigator>

      <KvitteringStack.Screen 
        options={{ headerShown: false }} 
        name="ReceiptsScreen" 
        component={ReceiptsScreen} 
      />

      <HomeStack.Screen 
        name="ReceiptView" 
        component={ReceiptView} 
        options={({ route }) => ({
          headerTitle: route.params.item.Store,
        })}
      />

      <KvitteringStack.Screen 
        options={{ headerShown: false }}
        name="AddReceiptModal" 
        component={AddReceiptModal} 
      />

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
          } else if (route.name === "SendReceipt") {
            iconName = focused ? "person-add" : "person-add-outline";
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
      <Tab.Screen name="SendReceipt" component={SendReceipt} options={{ tabBarLabel: "Del kvittering" }} />
      <Tab.Screen name="Innstillinger" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/* Login Stack */

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SetupName" component={SetupName} />
        <Stack.Screen name="SetupPhone" component={SetupPhone} />
        <Stack.Screen name="SetupCode" component={SetupCode} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
        <Stack.Screen name="FaceId" component={FaceId} />

        <Stack.Screen name="HomeScreen" component={TabGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}