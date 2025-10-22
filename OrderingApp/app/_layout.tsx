import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="verification-otp" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding-1" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding-2" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding-3" options={{ headerShown: false }} />
        <Stack.Screen name="destination" options={{ headerShown: false }} />
        <Stack.Screen name="actual-location-map" options={{ headerShown: false }} />
        <Stack.Screen name="pinned-order" options={{ headerShown: false }} />
        <Stack.Screen name="tracking-panel-location" options={{ headerShown: false }} />
        <Stack.Screen name="delivery-type" options={{ headerShown: false }} />
        <Stack.Screen name="progress-tracking" options={{ headerShown: false }} />
        <Stack.Screen name="tracking-list" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="inbox-chat-sellers" options={{ headerShown: false }} />
        <Stack.Screen name="inbox-chat-buyers" options={{ headerShown: false }} />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
        <Stack.Screen name="review-sellers" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="terms-and-conditions" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
