import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { AppModelProvider, useAppModel } from '@/context/AppContext';

const InnerSanctumTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.innerSanctum.tint,
    background: Colors.innerSanctum.background,
    card: Colors.innerSanctum.surface,
    text: Colors.innerSanctum.text,
    border: Colors.innerSanctum.border,
    notification: Colors.innerSanctum.tint,
  },
};

const NorthfieldTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.northfield.tint,
    background: Colors.northfield.background,
    card: Colors.northfield.surface,
    text: Colors.northfield.text,
    border: Colors.northfield.border,
    notification: Colors.northfield.tint,
  },
};

export const unstable_settings = {
  anchor: '(drawer)',
};

function RootLayoutNav() {
  const { mode } = useAppModel();

  return (
    <ThemeProvider value={mode === 'Inner Sanctum' ? InnerSanctumTheme : NorthfieldTheme}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider >
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppModelProvider>
        <RootLayoutNav />
      </AppModelProvider>
    </GestureHandlerRootView>
  );
}
