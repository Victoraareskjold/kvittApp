import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* Screens */
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AlleKvitteringerScreen from "../screens/AlleKvitteringerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import KvitteringDetails from "../screens/KvitteringDetails";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="AlleKvitteringer" component={AlleKvitteringerScreen}/>
                <Stack.Screen name="KvitteringDetails" component={KvitteringDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        paddingTop: 4,
                        paddingBottom: 24,
                        height: 56+24,
                    }
                }}
            >
                <Tab.Screen 
                    name="HomeScreen" 
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Image
                                    source={
                                        focused
                                            ? require('../../assets/navIkoner/Active/navHomeActive.png')
                                            : require('../../assets/navIkoner/Default/navHome.png')
                                        }
                                    resizeMode="contain"
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                />
                            </View> 
                        )
                    }}
                />
                
                <Tab.Screen 
                    name="AlleKvitteringer" 
                    component={AlleKvitteringerScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Image
                                    source={
                                        focused
                                            ? require('../../assets/navIkoner/Active/navKvitteringerActive.png')
                                            : require('../../assets/navIkoner/Default/navKvitteringer.png')
                                        }
                                    resizeMode="contain"
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                />
                            </View> 
                        )
                    }}
                />
                
                <Tab.Screen 
                    name='Welcome' 
                    component={WelcomeScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Image
                                    source={
                                        focused
                                            ? require('../../assets/navIkoner/Active/navVetIkkeActive.png')
                                            : require('../../assets/navIkoner/Default/navVetIkke.png')
                                        }
                                    resizeMode="contain"
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                />
                            </View> 
                        )
                    }}
                />
                
                <Tab.Screen 
                    name="SettingsScreen" 
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View>
                                <Image
                                    source={
                                        focused
                                            ? require('../../assets/navIkoner/Active/navSettingsActive.png')
                                            : require('../../assets/navIkoner/Default/navSettings.png')
                                        }
                                    resizeMode="contain"
                                    style={{
                                        height: 48,
                                        width: 48,
                                    }}
                                />
                            </View> 
                        )
                    }}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({});