import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  }
  type: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextDataProps {
  user: UserProps;
  isUserStorageLoading: boolean
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>
  // signInWithApple: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextDataProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserStorageLoading, setIsUserStorageLoading] = useState(true);

  const userStorageKey = "@gofinance:user";

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } =
        await AuthSession.startAsync({ authUrl, }) as AuthorizationResponse

      if (type == 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        }
        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error(error)
    }
  }


  // const signInWithApple = async () => {
  //   try {

  //     const credentials = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL
  //       ]
  //     })

  //     if (credentials) {
  //       const userLogged = {
  //         id: credentials.user,
  //         name: credentials.fullName.givenName,
  //         email: credentials.email,
  //         photo: `https://ui-avatars.com/api/?name=${credentials.fullName.givenName}&length=1`
  //       }

  //       setUser(userLogged);
  //       await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
  //     }


  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  const signOut = async () => {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStorageData = await AsyncStorage.getItem(userStorageKey)

      if (userStorageData) {
        const userLogged = JSON.parse(userStorageData);
        setUser(userLogged);
      }

      setIsUserStorageLoading(false);
    }

    loadUserStorageData();
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut, isUserStorageLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }