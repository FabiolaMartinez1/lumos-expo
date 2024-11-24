import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Colors from "@/constants/Colors";
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background, // Color de fondo para la barra de pestañas
          borderTopWidth: 1,
          borderTopColor: "#ddd", // Borde superior de la barra de pestañas
          height: 80,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false, // Ocultar la barra de navegación predeterminada
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bulb" : "bulb-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "color-palette" : "color-palette-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
