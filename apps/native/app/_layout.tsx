/** biome-ignore-all lint/performance/noBarrelFile: <Need this one to exist for boundary catches> */
import '@/global.css';
import React, { useEffect } from 'react';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { queryClient } from '@/lib/orpc';
import { QueryClientProvider } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';

// Prevent the splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,

  });

  const { data: session } = authClient.useSession()

  console.log("-------------Main_layout.tsx------------")
  console.log("user ", session?.user)
  console.log("session ", session?.session)
  console.log("-------------EOD Main_layout.tsx------------")

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME['dark']}>
        <KeyboardProvider>
          <StatusBar style="dark" />
          <Stack>
            <Stack.Protected guard={!!session?.user}>
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="register" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
          <PortalHost />
        </KeyboardProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
