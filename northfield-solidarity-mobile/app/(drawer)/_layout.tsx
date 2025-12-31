import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].text,
        drawerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="engines"
        options={{
          drawerLabel: 'Engines',
          title: 'Engines',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="cpu" color={color} />,
        }}
      />
      <Drawer.Screen
        name="network"
        options={{
          drawerLabel: 'Network',
          title: 'Network',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="person.3.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="mail"
        options={{
          drawerLabel: 'Mail',
          title: 'Mail',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="envelope.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="marketplace"
        options={{
          drawerLabel: 'Marketplace',
          title: 'Marketplace',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="bag.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="investors"
        options={{
          drawerLabel: 'Investors',
          title: 'Investors',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="chart.pie.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="education"
        options={{
          drawerLabel: 'Education',
          title: 'Education',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="firmament"
        options={{
          drawerLabel: 'Firmament',
          title: 'Firmament',
          drawerIcon: ({ color }) => <IconSymbol size={28} name="cloud.fill" color={color} />,
        }}
      />
    </Drawer>
  );
}
