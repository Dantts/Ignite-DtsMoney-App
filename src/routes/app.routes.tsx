import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import theme from '../global/styles/theme';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secundary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 75,
          paddingVertical: Platform.OS === "ios" ? 20 : 0
        },
        tabBarLabelStyle: {
          fontSize: 14
        }
      }}
    >
      <Screen
        name={"Listagem"}
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name={"Cadastrar"}
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name={"Resumo"}
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}