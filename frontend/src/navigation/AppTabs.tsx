import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Groups from "../screens/Groups";
import History from "../screens/History";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { darkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: theme.card, 
          elevation: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") iconName = "home-outline";
          if (route.name === "History") iconName = "time-outline";
          if (route.name === "Groups") iconName = "people-outline";
          if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: darkMode ? "#2FB195" : "#2FB195",
        tabBarInactiveTintColor: darkMode ? "#aaa" : "#777",
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
