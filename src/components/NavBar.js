import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import EventfinderScreen from "../screens/Eventfinder";
import EventlistScreen from "../screens/eventlist";
import Map from "../screens/Map";
import AddEventScreen from "../screens/AddEvent";
import BookmarksScreen from "../screens/Bookmarks";

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <LoginStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
      <LoginStack.Screen
        name="Add Event"
        component={AddEventScreen}
        options={{ header: () => null }}
      />
    </LoginStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Event Finder"
        component={EventfinderScreen}
        options={{ header: () => null }}
      />
      <SearchStack.Screen
        name="Event List"
        component={EventlistScreen}
        options={{ header: () => null }}
      />
    </SearchStack.Navigator>
  );
}
const BookmarkStack = createStackNavigator();
function BookmarkStackScreen() {
  return (
    <BookmarkStack.Navigator>
      <BookmarkStack.Screen
        name="Book Marks"
        component={BookmarksScreen}
        options={{ header: () => null }}
      />
    </BookmarkStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Map") {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === "Account") {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === "Bookmarks") {
              iconName = focused ? "bookmarks" : "bookmark-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "yellow",
          tabBarLabelStyle: { paddingBottom: 2, fontSize: 10, color: "black", fontWeight: "bold"},
          tabBarStyle: {color: "yellow"},
          tabBarActiveBackgroundColor: "yellow",
          tabBarInactiveBackgroundColor: "#767bf4",
          tabBarIconStyle: {paddingTop: -10}
        })}
      >
        <Tab.Screen
          name="Map"
          component={Map}
          options={{ header: () => null }}
        />
        <Tab.Screen
          name="Account"
          component={LoginStackScreen}
          options={{ header: () => null }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{ header: () => null }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarkStackScreen}
          options={{ header: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
