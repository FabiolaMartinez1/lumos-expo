import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import TopNavBar from "@/components/navigation/TopNavBar";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  //todo
  const screenIcons: {
    [key: string]: { name: keyof typeof Ionicons.glyphMap; link: string }[];
  } = {
    "(tabs)": [{ name: "home-outline", link: "/one" }],
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <View style={{ flex: 1 }}>
                <Stack
                  screenOptions={({ route }) => ({
                    header: () => (
                      <TopNavBar icons={screenIcons[route.name] || []} />
                    ),
                    animation: "none",
                  })}
                >
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  {/* <Stack.Screen name="signup" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} /> */}
                  <Stack.Screen name="(tabs)" />
                  {/* <Stack.Screen name="cart" />
                  <Stack.Screen name="invoice-form" />
                  <Stack.Screen name="menu-item" />
                  <Stack.Screen name="payment-method" /> */}
                </Stack>
              </View>
            </ThemeProvider>
    </GestureHandlerRootView>
  );
}
