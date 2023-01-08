import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';
import { AuthProvider, useAuth } from './src/hooks/AuthContext';
import { Routes } from './src/routes';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isUserStorageLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    showSplashScreen();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded && !isUserStorageLoading) hideSplashScreen();
  }, [fontsLoaded, isUserStorageLoading]);

  if (!fontsLoaded || isUserStorageLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
